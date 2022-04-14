-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2021 at 02:38 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lt_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `add-to-cart`
--

CREATE TABLE `add-to-cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `add-to-cart`
--

INSERT INTO `add-to-cart` (`id`, `user_id`, `product_id`, `quantity`, `price`, `total`, `createdAt`, `updatedAt`) VALUES
(3, 33, 10, 2, 1000, 2000, '2021-11-22 15:28:14', '2021-11-22 15:28:22'),
(27, 32, 3, 1, 1200, 1200, '2021-11-23 12:44:47', '2021-11-24 19:01:02'),
(28, 32, 2, 1, 1200, 1200, '2021-11-23 12:44:51', '2021-11-23 12:44:51'),
(29, 32, 1, 1, 1500, 1500, '2021-11-23 12:44:54', '2021-11-23 12:44:54'),
(30, 32, 10, 1, 1000, 1000, '2021-11-24 17:36:28', '2021-11-24 17:36:28');

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) NOT NULL,
  `banner_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `banners`
--

INSERT INTO `banners` (`id`, `banner_image`, `banner_name`, `createdAt`, `updatedAt`) VALUES
(1, 'banner-1632810417935.jpeg', 'Weddings Saree', '2021-07-22 15:26:30', '2021-09-28 11:56:57'),
(2, 'banner-1632810405182.jpeg', 'Bandhani Saree', '2021-07-22 15:27:38', '2021-09-28 11:56:45'),
(3, 'banner-1632810397348.jpeg', 'Saree of the year', '2021-07-22 15:28:04', '2021-09-28 11:56:37'),
(4, 'banner-1632810376737.jpeg', 'Pink Latest Saree', '2021-07-22 15:28:20', '2021-09-28 11:56:16'),
(5, 'banner-1632810354024.jpeg', 'Green Latest saree', '2021-07-22 15:28:37', '2021-09-28 11:55:54'),
(6, 'banner-1632810249022.jpeg', 'Master Pisces', '2021-07-22 15:28:56', '2021-09-28 11:54:09');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `category_image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `description`, `category_image`, `createdAt`, `updatedAt`) VALUES
(1, 'Bandhani Saree', 'Finer the Bandhani work, more expensive the fabric is. Bandhani is generally made up of natural colors where the main colors are yellow, blue, green and black. Bandhani saree is a speciality of Gujarat and Rajasthan', 'category-1626948348114.jpeg', '2021-07-22 15:31:06', '2021-07-22 15:35:48'),
(2, 'karnataka saree', 'Patteda Anchu sarees are handwoven from the handloom hub of Gajendragarh, Karnataka. ', 'categroy-1626948538412.jpeg', '2021-07-22 15:38:58', '2021-07-22 15:38:58'),
(3, 'English Saree', 'A sari is a long piece of cloth draped around the body and over one shoulder, worn by Hindu women.', 'categroy-1626948594313.jpeg', '2021-07-22 15:39:54', '2021-07-22 15:39:54'),
(4, 'Banarasi saree', 'There are many handloom and designer Banarasi sarees which are exponentially expensive and heavy. Some are made with real silver and gold zari, and contain premium silk.', 'categroy-1626948637031.jpeg', '2021-07-22 15:40:37', '2021-07-22 15:40:37');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `color_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color_name`, `createdAt`, `updatedAt`) VALUES
(1, 'Red', '2021-07-22 15:40:45', '2021-07-22 15:40:45'),
(2, 'Balck', '2021-07-22 15:40:51', '2021-07-22 15:40:51'),
(3, 'Brown', '2021-07-22 15:41:20', '2021-07-22 15:41:20'),
(4, 'Yellow', '2021-07-22 15:41:26', '2021-07-22 15:41:26'),
(5, 'White', '2021-07-22 15:41:31', '2021-07-22 15:41:31'),
(6, 'Green', '2021-07-22 15:41:36', '2021-07-22 15:41:36'),
(7, 'Golden', '2021-07-22 15:44:35', '2021-07-22 15:44:35'),
(8, 'Hifg', '2021-07-24 12:51:26', '2021-07-24 12:51:26');

-- --------------------------------------------------------

--
-- Table structure for table `contactus_smmi`
--

CREATE TABLE `contactus_smmi` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contactus_smmi`
--

INSERT INTO `contactus_smmi` (`id`, `fullname`, `email`, `message`, `createdAt`, `updatedAt`) VALUES
(1, 'komal suthar', 'komalsuthar@gmail.com', 'tested by komal suthar', '2021-11-23 11:55:10', '2021-11-23 11:55:10'),
(2, 'komal suthar', 'komalsuthar@gmail.com', 'tested by komal suthar', '2021-11-23 11:55:47', '2021-11-23 11:55:47'),
(3, 'asdDF', 'dfasasdfa', 'vzfsafafa', '2021-11-23 13:58:40', '2021-11-23 13:58:40'),
(4, 'kishan', 'dsasddASDAS', 'DADADA', '2021-11-23 14:00:47', '2021-11-23 14:00:47'),
(5, 'SMMI', 'abcd@yahoo.com', 'asdADDadsDAS', '2021-11-23 15:09:20', '2021-11-23 15:09:20'),
(6, 'asdDF', 'abcd@yahoo.com', 'DSADADASDADADADD', '2021-11-23 15:10:39', '2021-11-23 15:10:39'),
(7, 'GRSGDSGDSGFD', 'kisghahj@gmail.com', 'NGFDHDNGFHDH', '2021-11-23 15:16:23', '2021-11-23 15:16:23'),
(8, 'DASDFasdfafda', 'asdfafgdafasfdas', 'fasfafafafafs', '2021-11-23 15:16:46', '2021-11-23 15:16:46'),
(9, 'kishan', 'kisghahj@gmail.com', 'afasdDASDAD', '2021-11-23 15:52:28', '2021-11-23 15:52:28'),
(10, 'FDASFASGDFS', 'HDGSHDSGHFASHDFSGH', 'DFHDASFHDASFHDFSHDFHDH', '2021-11-23 15:53:35', '2021-11-23 15:53:35'),
(11, 'DASFDAS', 'kisghahj@gmail.com', 'AFDAESFsafdasfafdasf', '2021-11-23 15:54:09', '2021-11-23 15:54:09'),
(12, 'DASFDAS', 'kisghahj@gmail.com', 'dasdADASDAD', '2021-11-23 15:54:51', '2021-11-23 15:54:51'),
(13, 'SMMI', 'kisghahj@gmail.com', 'DasdfADasdasD', '2021-11-23 15:55:48', '2021-11-23 15:55:48'),
(14, 'DSWASDasd', 'kisghahj@gmail.com', 'adasddDA', '2021-11-23 15:56:17', '2021-11-23 15:56:17'),
(15, 'SMMI', 'kisghahj@gmail.com', 'sADASDRFASFDAS', '2021-11-23 15:57:45', '2021-11-23 15:57:45'),
(16, 'smmi', 'kisghahj@gmail.com', 'DGSDFSGDSGDSG', '2021-11-23 16:03:16', '2021-11-23 16:03:16'),
(17, 'kishan', 'abcd@yahoo.com', 'asdasdasda', '2021-11-23 16:15:15', '2021-11-23 16:15:15'),
(18, 'smmi', 'dadfadada', 'dadadadad', '2021-11-23 16:18:06', '2021-11-23 16:18:06'),
(19, 'asdDF', 'dasdaSDASD', 'DADADADADDDA', '2021-11-23 16:18:55', '2021-11-23 16:18:55'),
(20, 'abc', 'kisghahj@gmail.com', 'dfs', '2021-11-23 16:21:09', '2021-11-23 16:21:09'),
(21, 'cdsasdd', 'dfasdada', 'dadad', '2021-11-23 16:21:33', '2021-11-23 16:21:33'),
(22, 'dsfdasfafaf', 'fdasfasfafa', 'fsafafaf', '2021-11-23 16:22:11', '2021-11-23 16:22:11'),
(23, 'kishan', 'DSadada', 'dadadda', '2021-11-23 16:24:17', '2021-11-23 16:24:17'),
(24, 'kishan', 'DSadada', 'dadadda', '2021-11-23 16:24:28', '2021-11-23 16:24:28'),
(25, 'kishan', 'DSadada', 'dadadda', '2021-11-23 16:24:29', '2021-11-23 16:24:29'),
(26, 'kishan', 'DSadada', 'dadadda', '2021-11-23 16:24:29', '2021-11-23 16:24:29'),
(27, 'kishan', 'DSadada', 'dadadda', '2021-11-23 16:24:30', '2021-11-23 16:24:30'),
(28, 'swqafasfasf', 'fdasfafaf', 'fafafafaf', '2021-11-23 16:24:39', '2021-11-23 16:24:39'),
(29, 'kishan', 'dasdfdfasdf', 'asfasfasfafffaf', '2021-11-23 16:32:49', '2021-11-23 16:32:49'),
(30, 'kishan', 'ddddadad@gmail.com', 'xdadafdafsa', '2021-11-23 16:39:35', '2021-11-23 16:39:35'),
(31, 'kishan', 'abcd@yahoo.com', 'dfasfafaffasff', '2021-11-23 16:42:07', '2021-11-23 16:42:07'),
(32, 'kishan', 'dasdDAS', 'DADADDA', '2021-11-23 16:47:22', '2021-11-23 16:47:22'),
(33, 'smmi', 'dasdasda', 'dadada', '2021-11-23 16:50:20', '2021-11-23 16:50:20'),
(34, 'kishan', 'abcd@yahoo.com', 'adadadadd', '2021-11-23 16:50:47', '2021-11-23 16:50:47'),
(35, 'kishan', 'abcd@yahoo.com', 'adadadadd', '2021-11-23 16:50:49', '2021-11-23 16:50:49'),
(36, 'smmi', 'dasda', 'cdadadd', '2021-11-23 16:51:15', '2021-11-23 16:51:15'),
(37, 'dASDFASD', 'DASDADA', 'DADAD', '2021-11-23 17:24:12', '2021-11-23 17:24:12'),
(38, 'vasvfasfaf', 'gfafasfasfaf', 'afafafaffa', '2021-11-24 12:47:28', '2021-11-24 12:47:28'),
(39, 'SMMI', 'adaDA', 'DASDASDADA', '2021-11-24 13:18:46', '2021-11-24 13:18:46');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `fullname`, `email`, `message`, `createdAt`, `updatedAt`) VALUES
(1, 'fsgsgsggsgsgsgsgsg', 'kisghahj@gmail.com', 'dasdddadda', '2021-11-20 11:56:53', '2021-11-20 11:56:53'),
(2, 'naya data komala', 'newemailId@gmail.com', 'cdfahdogasdugasdghuvyausdgyu', '2021-11-20 11:58:06', '2021-11-20 11:58:06'),
(3, 'naya data komala', 'newemailId@gmail.com', 'cdfahdogasdugasdghuvyausdgyu', '2021-11-20 12:00:11', '2021-11-20 12:00:11');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_address` varchar(255) NOT NULL,
  `city` varchar(30) NOT NULL,
  `pincode` int(6) NOT NULL,
  `landmark` varchar(250) NOT NULL,
  `grand_total` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_address`, `city`, `pincode`, `landmark`, `grand_total`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 4, 'Adajan', '', 0, '', 500, 'Accept', '2021-07-23 07:06:58', '2021-07-24 13:19:24'),
(2, 6, 'vesu', '', 0, '', 200, 'Reject', '2021-07-23 07:12:07', '2021-07-23 10:42:54'),
(13, 32, 'qqqqq', 'qqqqqq', 222, 'qq', 22222, '', '2021-11-24 18:32:33', '2021-11-24 18:32:33'),
(14, 32, 'ddddd', 'kjhjkh', 545445, 'sssssssssswq', 2344, '', '2021-11-24 18:39:33', '2021-11-24 18:39:33'),
(15, 32, 'jjjjjjj', 'ujhuih', 532145, 'jhbjkgu', 541, '', '2021-11-24 18:41:42', '2021-11-24 18:41:42');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 9, 5, '2021-07-23 07:07:33', '2021-07-23 07:07:33'),
(2, 1, 6, 2, '2021-07-23 07:07:33', '2021-07-23 07:07:33'),
(3, 2, 3, 6, '2021-07-23 07:12:35', '2021-07-23 07:12:35'),
(4, 1, 1, 4, '2021-11-25 16:06:34', '2021-11-25 16:06:34'),
(5, 1, 1, 3, '2021-11-25 16:06:42', '2021-11-25 16:06:42'),
(6, 1, 1, 3, '2021-11-25 16:17:07', '2021-11-25 16:17:07');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `color_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `length` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `color_id`, `title`, `description`, `price`, `length`, `type`, `quantity`, `product_image`, `createdAt`, `updatedAt`, `status`) VALUES
(1, 4, 3, 'Silk Saree', 'Silk Sarees - Buy Pure Silk Sarees from Myntra at best price range in India. Shop for Art Silk Printed Saree, Cotton Silk Sarees in various colours', '1500', 5, 'Silk', 10, 'product-1626948856121.jpeg', '2021-07-22 15:44:16', '2021-07-22 15:44:16', 1),
(2, 3, 7, 'Golden Silk Saree', 'Silk Sarees - Buy Pure Silk Sarees from Myntra at best price range in India. Shop for Art Silk Printed Saree, Cotton Silk Sarees in various colours', '1200', 6, 'Febric', 12, 'product-1626948989163.jpeg', '2021-07-22 15:46:29', '2021-07-22 15:46:29', 1),
(3, 4, 6, 'Green Banarasi Saree', 'Silk Sarees - Buy Pure Silk Sarees from Myntra at best price range in India. Shop for Art Silk Printed Saree, Cotton Silk Sarees in various colours', '1200', 6, 'Cotton', 23, 'product-1626949039683.jpeg', '2021-07-22 15:47:19', '2021-07-22 15:47:19', 1),
(4, 2, 2, 'Silk Saree', 'Silk Sarees - Buy Pure Silk Sarees from Myntra at best price range in India. Shop for Art Silk Printed Saree, Cotton Silk Sarees in various colours', '450', 6, 'Silk', 20, 'product-1626949081281.jpeg', '2021-07-22 15:48:01', '2021-07-22 15:48:01', 1),
(5, 1, 4, 'Bandhani Saree', 'Silk Sarees - Buy Pure Silk Sarees from Myntra at best price range in India. Shop for Art Silk Printed Saree, Cotton Silk Sarees in various colours', '1500', 6, 'cotton', 10, 'product-1626949135042.jpeg', '2021-07-22 15:48:55', '2021-07-22 15:48:55', 1),
(6, 3, 2, 'New saree', 'Silk Sarees - Buy Pure Silk Sarees from Myntra at best price range in India. Shop for Art Silk Printed Saree, Cotton Silk Sarees in various colours', '1500', 6, 'cotton', 10, 'product-1626949177770.jpeg', '2021-07-22 15:49:37', '2021-07-22 15:49:37', 1),
(7, 2, 6, 'Silk Saree', 'Silk Sarees - Buy Pure Silk Sarees from Myntra at best price range in India. Shop for Art Silk Printed Saree, Cotton Silk Sarees in various colours', '200', 5, 'cotton', 10, 'product-1626949204579.jpeg', '2021-07-22 15:50:04', '2021-07-22 15:50:04', 1),
(8, 3, 6, 'Silk Saree', 'Silk Sarees - Buy Pure Silk Sarees from Myntra at best price range in India. Shop for Art Silk Printed Saree, Cotton Silk Sarees in various colours', '500', 5, 'cotton', 50, 'product-1626949229263.jpeg', '2021-07-22 15:50:29', '2021-07-22 15:50:29', 1),
(9, 4, 4, 'Banarasi Saree', 'The sari or śāṭikā evolved from a three-piece ensemble comprising the antarīya, the lower garment; the uttarīya', '500', 5, 'cotton', 50, 'product-1626949475840.jpeg', '2021-07-22 15:54:35', '2021-07-22 15:54:35', 1),
(10, 2, 6, 'Banarasi Saree', 'The sari or śāṭikā evolved from a three-piece ensemble comprising the antarīya, the lower garment; the uttarīya', '1000', 6, 'Febric', 50, 'product-1626949522603.jpeg', '2021-07-22 15:55:22', '2021-07-22 16:01:37', 1),
(22, 4, 5, 'sdfadsff', 'gfasgfdsfasfdf', '100', 6, 'cloths', 5, 'product-1637824497170.jpeg', '2021-11-25 12:44:57', '2021-11-25 12:44:57', 1);

-- --------------------------------------------------------

--
-- Table structure for table `smmi`
--

CREATE TABLE `smmi` (
  `id` int(11) NOT NULL,
  `image` varchar(250) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `smmi`
--

INSERT INTO `smmi` (`id`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'smmi-1637563758990.jpeg', '2021-11-22 12:19:18', '2021-11-22 12:19:18'),
(2, 'smmi-1637563777421.jpeg', '2021-11-22 12:19:37', '2021-11-22 12:19:37'),
(3, 'smmi-1637563786768.jpeg', '2021-11-22 12:19:46', '2021-11-22 12:19:46'),
(4, 'smmi-1637563796216.jpeg', '2021-11-22 12:19:56', '2021-11-22 12:19:56'),
(5, 'smmi-1637563809707.jpeg', '2021-11-22 12:20:09', '2021-11-22 12:20:09'),
(6, 'smmi-1637563819983.jpeg', '2021-11-22 12:20:19', '2021-11-22 12:20:19'),
(7, 'smmi-1637563943717.jpeg', '2021-11-22 12:22:23', '2021-11-22 12:22:23'),
(8, 'smmi-1637563954029.jpeg', '2021-11-22 12:22:34', '2021-11-22 12:22:34'),
(9, 'smmi-1637563963784.jpeg', '2021-11-22 12:22:43', '2021-11-22 12:22:43'),
(10, 'smmi-1637563975716.jpeg', '2021-11-22 12:22:55', '2021-11-22 12:22:55'),
(11, 'smmi-1637563983730.jpeg', '2021-11-22 12:23:03', '2021-11-22 12:23:03'),
(12, '', '2021-11-23 11:46:55', '2021-11-23 11:46:55'),
(13, 'smmi-1637828179013.jpeg', '2021-11-25 13:46:19', '2021-11-25 13:46:19'),
(14, 'smmi-1637844741050.png', '2021-11-25 18:22:21', '2021-11-25 18:22:21'),
(15, 'smmi-1637845195801.jpeg', '2021-11-25 18:29:55', '2021-11-25 18:29:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_role_id` int(11) DEFAULT 2,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `token` text DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `phone` varchar(10) DEFAULT NULL,
  `login_verification_code` varchar(255) DEFAULT NULL,
  `verification_code_expired_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_role_id`, `email`, `first_name`, `last_name`, `profile_image`, `address`, `token`, `password`, `status`, `phone`, `login_verification_code`, `verification_code_expired_at`, `updated_by`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'komalsuthar@whatsadeal.com', 'komal', 'suthar', 'admin.png', 'W:304 News Avenue Appt. b/h sneh sankul wadi adajan, suart', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9yb2xlX2lkIjoxLCJlbWFpbCI6ImtvbWFsc3V0aGFyQHdoYXRzYWRlYWwuY29tIiwiZmlyc3RfbmFtZSI6ImtvbWFsIiwibGFzdF9uYW1lIjoic3V0aGFyIiwic3RhdHVzIjoxLCJwcm9maWxlX2ltYWdlIjoiYWRtaW4ucG5nIiwicGhvbmUiOiI5NzI0NDc1NDI1IiwiYWRkcmVzcyI6Ilc6MzA0IE5ld3MgQXZlbnVlIEFwcHQuIGIvaCBzbmVoIHNhbmt1bCB3YWRpIGFkYWphbiwgc3VhcnQiLCJpYXQiOjE2Mzc4MjQ0NTUsImV4cCI6MTYzNzg2NzY1NX0.YL9UHqh8gAVV6xqoRU2FtTVLXmFfjJne4RvvoEoEpfo', '$2a$12$pNKLhx//tG4pV2iSuwKETOL7uhiRRLYU/qeBpyfCy.NdhNAmI69fy', 1, '9724475425', '651D6B', '2021-11-25 12:53:57', NULL, NULL, '2021-07-22 11:46:12', '2021-11-25 12:44:15'),
(2, 1, 'kishantiwari@whatsadeal.com', 'Kishan', 'Tiwari', 'user-1626949743991.png', 'E:407 Police colony, Pandesara', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcl9yb2xlX2lkIjoxLCJlbWFpbCI6Imtpc2hhbnRpd2FyaUB3aGF0c2FkZWFsLmNvbSIsImZpcnN0X25hbWUiOiJLaXNoYW4iLCJsYXN0X25hbWUiOiJUaXdhcmkiLCJzdGF0dXMiOjEsInByb2ZpbGVfaW1hZ2UiOiJ1c2VyLTE2MjY5NDk3NDM5OTEucG5nIiwicGhvbmUiOiI5ODc0NTY5ODU2IiwiYWRkcmVzcyI6IkU6NDA3IFBvbGljZSBjb2xvbnksIFBhbmRlc2FyYSIsImlhdCI6MTYzNzg0NDY3MCwiZXhwIjoxNjM3ODg3ODcwfQ.8uaGJ-s5gpZBZVPK396hpWxzptmm5Ypjij9TYhixRHc', '$2a$12$pNKLhx//tG4pV2iSuwKETOL7uhiRRLYU/qeBpyfCy.NdhNAmI69fy', 1, '9874569856', '544EA5', '2021-11-25 18:30:35', NULL, NULL, '2021-07-22 15:56:52', '2021-11-25 18:21:10'),
(3, 2, 'ajaykoli@whatsdeal.com', 'Ajay', 'Koli', 'user-1626949711705.png', 'A-119 Navyug College , Adajan Suart', NULL, '$2a$12$CKHUh2Ipj6hnjlB64ELWA.r6xUGGYhFiCQgol2UHz5wtey6Ci5e1y', 1, '9874568522', NULL, NULL, NULL, NULL, '2021-07-22 15:57:54', '2021-07-22 15:58:31'),
(4, 1, 'Komal@gmail.com', 'Komal', 'Suthar', NULL, 'Adajan', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcl9yb2xlX2lkIjoxLCJlbWFpbCI6IktvbWFsQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJLb21hbCIsImxhc3RfbmFtZSI6IlN1dGhhciIsInN0YXR1cyI6MSwicHJvZmlsZV9pbWFnZSI6bnVsbCwicGhvbmUiOiI3ODk1Njg1Njg5IiwiYWRkcmVzcyI6IkFkYWphbiIsImlhdCI6MTYyODA2NjA1NSwiZXhwIjoxNjI4MTA5MjU1fQ.qADFd4wZyNZ_Kj8t9XJsPzvOrbIMFE45ak7C_ihQnFQ', '$2a$12$7ml4UfQeymKdo.Ds/2Gz6.1TqGTOsVKpFqEPLzoplAC9uo3EGsek.', 1, '7895685689', 'E4F406', '2021-08-04 14:16:38', NULL, NULL, '2021-07-22 18:18:38', '2021-08-04 14:06:38'),
(5, 2, 'ajay@gmail.com', 'Ajay', 'Koli', NULL, 'Dindoli', NULL, '$2a$12$z39XxPFLz9.GMjrfDIHYUu.dBTF8bxDCFxMyI8nG.ZLDq9GBcuVbq', 1, '9875689569', NULL, NULL, NULL, NULL, '2021-07-22 18:19:07', '2021-07-22 18:19:07'),
(6, 2, 'kishan@gmail.com', 'Kishan', 'tiwari', NULL, 'Pandesara', NULL, '$2a$12$SvfducXtGWkVVPNs0u8xOuL3MI8T3sEUn54mWKXhXRLBjXVImkbhO', 1, '9875623685', NULL, NULL, NULL, NULL, '2021-07-22 18:19:40', '2021-07-22 18:19:40'),
(7, 2, 'kishant@gmail.com', 'kishant', 'kishant', NULL, 'bhkvkjbvkbv', NULL, '$2a$12$kBst2VML.yuPpFtdmXFp2O02hvNmqPFYSAGW2uU0Oe2YMlfoAI0Mq', 1, '5214637894', NULL, NULL, NULL, NULL, '2021-07-23 13:44:44', '2021-07-23 13:44:44'),
(8, 2, 'krishna@gmail.com', 'krishna', 'tiwari', NULL, 'fffdsfsfsfsfsffsf', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcl9yb2xlX2lkIjoyLCJlbWFpbCI6ImtyaXNobmFAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImtyaXNobmEiLCJsYXN0X25hbWUiOiJ0aXdhcmkiLCJzdGF0dXMiOjEsInByb2ZpbGVfaW1hZ2UiOm51bGwsInBob25lIjoiNDU2MTIzNzg5OCIsImFkZHJlc3MiOiJmZmZkc2ZzZnNmc2ZzZmZzZiIsImlhdCI6MTYyNzA0MjAzMCwiZXhwIjoxNjI3MDg1MjMwfQ.9Be_r_VMzr_2QdcP2eRXErGHYCWGOgl-5YXk9l30kWk', '$2a$12$OL6uqi.l1495/oUup0pUoOT5IsTN5PzTADeO2avke9Z0.UkfufRqW', 1, '4561237898', NULL, NULL, NULL, NULL, '2021-07-23 15:02:46', '2021-07-23 17:37:10'),
(9, 2, 'test@gmail.com', 'test', 'data', NULL, 'w:304 news avenue appt. b/h sneh sankul wadi , adajan , surat', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcl9yb2xlX2lkIjoyLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6InRlc3QiLCJsYXN0X25hbWUiOiJkYXRhIiwic3RhdHVzIjoxLCJwcm9maWxlX2ltYWdlIjpudWxsLCJwaG9uZSI6Ijk3MjQ0NzU0NjYiLCJhZGRyZXNzIjoidzozMDQgbmV3cyBhdmVudWUgYXBwdC4gYi9oIHNuZWggc2Fua3VsIHdhZGkgLCBhZGFqYW4gLCBzdXJhdCIsImlhdCI6MTYyODA3MjY5MiwiZXhwIjoxNjI4MTE1ODkyfQ.9qmaYsemIxf00WGz1l27yWcRUZHGH4qU4u6-nK4Tqh4', '$2a$12$Rpkn05I5EGhYV7KGp4Bim.ccWX7ZYy2Ux9dQoihvEEgpZ.lZwsneS', 1, '9724475466', NULL, NULL, NULL, NULL, '2021-07-24 12:32:23', '2021-08-04 15:54:52'),
(10, 2, 'testnew@gmail.com', 'test', 'data', 'user-1628156843407.png', 'adajan', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJfcm9sZV9pZCI6MiwiZW1haWwiOiJ0ZXN0bmV3QGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJ0ZXN0IiwibGFzdF9uYW1lIjoiZGF0YSIsInN0YXR1cyI6MSwicHJvZmlsZV9pbWFnZSI6InVzZXItMTYyODE1Njg0MzQwNy5wbmciLCJwaG9uZSI6Ijk4NTc0NTY4NTYiLCJhZGRyZXNzIjoiYWRhamFuIiwiaWF0IjoxNjI4MjM0MDMwLCJleHAiOjE2MjgyNzcyMzB9.RVsP7jXYcwAYvS8nbEspM0KQYB0idbOLy7XSO7pwyDI', '$2a$12$oyfZGwt20J22JrdAi03CwuBiCsTWEgUmSVjK/ejoRXif3iLetS.lS', 1, '9857456856', NULL, NULL, NULL, NULL, '2021-07-24 12:33:43', '2021-08-06 12:43:50'),
(12, 1, 'ashutoshagarwal100@mailsac.com', 'ashutosh', 'agarwal', NULL, '1kjkj', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJfcm9sZV9pZCI6MSwiZW1haWwiOiJhc2h1dG9zaGFnYXJ3YWwxMDBAbWFpbHNhYy5jb20iLCJmaXJzdF9uYW1lIjoiYXNodXRvc2giLCJsYXN0X25hbWUiOiJhZ2Fyd2FsIiwic3RhdHVzIjoxLCJwcm9maWxlX2ltYWdlIjpudWxsLCJwaG9uZSI6Ijk4NTY4NTc0NDQiLCJhZGRyZXNzIjoiMWtqa2oiLCJpYXQiOjE2MjcxMTI3MTUsImV4cCI6MTYyNzE1NTkxNX0.QjRXc9IFu3qG5klxXhEd7zhUP5oeoIrYdTWc8AMY90A', '$2a$12$a/IJnHS1d.LYbIcdpMTrOeuqIOkuErRpjtvV9kCF/M3AtSJa1nQAW', 1, '9856857444', '6B8A6E', '2021-07-24 13:23:50', NULL, NULL, '2021-07-24 13:08:57', '2021-07-24 13:15:15'),
(13, 2, 'abc@gmail.com', 'abc', 'def', NULL, 'adajan', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJfcm9sZV9pZCI6MiwiZW1haWwiOiJhYmNAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImFiYyIsImxhc3RfbmFtZSI6ImRlZiIsInN0YXR1cyI6MSwicHJvZmlsZV9pbWFnZSI6bnVsbCwicGhvbmUiOiI5ODc0NTY4NTk2IiwiYWRkcmVzcyI6ImFkYWphbiIsImlhdCI6MTYyNzY0NjY3MiwiZXhwIjoxNjI3Njg5ODcyfQ.11PlnnjvZSg4pROU4SOygUOrDghHSQh48rnNn1x9XMc', '$2a$12$FzUiHUAve3LOh56irBVZxukJ/uRiNZuaGLvhtv2xvml1k/jPRNWyK', 1, '9874568596', NULL, NULL, NULL, NULL, '2021-07-30 17:31:55', '2021-07-30 17:34:32'),
(14, 2, 'kishantiwariii@whatsadeal.com', 'kishan', 'tiwari', NULL, 'tredreyreyy', NULL, '$2a$12$TUn6vOI3E53Lm8AoPMK5Z.NklG2eCs8zQj3/Y49BWHrCpq9zi7uJi', 1, '8256321412', NULL, NULL, NULL, NULL, '2021-07-31 16:01:35', '2021-07-31 16:01:35'),
(15, 2, 'asd123@asd.sdsadd', 'asd', 'asd', NULL, 'wedf', NULL, '$2a$12$EWNwU2EiNeEgeNTgL9aoteHaIuznBhJrbl7JKdL4CgWf2xZ.wG/qu', 1, '8796541123', NULL, NULL, NULL, NULL, '2021-07-31 16:06:42', '2021-07-31 16:06:42'),
(16, 2, 'asd222@asd.sdsadd', 'sdf', 'sdf', NULL, 'aerfa', NULL, '$2a$12$.MlyQWV81KcJZ1IdEFfwnediUNbQVJzc1uCdE0P90yWWz6XQ/P/UK', 1, '8796541222', NULL, NULL, NULL, NULL, '2021-07-31 16:07:10', '2021-07-31 16:07:10'),
(17, 2, 'kishaggn@gmail.com', 'kishanfddf', 'tiwari', NULL, 'gssgsgsgsgsg', NULL, '$2a$12$HXm7eHRJREVL5C5876fKLeLox9Ll7owRWFg7uMfxBGRXWOvnh28EC', 1, '8966475315', NULL, NULL, NULL, NULL, '2021-07-31 17:27:39', '2021-07-31 17:27:39'),
(18, 2, 'testnew123@gmail.com', 'asd', 'asd', NULL, 'aqsd', NULL, '$2a$12$7Yng9776dVbPixDd50qf..P2hlXMTVIr0W9ZQrGC02NFGS24FFdte', 1, '8796541236', NULL, NULL, NULL, NULL, '2021-07-31 17:28:41', '2021-07-31 17:28:41'),
(19, 2, 'kishantiwzzzzari@whatsadeal.com', 'kishan', 'tiwari', NULL, 'fdsfsadfsfd', NULL, '$2a$12$Fv1b6XYh58SdpPx4W/z9AernNiPawt2mWbOHumjfOjOqSwvhunlzS', 1, '7895456121', NULL, NULL, NULL, NULL, '2021-07-31 18:29:52', '2021-07-31 18:29:52'),
(20, 2, 'testnewasd@gmail.com', 'sad', 'asd', NULL, 'szadasd', NULL, '$2a$12$ao8p3eyJhIwKMNwiRZ5KbuQxvjQ/pG5tCdwNPKFPevFS5XDxLkBVW', 1, '8796541255', NULL, NULL, NULL, NULL, '2021-07-31 18:35:02', '2021-07-31 18:35:02'),
(21, 2, 'asd@asd.sdsadd', 'asd', 'xdc', NULL, 'SAas', NULL, '$2a$12$ViEwiQV5s6bJY/1pd8gpgO8VLifVHaetvt1MtBtGsS/w6eFlkA.oa', 1, '8796541288', NULL, NULL, NULL, NULL, '2021-08-03 12:31:42', '2021-08-03 12:31:42'),
(22, 2, 'testnewAS@gmail.com', 'asd', 'asd', NULL, 'as', NULL, '$2a$12$SiT0cGbJZSQMN5Jwp3qyEeEHXCAIi0TUP2NwOLOQR1pywsbqo/whK', 1, '9856666666', NULL, NULL, NULL, NULL, '2021-08-04 12:23:14', '2021-08-04 12:23:14'),
(23, 2, 'assaASS@jkasdk.conm', 'asdasd', 'Tiwari ', NULL, 'asAs', NULL, '$2a$12$C/ndj5/xfZiONLNzNmWza.PsUqu1eQIdXuE94Jb6csHfJiunz5WTq', 1, '9856856963', NULL, NULL, NULL, NULL, '2021-08-04 13:16:48', '2021-08-04 13:16:48'),
(24, 2, 'jjljsfaa@gmail.com', 'kjfiaj', 'jallafjlj', NULL, 'caaaafaf', NULL, '$2a$12$seF4TGmjirjx.iGim1JaRuAeDauQOTusRLaxvRpmihCus3w3voHd.', 1, '1928374727', NULL, NULL, NULL, NULL, '2021-08-04 15:54:34', '2021-08-04 15:54:34'),
(25, 2, 'tiwarikishan@gmail.com', 'kjfiaj', 'jallafjlj', NULL, 'caaaafaf', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJfcm9sZV9pZCI6MiwiZW1haWwiOiJ0aXdhcmlraXNoYW5AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImtqZmlhaiIsImxhc3RfbmFtZSI6ImphbGxhZmpsaiIsInN0YXR1cyI6MSwicHJvZmlsZV9pbWFnZSI6bnVsbCwicGhvbmUiOiIxOTI4Mzc0NzE3IiwiYWRkcmVzcyI6ImNhYWFhZmFmIiwiaWF0IjoxNjI4MDcyODAyLCJleHAiOjE2MjgxMTYwMDJ9.wMiS2QE9Um-UYH7he-9wC5A3FLoHPeh1B8V0LQiAz-0', '$2a$12$yhGniKQQDStA8cXUtMzm9OEJK8ijH9JGh3N6tDR4j42RuRcf6rjJu', 1, '1928374717', NULL, NULL, NULL, NULL, '2021-08-04 15:56:07', '2021-08-04 15:56:42'),
(26, 2, 'jjljsfaass@gmail.com', 'kjfiaj', 'jallafjlj', NULL, 'caaaafaf', NULL, '$2a$12$pSTl.UDbSI2mLIQHXKrR2eknNlTcZzR0PjukavmJ5NIySaKyZXdCC', 1, '1921374727', NULL, NULL, NULL, NULL, '2021-08-04 16:30:49', '2021-08-04 16:30:49'),
(27, 2, 'jjljsxxxxxfaa@gmail.com', 'kjfiaj', 'jallafjlj', NULL, 'caaaafaf', NULL, '$2a$12$UTdlJ7eL87tIDe8x2zXELudETZ9GZzDtMjNM/.tTpCB4fYPNNTeUa', 1, '1928372727', NULL, NULL, NULL, NULL, '2021-08-04 16:31:09', '2021-08-04 16:31:09'),
(28, 2, 'kt@gmail.com', 'kishan1', 'jjokjiojoj', NULL, 'xzxzxzx', NULL, '$2a$12$PU/XIywhWo7V2.8qZZCLIeuYhl4gDIDPIXC9prs1G5kMZ1qgFk6pa', 1, '8527419512', NULL, NULL, NULL, NULL, '2021-08-05 10:47:01', '2021-08-05 10:47:01'),
(29, 2, 'ktt@gmail.com', 'kishan1', 'jjokjiojoj', 'user-1628156817070.png', 'xccczcc', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksInVzZXJfcm9sZV9pZCI6MiwiZW1haWwiOiJrdHRAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6Imtpc2hhbjEiLCJsYXN0X25hbWUiOiJqam9ramlvam9qIiwic3RhdHVzIjoxLCJwcm9maWxlX2ltYWdlIjpudWxsLCJwaG9uZSI6Ijg1MjExMTk1MTIiLCJhZGRyZXNzIjoieGNjY3pjYyIsImlhdCI6MTYyODE0MTQ0OSwiZXhwIjoxNjI4MTg0NjQ5fQ.hOi8_b0UaH8jJpaMTeavaMnkHUUnfqu6RNiivWTKf7k', '$2a$12$K6BY74fhTb2sEFmkQiwciOObf4u/3S5RDxFRjiccp9hCzGpMTENqm', 1, '8521119512', NULL, NULL, NULL, NULL, '2021-08-05 10:49:28', '2021-08-05 15:16:57'),
(30, 2, 'lastdata@gmail.com', 'last', 'data', NULL, 'Adajan', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsInVzZXJfcm9sZV9pZCI6MiwiZW1haWwiOiJsYXN0ZGF0YUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoibGFzdCIsImxhc3RfbmFtZSI6ImRhdGEiLCJzdGF0dXMiOjEsInByb2ZpbGVfaW1hZ2UiOm51bGwsInBob25lIjoiOTg3NDUyMjIxNSIsImFkZHJlc3MiOiJBZGFqYW4iLCJpYXQiOjE2MjgxNTczNDAsImV4cCI6MTYyODIwMDU0MH0.2Lnw4sylAe9qgjpiRdw8JiILInf4GX0w33Q7JIlpiv0', '$2a$12$d4xUA2ezgUHxvuY09Nftwuu08gr/pFyLpksLgLJHIRuFHMCPTeNXy', 1, '9874522215', NULL, NULL, NULL, NULL, '2021-08-05 15:25:23', '2021-08-05 15:25:40'),
(31, 2, 'kishan1@gmail.com', 'kisjah', 'kishan', '', 'yghshybjag', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsInVzZXJfcm9sZV9pZCI6MiwiZW1haWwiOiJraXNoYW4xQGdtYWlsLmNvbSIsImZpcnN0X25hbWUiOiJraXNqYWgiLCJsYXN0X25hbWUiOiJraXNoYW4iLCJzdGF0dXMiOjEsInByb2ZpbGVfaW1hZ2UiOiJ1c2VyLTE2MjgyMzQxODkwNjIucG5nIiwicGhvbmUiOiI3ODk0NTYyNTgxIiwiYWRkcmVzcyI6InlnaHNoeWJqYWciLCJpYXQiOjE2MjgyMzQzMTMsImV4cCI6MTYyODI3NzUxM30.HEhCIf2b6FSBa92MQh-6LtRSjBS0o8cOqMRD9PJ9xBs', '$2a$12$zLDgUx/z9k0EzhOtOC0bNu2YGM0tE0vKguqC5c83h/3XVUMM0AwKW', 1, '7894562581', NULL, NULL, NULL, NULL, '2021-08-06 11:26:40', '2021-08-06 12:48:33'),
(32, 2, 'kks@gmail.com', 'komal', 'suthar', NULL, 'adajan', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsInVzZXJfcm9sZV9pZCI6MiwiZW1haWwiOiJra3NAZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6ImtvbWFsIiwibGFzdF9uYW1lIjoic3V0aGFyIiwic3RhdHVzIjoxLCJwcm9maWxlX2ltYWdlIjpudWxsLCJwaG9uZSI6IjEyMzQ1Njc4OTUiLCJhZGRyZXNzIjoiYWRhamFuIiwiaWF0IjoxNjM3ODM1NzQwLCJleHAiOjE2Mzc4Nzg5NDB9.NiDk_4JBPZTf4nYjjfq_0IxUQDdV3TQ6CVKO7_2BloU', '$2a$12$E76dqt0RN49B9XarprxibOt0vPKlg/weMFS5hwzEiviEZp1qFRXNO', 1, '1234567895', NULL, NULL, NULL, NULL, '2021-11-13 11:39:53', '2021-11-25 15:52:20'),
(33, 2, 'shoptest@gmail.com', 'test', 'data', NULL, 'Adajan, Surat', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsInVzZXJfcm9sZV9pZCI6MiwiZW1haWwiOiJzaG9wdGVzdEBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoidGVzdCIsImxhc3RfbmFtZSI6ImRhdGEiLCJzdGF0dXMiOjEsInByb2ZpbGVfaW1hZ2UiOm51bGwsInBob25lIjoiOTg3NDUyMzU4NSIsImFkZHJlc3MiOiJBZGFqYW4sIFN1cmF0IiwiaWF0IjoxNjM3NTc1MDg1LCJleHAiOjE2Mzc2MTgyODV9.0NkQ5omYF9P7c5f0hdFjblt3PxJb-DWbEOqFZACcR_4', '$2a$12$PJ7FdBxjSNCxE.rSWMb2ROH5s9YeA0jgWQoExH.Q1RQ8Fg4g3Y3pK', 1, '9874523585', NULL, NULL, NULL, NULL, '2021-11-22 15:27:50', '2021-11-22 15:28:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add-to-cart`
--
ALTER TABLE `add-to-cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactus_smmi`
--
ALTER TABLE `contactus_smmi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_id` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product` (`product_id`),
  ADD KEY `order` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `products` (`color_id`);

--
-- Indexes for table `smmi`
--
ALTER TABLE `smmi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add-to-cart`
--
ALTER TABLE `add-to-cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `contactus_smmi`
--
ALTER TABLE `contactus_smmi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `smmi`
--
ALTER TABLE `smmi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `products` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
