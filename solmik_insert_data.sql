-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 21, 2015 at 10:36 AM
-- Server version: 5.5.40-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`id`, `parent_id`, `name`, `public`) VALUES
(1, NULL, '0 actual', 1),
(2, NULL, '1 main', 1);

--
-- Dumping data for table `Solmistring`
--

INSERT INTO `Solmistring` (`id`, `name`, `baseScale`, `string`, `soundKey`) VALUES
(1, 'name D', 6, 'string-d', '0'),
(2, 'name E', 7, 'string-e', '0'),
(4, 'd-r-m-f-s-l-t-d''-t-l-s-f-m-r-d', 3, 'd-r-m-f-s-l-t-d''-t-l-s-f-m-r-d', 'C'),
(5, 'd,,-d,-d-d''-d''''-d''-d-d,-d,,', 4, 'd,,-d,-d-d''-d''''-d''-d-d,-d,,', 'C'),
(6, 'AABBd-d-r-d-d-r-m-r-d-d-r-m-f-m-r-d-d-r-m-f-s-f-m-r-d-d-r-m-f-s-l-s-f-m-r-d-d-r-m-f-s-l-t-l-s-f-m-r-d-d-r-m-f-s-l-t-d''-t-l-s-f-m-r', 3, 'd-d-r-d-d-r-m-r-d-d-r-m-f-m-r-d-d-r-m-f-s-f-m-r-d-d-r-m-f-s-l-s-f-m-r-d-d-r-m-f-s-l-t-l-s-f-m-r-d-d-r-m-f-s-l-t-d''-t-l-s-f-m-r', 'C'),
(7, 'd-d-r-d-d-r-m-r-d-m-d-m-d-d-r-m-f-m-r-d-f-d-f-d-d-r-m-f-s-f-m-r-d-s-d-s-d-d-r-m-f-s-l-s-f-m-r-d-l-d-l-d-d-r-m-f-s-l-t-l-s-f-m-r-d-t-d-t-d-d-r-m-f-s-l-t-d''-t-l-s-f-m-r-d-d''-d-d''', 3, 'd-d-r-d-d-r-m-r-d-m-d-m-d-d-r-m-f-m-r-d-f-d-f-d-d-r-m-f-s-f-m-r-d-s-d-s-d-d-r-m-f-s-l-s-f-m-r-d-l-d-l-d-d-r-m-f-s-l-t-l-s-f-m-r-d-t-d-t-d-d-r-m-f-s-l-t-d''-t-l-s-f-m-r-d-d''-d-d''', 'C'),
(8, 's,-s,-l,-s,-s,-l,-t,-l,-s,-t,-s,-t,-s,-s,-l,-t,-d-t,-l,-s,-d-s,-d-s,-s,-l,-t,-d-r-d-t,-l,-s,-r-s,-r-s,-s,-l,-t,-d-r-m-r-d-t,-l,-s,-m-s,-m', 4, 's,-s,-l,-s,-s,-l,-t,-l,-s,-t,-s,-t,-s,-s,-l,-t,-d-t,-l,-s,-d-s,-d-s,-s,-l,-t,-d-r-d-t,-l,-s,-r-s,-r-s,-s,-l,-t,-d-r-m-r-d-t,-l,-s,-m-s,-m', 'C'),
(9, 'd-d-r-d-d-r-m-r-d-m-d-m-d-d-r-m-f-m-r-d-f-d-f-d-d-r-m-f-s-f-m-r-d-s-d-s', 4, 'd-d-r-d-d-r-m-r-d-m-d-m-d-d-r-m-f-m-r-d-f-d-f-d-d-r-m-f-s-f-m-r-d-s-d-s', 'C'),
(10, 'm-m-f-m-m-f-s-f-m-s-m-s-m-m-f-s-l-s-f-m-l-m-l', 4, 'm-m-f-m-m-f-s-f-m-s-m-s-m-m-f-s-l-s-f-m-l-m-l', 'C'),
(11, 's,-s,-l,-s,-s,-l,-t,-l,-s,-s,-l,-t,-d-t,-l,-s,-s,-l,-t,-d-r-d-t,-l,-s,-s,-l,-t,-d-r-m-r-d-t,-l,-s,-s,-l,-t,-d-r-m-f-m-r-d-t,-l,-s,-s,-l,-t,-d-r-m-f-s-f-m-r-d-t,-l,', 3, 's,-s,-l,-s,-s,-l,-t,-l,-s,-s,-l,-t,-d-t,-l,-s,-s,-l,-t,-d-r-d-t,-l,-s,-s,-l,-t,-d-r-m-r-d-t,-l,-s,-s,-l,-t,-d-r-m-f-m-r-d-t,-l,-s,-s,-l,-t,-d-r-m-f-s-f-m-r-d-t,-l,', 'C'),
(12, 'r-m-f-s-l-t-d''-t-l-s-f-m-r-d-d-r-m-f-s-l-t-l-s-f-m-r-d-d-r-m-f-s-l-s-f-m-r-d-d-r-m-f-s-f-m-r-d-d-r-m-f-m-r-d-d-r-m-r-d-d-r-d-d', 3, 'r-m-f-s-l-t-d''-t-l-s-f-m-r-d-d-r-m-f-s-l-t-l-s-f-m-r-d-d-r-m-f-s-l-s-f-m-r-d-d-r-m-f-s-f-m-r-d-d-r-m-f-m-r-d-d-r-m-r-d-d-r-d-d', 'C'),
(13, 'd-d-r-d-m-d-f-d-s-d-l-d-t-d-d''-r-r-m-r-f-r-s-r-l-r-t-r-d''-r-r''-m-m-f-m-s-m-l-m-t-m-d''-m-r''-m-m''-f-f-s-f-l-f-t-f-d''-f-r''-f-m''-f-f''-s-s-l-s-t-s-d''-s-r''-s-m''-s-f''-s-s''-l-l-t-l-d''-l-r''-l-m''-l-f''-l-s''-l-l''-t-t-d''-t-r''-t-m''-t-f''-t-s''-t-l''-t-t''-d''-d''-r''-d''-m''-d''', 3, 'd-d-r-d-m-d-f-d-s-d-l-d-t-d-d''-r-r-m-r-f-r-s-r-l-r-t-r-d''-r-r''-m-m-f-m-s-m-l-m-t-m-d''-m-r''-m-m''-f-f-s-f-l-f-t-f-d''-f-r''-f-m''-f-f''-s-s-l-s-t-s-d''-s-r''-s-m''-s-f''-s-s''-l-l-t-l-d''-l-r''-l-m''-l-f''-l-s''-l-l''-t-t-d''-t-r''-t-m''-t-f''-t-s''-t-l''-t-t''-d''-d''-r''-d''-m''-d''', 'C'),
(14, 'd-d-r-d-m-d-f-d-s-d-l-d-t-d-d''-m-m-f-m-s-m-l-m-t-m-d''-m-r''-m-m''-s-s-l-s-t-s-d''-s-r''-s-m''-s-f''-s-s''-d''-d''-r''-d''-m''-d''-f''-d''-s''-d''-l''-d''-t''-d''-d''''', 3, 'd-d-r-d-m-d-f-d-s-d-l-d-t-d-d''-m-m-f-m-s-m-l-m-t-m-d''-m-r''-m-m''-s-s-l-s-t-s-d''-s-r''-s-m''-s-f''-s-s''-d''-d''-r''-d''-m''-d''-f''-d''-s''-d''-l''-d''-t''-d''-d''''', 'C'),
(15, 'd-r-m-f-s-l-t-d''-r''-m''-f''-s''-l''-t''-d''''-d,,-r,,-m,,-f,,-s,,-l,,-t,,-d,-r,-m,-f,-s,-l,-t,-d', 4, 'd-r-m-f-s-l-t-d''-r''-m''-f''-s''-l''-t''-d''''-d,,-r,,-m,,-f,,-s,,-l,,-t,,-d,-r,-m,-f,-s,-l,-t,-d', 'C'),
(16, 'd,-m,-s,-d-m-s-d''-m''-s''-d''''-s''-m''-d''-s-m-d-s,-m,-d,', 4, 'd,-m,-s,-d-m-s-d''-m''-s''-d''''-s''-m''-d''-s-m-d-s,-m,-d,', 'C'),
(17, 'd,-r,-m,-d-r-m-d''-r''-m''-d''''-m''-r''-d''-m-r-d-m,-r,-d,', 4, 'd,-r,-m,-d-r-m-d''-r''-m''-d''''-m''-r''-d''-m-r-d-m,-r,-d,', 'C'),
(18, 'm-ru-di', 4, 'm-ru-di', 'C'),
(19, 'm,-ru,-di,', 4, 'm,-ru,-di,', 'C'),
(20, 'm''-ru''-di''', 4, 'm''-ru''-di''', 'C'),
(21, 'd-r-m-f-s-l-t-d''', 4, 'd-r-m-f-s-l-t-d''', 'C'),
(22, 'd-r-m-f-s-l-t-d''-d-di-r-ri-mi-f-fi-s-si-l-li-t-d''', 4, 'd-r-m-f-s-l-t-d''-d-di-r-ri-mi-f-fi-s-si-l-li-t-d''', 'C'),
(23, 'd-r-m-f-s-l-t-d''', 5, 'd-r-m-f-s-l-t-d''', 'C'),
(24, 'd-r|2-m|0.5-f-s-l-t-d''', 4, 'd-r|2-m|0.5-f-s-l-t-d''', 'C'),
(25, 'd-r|2-m|0.5-f|4-s|0.25-l|0.125-t-d''', 4, 'd-r|2-m|0.5-f|4-s|0.25-l|0.125-t-d''', 'C'),
(26, 'd,-r,-m,-f,-s,-l,-t,-d', 4, 'd,-r,-m,-f,-s,-l,-t,-d', 'C'),
(27, 'd''-r''-m''-f''-s''-l''-t''-d''''', 4, 'd''-r''-m''-f''-s''-l''-t''-d''''', 'C'),
(28, 'd-r,,-m''''''-f-s-l''''''''''-t,,,', 4, 'd-r,,-m''''''-f-s-l''''''''''-t,,,', 'C'),
(29, 'd-r,-m''-f-s''-l''-d,', 4, 'd-r,-m''-f-s''-l''-d,', 'C'),
(30, 's,-s,-l,-s,-s,-l,-d-l,-s,-d-s,-d-s,-s,-l,-d-m-d-l,-s,-m-s,-m-s,-s,-l,-d-m-s-m-d-l,-s,-s-s,-s', 3, 's,-s,-l,-s,-s,-l,-d-l,-s,-d-s,-d-s,-s,-l,-d-m-d-l,-s,-m-s,-m-s,-s,-l,-d-m-s-m-d-l,-s,-s-s,-s', 'C');

--
-- Dumping data for table `solmistring_category`
--

INSERT INTO `solmistring_category` (`solmistring_id`, `category_id`) VALUES
(4, 2),
(5, 1),
(6, 2),
(7, 1),
(8, 2),
(9, 1),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 2),
(20, 2),
(21, 2),
(22, 2),
(23, 2),
(24, 2),
(25, 2),
(26, 2),
(27, 2),
(28, 2),
(29, 2),
(30, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
