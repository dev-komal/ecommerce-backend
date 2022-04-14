// const User = require('../dao/user.dao');
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import statusConst from "../common/statusConstants";
import { get, isEmpty, isObject, each, set, omit, find, chain } from "lodash";
import moment from "moment";
import Models from "../models";
import Helper from "../common/helper";
import appConfig from "../common/appConfig";
import appConst, { userRoles, commonStatuses } from "../common/appConstants";
import mailTemplate from "../common/mailTemplate";

const _ = { get, isEmpty, isObject, each, set, omit, find, chain };

/**
 * Login to user and generate JWT
 *
 * @param Request request
 */
const login = async (data) => {
  let responseData = statusConst.authError;

  try {
    const email = _.get(data, "email", "");
    const password = _.get(data, "password", "");

    // Find the user by email and if active
    const User = await Models.User.findOne({
      where: {
        email: email,
        status: commonStatuses.ACTIVE.id,
      },
    });

    const userPassword = _.get(User, "password", "");

    const validPassword = await bcrypt.compare(password, userPassword);

    if (
      !_.isEmpty(User) &&
      _.isObject(User) &&
      validPassword === true &&
      !_.isEmpty(password)
    ) {
      if (User.user_role_id == userRoles.ADMIN_ROLE.id) {
        const loginVerification = Helper.generateLoginVerificationDetails();
        await User.update({ ...loginVerification });

        // const verificationBody = mailTemplate.verification.replace("{{VERIFICATION_CODE}}", loginVerification.login_verification_code);

        let verificationBody = _.get(mailTemplate, "verification", "");
        verificationBody = verificationBody.replace(
          "{{VERIFICATION_CODE}}",
          loginVerification.login_verification_code
        );
        verificationBody = verificationBody.replace("{{EMAIL_ACCOUNT}}", email);

        const mailParams = {
          email: User.email,
          //email: "komalsuthar@whatsadeal.com",
          mailTemplate: verificationBody,
          subject: "Login verification code",
          mailTitle: "Login OTP",
        };

        const sendMail = Helper.sendMail(mailParams);
        return {
          ...statusConst.success,
          data: { hasRequiredOTP: true },
          message: "Verification mail has been sent successfully",
        };
      }

      const tokenData = await generateToken({
        id: User.id,
        roleId: User.user_role_id,
      });

      const token = _.get(tokenData, "token", null);

      if (token) {
        await User.update({ token });
        responseData = { ...statusConst.authSuccess, data: { token } };
      }
    }
  } catch (e) {
    responseData = { ...statusConst.error, message: e.message };
  }
  return responseData;
};

/**
 * Verify code and generate JWT
 *
 * @param Request request
 */
const verifyCode = async (data) => {
  let responseData = statusConst.authError;

  try {
    const email = _.get(data, "email", "");
    const code = _.get(data, "verification_code", "");
    const currentDateTime = moment().format(appConst.standardDateFormat);

    // Find the user by email
    const User = await Models.User.findOne({
      where: {
        email: email,
      },
    });

    if (!_.isEmpty(User) && _.isObject(User)) {
      if (User.login_verification_code !== code) {
        return {
          ...statusConst.invalidCode,
          message: "Please enter a valid verification code",
        };
      }

      if (
        moment(User.verification_code_expired_at).isSame(currentDateTime) ||
        moment(User.verification_code_expired_at).isBefore(currentDateTime)
      ) {
        return {
          ...statusConst.codeExpired,
          message: "Verification code expired",
        };
      }

      const tokenData = await generateToken({
        id: User.id,
        roleId: User.user_role_id,
      });

      const token = _.get(tokenData, "token", null);

      if (token) {
        await User.update({ token });
        responseData = { ...statusConst.authSuccess, data: { token } };
      }
    }
  } catch (e) {
    responseData = { ...statusConst.error, message: e.message };
  }
  return responseData;
};

/**
 * Resend verification code
 *
 * @param Request request
 */
const resendCode = async (data) => {
  let responseData = statusConst.authError;

  try {
    const email = _.get(data, "email", "");

    // Find the user by email and if active
    const User = await Models.User.findOne({
      where: {
        email: email,
        status: commonStatuses.ACTIVE.id,
        user_role_id: userRoles.ADMIN_ROLE.id,
      },
    });

    if (!_.isEmpty(User) && _.isObject(User)) {
      if (User.user_role_id == userRoles.ADMIN_ROLE.id) {
        const loginVerification = Helper.generateLoginVerificationDetails();
        await User.update({ ...loginVerification });

        const verificationBody = mailTemplate.verification.replace(
          "{{VERIFICATION_CODE}}",
          loginVerification.login_verification_code
        );

        const mailParams = {
          email: User.email,
          mailTemplate: verificationBody,
          subject: "Login verification code",
          mailTitle: "Login OTP",
        };

        const sendMail = await Helper.sendMail(mailParams);
        return {
          ...statusConst.success,
          message: "Verification mail has been sent successfully",
        };
      }
    } else {
      responseData = { ...statusConst.error, message: "User not found" };
    }
  } catch (e) {
    responseData = { ...statusConst.error, message: e.message };
  }
  return responseData;
};

/**
 * Change password of user
 *
 * @param Request request
 */
const changePassword = async (data) => {
  const currentPassword = _.get(data, "current_password", "");
  const newPassword = _.get(data, "new_password", "");
  const id = _.get(data, "id", 0);

  let responseData = statusConst.authError;

  try {
    // first get the user based on username
    const user = await Models.User.findOne({ where: { id: id } });
    if (user) {
      // verify the password
      const validPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (validPassword) {
        // Generate new hash password
        const hasPassword = await bcrypt.hash(
          newPassword,
          appConfig.bcryptSaltRound
        );

        user.password = hasPassword;
        await user.save();

        responseData = {
          ...statusConst.authSuccess,
          message: "Password changed successfully",
        };
      } else {
        responseData = {
          ...statusConst.error,
          errors: { current_password: "" },
        };
      }
    } else {
      responseData = statusConst.authError;
    }
  } catch (e) {
    responseData = { ...statusConst.error, message: e.message };
  }

  return responseData;
};

/**
 * Find User by Token
 *
 * @param String JWT token
 */
const findByToken = async (token) => {
  let responseData = { ...statusConst.error, message: "User not found" };

  try {
    // Find user by token
    const User = await Models.User.findOne({
      where: {
        token: token,
        status: commonStatuses.ACTIVE.id,
      },
    });
    if (!_.isEmpty(User) && _.isObject(User)) {
      responseData = { ...statusConst.success, data: User };
    } else {
      responseData = { ...statusConst.notFound, message: "User not found" };
    }
  } catch (error) {
    responseData = { ...statusConst.error, message: error.message };
  }

  return responseData;
};

/**
 * Generate the Token based on User PK
 *
 * @param  Options Object
 * @return String Token with 12h expired date
 */
const generateToken = async (options = {}) => {
  let responseData = statusConst.error;

  const userId = _.get(options, "id", 0);
  const updateToken = _.get(options, "updateToken", false) || false;

  try {
    let userTableAttributes = [
      "id",
      "user_role_id",
      "email",
      "first_name",
      "last_name",
      "status",
      "profile_image",
      "phone",
      "address",
    ];
    // Find user by id
    let User = await Models.User.findOne({
      attributes: userTableAttributes,
      where: { id: userId },
    });

    if (_.isEmpty(User)) {
      return { ...statusConst.error, message: "User not found" };
    }

    let userData = User.get({ plain: true }) || {};

    // Change the status and roles to string from integer
    // userData.role = _.chain(userRoles).find({ id: userData.user_role_id }).get("title", "").value();

    // Omit unwanted data in the last once all the related activities are done
    //userData = _.omit(userData, ["user_role_id"]);

    // Generate JWT with payload
    const token = jwt.sign(userData, appConfig.jwtSecretKey, {
      expiresIn: "12h",
    });

    // Update the token
    if (updateToken == true) {
      await User.update({ token });
    }

    responseData = { ...statusConst.success, token };
  } catch (error) {
    responseData = { ...statusConst.error, message: error.message };
  }

  return responseData;
};

const AuthServices = {
  login,
  changePassword,
  findByToken,
  generateToken,
  verifyCode,
  resendCode,
};

export default AuthServices;
