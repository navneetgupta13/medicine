-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2018 at 05:00 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicine`
--

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id` int(11) NOT NULL,
  `description` varchar(512) NOT NULL,
  `name` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `form` varchar(100) NOT NULL,
  `dose` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `description`, `name`, `company`, `form`, `dose`) VALUES
(1, 'Pain and fever (high temperature) in adults and children', 'Alcocin(500mg)', 'Alicon Pharmaceuticals Pvt. Ltd.', 'Tablet  ', '500mg'),
(2, 'Pain and fever (high temperature) in adults and children', 'Alcocin(60ml)', 'Alicon Pharmaceuticals Pvt. Ltd.', 'Suspension   ', '60ml/5ml'),
(3, 'Pain and fever (high temperature) in adults and children', 'Calpol(120mg)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Suspension   ', '250mg/5ml'),
(4, 'Pain and fever (high temperature) in adults and children', 'Calpol(125mg/5ml)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Oral Suspension', '125mg/5ml'),
(5, 'Pain and fever (high temperature) in adults and children', 'Calpol(150mg/5ml)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Oral Suspension', '150mg/5ml'),
(6, 'Pain and fever (high temperature) in adults and children', 'Calpol(250mg)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Suspension   ', '60ml/5ml'),
(7, 'Pain and fever (high temperature) in adults and children', 'Calpol(500mg)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Tablet  ', '500mg'),
(8, 'Pain and fever (high temperature) in adults and children', 'Calpol(500mg)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Tablet  ', '650mg'),
(9, 'Pain and fever (high temperature) in adults and children', 'Calpol(650mg)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Tablet  ', '650mg'),
(10, 'Pain and fever (high temperature) in adults and children', 'Calpol(650mg)', 'Himsagar Laboratories Ltd.', 'Tablet  ', '650mg'),
(11, 'Pain and fever (high temperature) in adults and children', 'Crocin(1000mg)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Tablet  ', '650mg'),
(12, 'Pain and fever (high temperature) in adults and children', 'Crocin(100mg/ml)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Oral Suspension', '100mg/ml'),
(13, 'Pain and fever (high temperature) in adults and children', 'Crocin(120mg/5ml)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Oral Suspension', '120mg/5ml'),
(14, 'Pain and fever (high temperature) in adults and children', 'Crocin(15ml)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Drops', '15ml/1ml'),
(15, 'Pain and fever (high temperature) in adults and children', 'Crocin(500mg)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Tablet  ', '500mg'),
(16, 'Pain and fever (high temperature) in adults and children', 'Crocin(500mg)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Tablet  ', '650mg'),
(17, 'Pain and fever (high temperature) in adults and children', 'Crocin(60ml)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Syrup   ', '60ml/5ml'),
(18, 'Pain and fever (high temperature) in adults and children', 'Crocin(650mg)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Tablet  ', '1000mg'),
(19, 'Pain and fever (high temperature) in adults and children', 'Crocin(650mg)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Tablet  ', '650mg'),
(20, 'Pain and fever (high temperature) in adults and children', 'Crocin1000(1000mg)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Tablet  ', '1000mg'),
(21, 'Pain and fever (high temperature) in adults and children', 'CrocinDS(60ml)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Syrup   ', '60ml/5ml'),
(22, 'Pain and fever (high temperature) in adults and children', 'CrocinPaed(15ml)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Drops', '15ml/1ml'),
(23, 'Pain and fever (high temperature) in adults and children', 'CrocinQuik(500mg)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Oral Suspension', '500mg'),
(24, 'Pain and fever (high temperature) in adults and children', 'CrocinQuik(500mg)', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Tablet  ', '650mg'),
(25, 'Pain and fever (high temperature) in adults and children', 'Crocin-DS(240mg/5ml)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Oral Suspension', '240mg/5ml'),
(26, 'Relief of pain, inflammation, or fever', 'Iburin(600mg)', 'Unichem Laboratories Ltd.', 'Tablet  ', '600mg'),
(27, 'Relief of pain, inflammation, or fever', 'IbuspanSR', 'Emcure Pharmaceuticals Ltd.', 'Tablet  ', '800mg'),
(28, 'Relief of pain, inflammation, or fever', 'IbuspanSR', 'Emcure Pharmaceuticals Ltd.', 'Tablet  ', '800mg'),
(29, 'Relief of pain, inflammation, or fever', 'Ibuspan-SR(800mg)', 'Emcure Pharmaceuticals Ltd.', 'Tablet  ', '800mg'),
(31, 'Relief of pain, inflammation, or fever', 'Ibusynth', 'AstraZeneca Pharma India Ltd.', 'Tablet  ', '200mg'),
(32, 'Relief of pain, inflammation, or fever', 'IbusynthF', 'AstraZeneca Pharma India Ltd.', 'Tablet  ', '400mg'),
(33, 'Relief of pain, inflammation, or fever', 'Ibut-200', 'Leben Laboratories Pvt. Ltd.', 'Tablet  ', '200mg'),
(34, 'Relief of pain, inflammation, or fever', 'Ibutos', 'Tosc International Pvt Ltd.', 'Tablet  ', '200mg'),
(35, 'Relief of pain, inflammation, or fever', 'Ibutos(200mg)', 'Tosc International Pvt Ltd.', 'Tablet  ', ''),
(36, 'Relief of pain, inflammation, or fever', 'Ibutos(200mg)', 'Tosc International Pvt Ltd.', 'Tablet  ', '200 mg'),
(37, 'Relief of pain, inflammation, or fever', 'InfenSR', 'Emcure Pharmaceuticals Ltd.', 'Tablet  ', '600mg'),
(38, 'Relief of pain, inflammation, or fever', 'Inflapen(300mg)', 'Glaxo SmithKline Pharmaceuticals Ltd.', 'Controlled Release Tablet', '300mg'),
(39, 'Relief of pain, inflammation, or fever', 'InflapenCR', 'GlaxoSmithKline Pharmaceuticals Ltd', 'Capsule', '300mg'),
(40, 'Relief of pain, inflammation, or fever', 'Mybu', 'Neon Laboratories Limited', 'Tablet  ', '200mg'),
(41, 'Relief of pain, inflammation, or fever', 'Myofen(400mg)', 'NuLife Pharmaceuticals', 'Tablet  ', '400mg'),
(42, 'Relief of pain, inflammation, or fever', 'Norswel', 'Cadila Healthcare Limited', 'Tablet  ', '400mg'),
(43, 'Relief of pain, inflammation, or fever', 'Norswel(400mg)', 'Zydus Cadila Healthcare Ltd.', 'Tablet  ', '400mg'),
(44, 'Relief of pain, inflammation, or fever', 'Nuren', 'Dabur Pharma Limited', 'Tablet  ', '400mg'),
(45, 'Relief of pain, inflammation, or fever', 'Nuren', 'Dabur Pharma Limited', 'Tablet  ', '200mg'),
(46, 'itching or dryness of the skin', 'Cort-H', 'Neon Laboratories Limited', 'Cream', '100mg'),
(47, 'itching or dryness of the skin', 'Cort-H', 'Neon Laboratories Limited', 'Gel', '100mg'),
(48, 'itching or dryness of the skin', 'Cort-H', 'Neon Laboratories Limited', 'Ointment', '100mg'),
(49, 'itching or dryness of the skin', 'HisoneTab', 'Samarth Pharma Pvt. Ltd.', 'Capsule', '20mg'),
(50, 'itching or dryness of the skin', 'HisoneTab', 'Samarth Pharma Pvt. Ltd.', 'Tablet', '20mg'),
(51, 'itching or dryness of the skin', 'HisoneTab', 'Samarth Pharma Pvt. Ltd.', 'Capsule', '5gm'),
(52, 'itching or dryness of the skin', 'HisoneTab', 'Samarth Pharma Pvt. Ltd.', 'Tablet', '5gm'),
(53, 'itching or dryness of the skin', 'HisoneTab', 'Samarth Pharma Pvt. Ltd.', 'Cream', '10gm'),
(54, 'itching or dryness of the skin', 'HisoneTab', 'Samarth Pharma Pvt. Ltd.', 'Gel', '10gm'),
(55, 'itching or dryness of the skin', 'HisoneTab', 'Samarth Pharma Pvt. Ltd.', 'Ointment', '10gm'),
(56, 'itching or dryness of the skin', 'LocoidLipo', 'Elder Pharmaceuticals Pvt. Ltd.', 'Cream', '100gm'),
(57, 'itching or dryness of the skin', 'LocoidLipo', 'Elder Pharmaceuticals Pvt. Ltd.', 'Gel', '100gm'),
(58, 'itching or dryness of the skin', 'LocoidLipo', 'Elder Pharmaceuticals Pvt. Ltd.', 'Ointment', '100gm'),
(59, 'itching or dryness of the skin', 'LocoidLipo', 'Elder Pharmaceuticals Pvt. Ltd.', 'Lotion', '100gm'),
(60, 'itching or dryness of the skin', 'Lycor', 'Micro Labs Ltd (Eros)', 'Cream', '100gm');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` enum('PENDING','RECEIVED') NOT NULL DEFAULT 'PENDING',
  `owner` int(11) NOT NULL,
  `recipient` int(11) DEFAULT NULL,
  `received_time` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `time`, `state`, `owner`, `recipient`, `received_time`) VALUES
(80, '2018-04-02 18:50:00', 'RECEIVED', 7, NULL, '2018-04-03 18:02:28'),
(81, '2018-04-02 18:51:17', 'RECEIVED', 8, NULL, '2018-04-03 18:00:55'),
(84, '2018-04-05 14:57:06', 'PENDING', 8, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_detail`
--

CREATE TABLE `transaction_detail` (
  `id` int(11) NOT NULL,
  `transaction` int(11) NOT NULL,
  `medicine` int(11) NOT NULL,
  `expiry` date DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction_detail`
--

INSERT INTO `transaction_detail` (`id`, `transaction`, `medicine`, `expiry`, `quantity`, `time`) VALUES
(15, 80, 7, '2018-03-02', 10, '2018-04-05 14:56:16'),
(16, 80, 16, '2018-03-02', 10, '2018-04-05 14:56:16'),
(17, 81, 7, '2018-03-02', 10, '2018-04-05 14:56:16'),
(18, 81, 16, '2018-03-02', 10, '2018-04-05 14:56:16'),
(23, 84, 7, '2018-03-02', 10, '2018-04-05 14:57:06'),
(24, 84, 16, '2018-03-02', 10, '2018-04-05 14:57:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `pincode` varchar(6) NOT NULL,
  `type` enum('admin','user','ngo') NOT NULL DEFAULT 'user',
  `password` varchar(100) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL DEFAULT 'india',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `address`, `pincode`, `type`, `password`, `time`, `state`, `country`, `is_deleted`) VALUES
(3, 'navneet', 'navneet@gmail.com', '9988899888', 'flat 204', '201301', 'user', 'password', '2018-04-01 10:08:14', 'up', 'india', 0),
(7, 'himani', 'himani@gmail.com', '9815022222', 'flat 204, tower 14, lotus boulevard', '201302', 'user', 'password', '2018-04-02 18:46:10', 'up', 'india', 0),
(8, 'rks', 'rks@gmail.com', '9815038550', 'flat 204, tower 14, lotus boulevard', '201301', 'user', 'password', '2018-04-02 18:50:59', 'up', 'india', 0),
(9, 'manas', 'manas@gmail.com', '9815048550', 'flat 204, tower 14, lotus boulevard', '201301', 'user', 'password', '2018-04-03 17:01:23', 'up', 'india', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner` (`owner`),
  ADD KEY `recipient` (`recipient`);

--
-- Indexes for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction` (`transaction`),
  ADD KEY `medicine` (`medicine`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
--
-- AUTO_INCREMENT for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`recipient`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transaction_detail`
--
ALTER TABLE `transaction_detail`
  ADD CONSTRAINT `transaction_detail_ibfk_1` FOREIGN KEY (`transaction`) REFERENCES `transaction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_detail_ibfk_2` FOREIGN KEY (`medicine`) REFERENCES `medicine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
