-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 13, 2026 at 10:37 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sole_traders`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `trader_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `client_name` varchar(100) NOT NULL,
  `client_email` varchar(100) NOT NULL,
  `job_location` varchar(255) NOT NULL,
  `requested_date` date NOT NULL,
  `requested_time` time NOT NULL,
  `job_description` text NOT NULL,
  `status` enum('pending','confirmed','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `trader_id`, `service_id`, `client_name`, `client_email`, `job_location`, `requested_date`, `requested_time`, `job_description`, `status`, `created_at`) VALUES
(1, 1, 1, 'David Brown', 'david@example.com', '12 University Rd, Belfast', '2026-02-10', '10:00:00', 'Leak under kitchen sink, getting worse.', 'confirmed', '2026-01-05 09:00:00'),
(2, 1, 1, 'Claire Hughes', 'claire@example.com', '8 Malone Ave, Belfast', '2026-02-12', '09:00:00', 'Bathroom tap dripping constantly.', 'confirmed', '2026-01-08 10:30:00'),
(3, 1, 2, 'Paul Wilson', 'paul@example.com', '45 Main St, Belfast', '2026-02-20', '14:00:00', 'Annual boiler service needed before winter ends.', 'confirmed', '2026-01-15 11:00:00'),
(4, 1, 3, 'Grace Martin', 'grace@example.com', '7 Shore Rd, Belfast', '2026-03-05', '08:00:00', 'Burst pipe in utility room, urgent.', 'confirmed', '2026-02-03 08:00:00'),
(5, 1, 2, 'Patrick Duffy', 'patrick@example.com', '33 Botanic Ave, Belfast', '2026-03-10', '09:00:00', 'Boiler making strange noises.', 'confirmed', '2026-02-10 14:00:00'),
(6, 1, 1, 'Siobhan Fox', 'siobhan@example.com', '19 Cavehill Rd, Belfast', '2026-03-14', '11:00:00', 'Dripping tap in bathroom needs fixing.', 'pending', '2026-02-20 09:30:00'),
(7, 1, 3, 'Mark Taggart', 'mark@example.com', '2 Donegall Sq, Belfast', '2026-04-02', '10:00:00', 'Emergency callout - pipe burst overnight.', 'confirmed', '2026-03-04 07:45:00'),
(8, 1, 2, 'Laura Quinn', 'laura@example.com', '56 Ormeau Rd, Belfast', '2026-04-08', '09:30:00', 'Boiler not firing, no hot water.', 'pending', '2026-03-10 10:00:00'),
(9, 1, 1, 'Brendan Walsh', 'brendan@example.com', '11 Falls Rd, Belfast', '2026-04-15', '13:00:00', 'Leaking radiator valve in living room.', 'pending', '2026-03-18 15:00:00'),
(10, 2, 4, 'Karen Smyth', 'karen@example.com', '3 Castle St, Lisburn', '2026-02-08', '11:00:00', 'Need 2 new double sockets in home office.', 'confirmed', '2026-01-10 09:00:00'),
(11, 2, 5, 'Tom Gallagher', 'tom@example.com', '67 Church Rd, Lisburn', '2026-02-18', '09:30:00', 'Old consumer unit tripping frequently.', 'confirmed', '2026-01-20 14:00:00'),
(12, 2, 6, 'Niamh Carroll', 'niamh@example.com', '22 High St, Lisburn', '2026-03-03', '10:00:00', 'Lights flickering in kitchen and hallway.', 'confirmed', '2026-02-05 11:30:00'),
(13, 2, 4, 'Declan Harte', 'declan@example.com', '14 Market Sq, Lisburn', '2026-03-12', '14:00:00', 'Extra sockets needed in newly converted garage.', 'confirmed', '2026-02-15 09:00:00'),
(14, 2, 5, 'Aoife Burns', 'aoife@example.com', '9 Railway St, Lisburn', '2026-03-20', '09:00:00', 'Consumer unit replacement required by landlord.', 'rejected', '2026-02-25 10:00:00'),
(15, 2, 6, 'Conor Hughes', 'conor@example.com', '31 Bow St, Lisburn', '2026-04-05', '11:00:00', 'Complete electrical fault - no power upstairs.', 'confirmed', '2026-03-08 08:30:00'),
(16, 2, 4, 'Fiona Steele', 'fiona@example.com', '5 Union St, Lisburn', '2026-04-10', '14:30:00', 'Add USB sockets to kitchen and bedroom.', 'pending', '2026-03-20 13:00:00'),
(17, 3, 7, 'James Reid', 'james@example.com', '22 High St, Newtownards', '2026-02-14', '10:00:00', 'Shelving for home library, floor to ceiling.', 'confirmed', '2026-01-12 10:00:00'),
(18, 3, 8, 'Aoife Mullan', 'aoife2@example.com', '14 Shore Rd, Newtownards', '2026-02-22', '09:00:00', 'Decking for rear garden, approx 20 sq metres.', 'confirmed', '2026-01-22 09:00:00'),
(19, 3, 9, 'Sean Doran', 'sean@example.com', '8 Abbey St, Newtownards', '2026-03-08', '08:00:00', 'Full kitchen fit, units already delivered.', 'confirmed', '2026-02-08 08:00:00'),
(20, 3, 7, 'Mary Nugent', 'mary@example.com', '47 Court St, Newtownards', '2026-03-18', '10:00:00', 'Alcove shelving in living room.', 'pending', '2026-02-18 11:00:00'),
(21, 3, 8, 'Barry Lynagh', 'barry@example.com', '3 Frances St, Newtownards', '2026-04-06', '09:00:00', 'Decking and side gate installation.', 'pending', '2026-03-06 09:00:00'),
(22, 3, 9, 'Elaine Morrow', 'elaine@example.com', '19 Mill St, Newtownards', '2026-04-14', '08:30:00', 'Kitchen units and worktop fitting.', 'confirmed', '2026-03-14 10:00:00'),
(23, 4, 10, 'Peter Cassidy', 'peter@example.com', '5 Strand Rd, Derry', '2026-02-06', '08:30:00', 'Living room and hallway full repaint.', 'confirmed', '2026-01-06 09:00:00'),
(24, 4, 11, 'Roisin McLean', 'roisin@example.com', '12 Bishop St, Derry', '2026-02-20', '08:00:00', 'Full exterior of detached house.', 'confirmed', '2026-01-18 10:00:00'),
(25, 4, 10, 'Hugh Deeney', 'hugh@example.com', '27 Foyle St, Derry', '2026-03-09', '09:00:00', 'Bedroom and en suite repaint.', 'confirmed', '2026-02-09 09:00:00'),
(26, 4, 10, 'Anne Friel', 'anne@example.com', '3 Carlisle Rd, Derry', '2026-03-22', '10:00:00', 'Kitchen and dining room refresh.', 'pending', '2026-02-22 14:00:00'),
(27, 4, 11, 'Colm Doherty', 'colm@example.com', '9 Clarendon St, Derry', '2026-04-10', '08:00:00', 'Victorian terrace full exterior repaint.', 'pending', '2026-03-12 11:00:00'),
(28, 5, 12, 'Brenda Toal', 'brenda@example.com', '14 Shore Rd, Antrim', '2026-02-11', '09:00:00', 'Large overgrown back garden needs full clearance.', 'confirmed', '2026-01-11 09:00:00'),
(29, 5, 13, 'Ciaran Devlin', 'ciaran@example.com', '6 Castle Way, Antrim', '2026-02-25', '08:30:00', 'Decking and rear fence for new build.', 'confirmed', '2026-01-25 09:00:00'),
(30, 5, 12, 'Noel McCann', 'noel@example.com', '33 Station Rd, Antrim', '2026-03-11', '09:00:00', 'Front and back garden clearance.', 'confirmed', '2026-02-11 10:00:00'),
(31, 5, 13, 'Tara Boyle', 'tara@example.com', '21 Railway Ave, Antrim', '2026-03-25', '09:30:00', 'Privacy fencing for side garden.', 'pending', '2026-02-25 09:00:00'),
(32, 5, 12, 'Dermot Kane', 'dermot@example.com', '8 Lough Rd, Antrim', '2026-04-08', '08:00:00', 'Annual garden clearance before summer.', 'pending', '2026-03-15 08:30:00'),
(33, 6, 14, 'Helen Park', 'helen@example.com', '4 Balloo Ave, Bangor', '2026-02-09', '09:00:00', 'Skim plaster lounge after rewire.', 'confirmed', '2026-01-09 09:00:00'),
(34, 6, 15, 'Gerry Rafferty', 'gerry@example.com', '18 Main St, Bangor', '2026-02-17', '08:00:00', 'Dry lining on cold gable wall.', 'confirmed', '2026-01-17 10:00:00'),
(35, 6, 14, 'Sinead Logan', 'sinead@example.com', '9 Dufferin Ave, Bangor', '2026-03-04', '09:00:00', 'Two bedroom skim after water damage.', 'confirmed', '2026-02-04 11:00:00'),
(36, 6, 16, 'Frank Logue', 'frank@example.com', '25 Hamilton Rd, Bangor', '2026-03-16', '08:30:00', 'External rendering on rear extension.', 'confirmed', '2026-02-14 09:00:00'),
(37, 6, 14, 'Yvonne Craig', 'yvonne@example.com', '7 Groomsport Rd, Bangor', '2026-04-03', '10:00:00', 'Skim ceiling in kitchen after damp repair.', 'pending', '2026-03-05 10:00:00'),
(38, 6, 15, 'Stephen Bell', 'stephen@example.com', '11 Ward Ave, Bangor', '2026-04-11', '09:00:00', 'Dot and dab on three external walls.', 'pending', '2026-03-16 09:30:00'),
(39, 7, 17, 'Maureen Hanna', 'maureen@example.com', '2 Canal St, Newry', '2026-02-07', '10:00:00', 'Full roof inspection before selling house.', 'confirmed', '2026-01-07 09:00:00'),
(40, 7, 18, 'Kevin Larkin', 'kevin@example.com', '15 Hill St, Newry', '2026-02-19', '09:00:00', 'Several broken tiles after recent storm.', 'confirmed', '2026-01-19 10:00:00'),
(41, 7, 17, 'Angela Doyle', 'angela@example.com', '38 Canal Rd, Newry', '2026-03-06', '10:00:00', 'Roof inspection for insurance claim.', 'confirmed', '2026-02-06 11:00:00'),
(42, 7, 19, 'Shaun Toner', 'shaun@example.com', '6 Boat St, Newry', '2026-03-19', '08:00:00', 'Flat roof on extension leaking badly.', 'confirmed', '2026-02-19 08:30:00'),
(43, 7, 18, 'Carol Fearon', 'carol@example.com', '29 Bridge St, Newry', '2026-04-04', '09:00:00', 'Ridge tiles loose after high winds.', 'pending', '2026-03-07 09:00:00'),
(44, 7, 17, 'Damian Fox', 'damian@example.com', '13 Monaghan St, Newry', '2026-04-12', '10:00:00', 'Pre-purchase roof survey.', 'pending', '2026-03-19 10:00:00'),
(45, 8, 20, 'Una McConville', 'una@example.com', '7 Cathedral Rd, Armagh', '2026-02-13', '09:00:00', 'Full bathroom retile after renovation.', 'confirmed', '2026-01-13 09:00:00'),
(46, 8, 21, 'Declan Shortt', 'declans@example.com', '22 English St, Armagh', '2026-02-24', '10:00:00', 'Kitchen splashback to match new units.', 'confirmed', '2026-01-24 10:00:00'),
(47, 8, 22, 'Martina Rice', 'martina@example.com', '5 Dobbin St, Armagh', '2026-03-13', '09:00:00', 'Porcelain floor tiles throughout ground floor.', 'confirmed', '2026-02-13 11:00:00'),
(48, 8, 20, 'Owen Mallon', 'owen@example.com', '17 Scotch St, Armagh', '2026-03-27', '09:30:00', 'En suite shower area tiling.', 'pending', '2026-02-27 09:00:00'),
(49, 8, 21, 'Bernadette Fee', 'bernadette@example.com', '3 Navan Fort Rd, Armagh', '2026-04-09', '10:00:00', 'Splashback and windowsill tiling in kitchen.', 'pending', '2026-03-10 14:00:00'),
(50, 2, 5, 'Jane Doe', 'jane@example.com', '1 Test Street', '2026-03-18', '15:30:00', 'Help!', 'rejected', '2026-03-13 19:27:33');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `trader_id` int(11) NOT NULL,
  `reviewer_name` varchar(100) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `trader_id`, `reviewer_name`, `rating`, `created_at`) VALUES
(1, 1, 'David Brown', 5, '2026-03-13 19:20:41'),
(2, 1, 'Claire Hughes', 4, '2026-03-13 19:20:41'),
(3, 1, 'Paul Wilson', 5, '2026-03-13 19:20:41'),
(4, 1, 'Grace Martin', 4, '2026-03-13 19:20:41'),
(5, 1, 'Patrick Duffy', 4, '2026-03-13 19:20:41'),
(6, 2, 'Karen Smyth', 5, '2026-03-13 19:20:41'),
(7, 2, 'Tom Gallagher', 5, '2026-03-13 19:20:41'),
(8, 2, 'Niamh Carroll', 4, '2026-03-13 19:20:41'),
(9, 2, 'Declan Harte', 5, '2026-03-13 19:20:41'),
(10, 2, 'Aoife Burns', 4, '2026-03-13 19:20:41'),
(11, 3, 'James Reid', 4, '2026-03-13 19:20:41'),
(12, 3, 'Aoife Mullan', 4, '2026-03-13 19:20:41'),
(13, 3, 'Sean Doran', 3, '2026-03-13 19:20:41'),
(14, 3, 'Mary Nugent', 4, '2026-03-13 19:20:41'),
(15, 3, 'Barry Lynagh', 3, '2026-03-13 19:20:41'),
(16, 4, 'Peter Cassidy', 5, '2026-03-13 19:20:41'),
(17, 4, 'Roisin McLean', 5, '2026-03-13 19:20:41'),
(18, 4, 'Hugh Deeney', 4, '2026-03-13 19:20:41'),
(19, 4, 'Anne Friel', 5, '2026-03-13 19:20:41'),
(20, 4, 'Paul Wilson', 4, '2026-03-13 19:20:41'),
(21, 5, 'Brenda Toal', 4, '2026-03-13 19:20:41'),
(22, 5, 'Ciaran Devlin', 3, '2026-03-13 19:20:41'),
(23, 5, 'Noel McCann', 4, '2026-03-13 19:20:41'),
(24, 5, 'Tara Boyle', 3, '2026-03-13 19:20:41'),
(25, 5, 'Dermot Kane', 3, '2026-03-13 19:20:41'),
(26, 6, 'Helen Park', 5, '2026-03-13 19:20:41'),
(27, 6, 'Gerry Rafferty', 4, '2026-03-13 19:20:41'),
(28, 6, 'Sinead Logan', 5, '2026-03-13 19:20:41'),
(29, 6, 'Frank Logue', 4, '2026-03-13 19:20:41'),
(30, 6, 'Yvonne Craig', 4, '2026-03-13 19:20:41'),
(31, 7, 'Maureen Hanna', 5, '2026-03-13 19:20:41'),
(32, 7, 'Kevin Larkin', 4, '2026-03-13 19:20:41'),
(33, 7, 'Angela Doyle', 4, '2026-03-13 19:20:41'),
(34, 7, 'Shaun Toner', 4, '2026-03-13 19:20:41'),
(35, 7, 'Carol Fearon', 4, '2026-03-13 19:20:41'),
(36, 8, 'Una McConville', 5, '2026-03-13 19:20:41'),
(37, 8, 'Declan Shortt', 5, '2026-03-13 19:20:41'),
(38, 8, 'Martina Rice', 5, '2026-03-13 19:20:41'),
(39, 8, 'Owen Mallon', 4, '2026-03-13 19:20:41'),
(40, 8, 'Bernadette Fee', 5, '2026-03-13 19:20:41'),
(41, 2, 'Jane Doe', 5, '2026-03-13 19:27:51');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `trader_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `pricing_type` enum('hourly','fixed') NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `estimated_duration_mins` int(11) DEFAULT 60,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `trader_id`, `title`, `description`, `pricing_type`, `base_price`, `estimated_duration_mins`, `created_at`) VALUES
(1, 1, 'Bathroom Pipe Repair', 'Fixing leaking or damaged pipes in bathrooms and kitchens.', 'fixed', 120.00, 120, '2026-03-13 19:20:41'),
(2, 1, 'Boiler Service', 'Full annual boiler service and safety check.', 'fixed', 95.00, 90, '2026-03-13 19:20:41'),
(3, 1, 'Emergency Callout', '24/7 emergency plumbing for burst pipes and leaks.', 'hourly', 75.00, 60, '2026-03-13 19:20:41'),
(4, 2, 'Socket Installation', 'Supply and install additional plug sockets throughout the home.', 'hourly', 45.00, 90, '2026-03-13 19:20:41'),
(5, 2, 'Consumer Unit Upgrade', 'Replace outdated fuse box with modern consumer unit.', 'fixed', 450.00, 240, '2026-03-13 19:20:41'),
(6, 2, 'Fault Finding', 'Diagnose and repair electrical faults throughout the property.', 'hourly', 55.00, 60, '2026-03-13 19:20:41'),
(7, 3, 'Custom Shelving', 'Bespoke wooden shelving designed and fitted to your space.', 'fixed', 300.00, 240, '2026-03-13 19:20:41'),
(8, 3, 'Decking Installation', 'Design and build garden decking using treated timber.', 'fixed', 850.00, 480, '2026-03-13 19:20:41'),
(9, 3, 'Kitchen Fitting', 'Full kitchen unit installation including worktops and plinths.', 'fixed', 600.00, 480, '2026-03-13 19:20:41'),
(10, 4, 'Interior Room Paint', 'Full interior repaint of one room including ceilings and trim.', 'fixed', 250.00, 300, '2026-03-13 19:20:41'),
(11, 4, 'Exterior House Paint', 'Full exterior repaint including preparation and priming.', 'fixed', 900.00, 960, '2026-03-13 19:20:41'),
(12, 5, 'Garden Clearance', 'Full garden clearance including green waste removal.', 'fixed', 180.00, 180, '2026-03-13 19:20:41'),
(13, 5, 'Decking & Fencing', 'Supply and install garden decking and timber fencing.', 'fixed', 700.00, 480, '2026-03-13 19:20:41'),
(14, 6, 'Room Skim', 'Full skim plaster of one room walls and ceiling.', 'fixed', 350.00, 300, '2026-03-13 19:20:41'),
(15, 6, 'Dry Lining', 'Dot and dab plasterboard installation on external walls.', 'fixed', 500.00, 360, '2026-03-13 19:20:41'),
(16, 6, 'External Rendering', 'Sand and cement render to external walls with smooth finish.', 'fixed', 800.00, 480, '2026-03-13 19:20:41'),
(17, 7, 'Roof Inspection', 'Full roof inspection with written report and photo evidence.', 'fixed', 95.00, 60, '2026-03-13 19:20:41'),
(18, 7, 'Tile Replacement', 'Replace broken or missing roof tiles, re-bed and re-point.', 'fixed', 150.00, 120, '2026-03-13 19:20:41'),
(19, 7, 'Flat Roof Repair', 'Repair or replace flat roof covering using GRP or felt.', 'fixed', 600.00, 480, '2026-03-13 19:20:41'),
(20, 8, 'Bathroom Tiling', 'Full bathroom wall and floor tiling including grouting and sealing.', 'fixed', 450.00, 360, '2026-03-13 19:20:41'),
(21, 8, 'Kitchen Splashback', 'Supply and fit kitchen splashback tiles with professional finish.', 'fixed', 200.00, 180, '2026-03-13 19:20:41'),
(22, 8, 'Floor Tiling', 'Porcelain or ceramic floor tiling for any room.', 'fixed', 350.00, 300, '2026-03-13 19:20:41');

-- --------------------------------------------------------

--
-- Table structure for table `traders`
--

CREATE TABLE `traders` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `trade_type` varchar(100) DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `traders`
--

INSERT INTO `traders` (`id`, `name`, `username`, `email`, `password`, `trade_type`, `region`, `bio`, `created_at`) VALUES
(1, 'John Murphy', 'johnmurphy', 'john@example.com', '$2b$10$Ur7UNqKMmLAYWlL5HVb/BOq4lgHB7ijSvLnvWSsLGvSrgWhB2KEra', 'Plumber', 'Belfast', 'Experienced domestic plumber specialising in bathroom installations and emergency callouts. Over 15 years in the trade.', '2026-03-13 19:20:41'),
(2, 'Sarah O\'Neill', 'sarahoneill', 'sarah@example.com', '$2b$10$Ur7UNqKMmLAYWlL5HVb/BOq4lgHB7ijSvLnvWSsLGvSrgWhB2KEra', 'Electrician', 'Lisburn', 'Qualified electrician offering residential rewiring, fault finding and consumer unit upgrades. NICEIC registered.', '2026-03-13 19:20:41'),
(3, 'Michael Kelly', 'michaelkelly', 'michael@example.com', '$2b$10$Ur7UNqKMmLAYWlL5HVb/BOq4lgHB7ijSvLnvWSsLGvSrgWhB2KEra', 'Carpenter', 'Newtownards', 'Custom woodwork, decking, kitchen fittings and bespoke furniture. All work fully guaranteed.', '2026-03-13 19:20:41'),
(4, 'Emma Donnelly', 'emmadonnelly', 'emma@example.com', '$2b$10$Ur7UNqKMmLAYWlL5HVb/BOq4lgHB7ijSvLnvWSsLGvSrgWhB2KEra', 'Painter & Decorator', 'Derry', 'Interior and exterior painting and decorating. Specialising in period properties and commercial spaces.', '2026-03-13 19:20:41'),
(5, 'Liam Bradley', 'liambradley', 'liam@example.com', '$2b$10$Ur7UNqKMmLAYWlL5HVb/BOq4lgHB7ijSvLnvWSsLGvSrgWhB2KEra', 'Gardener & Landscaper', 'Antrim', 'Garden design, landscaping, decking and fencing. Domestic and commercial projects welcome.', '2026-03-13 19:20:41'),
(6, 'Ciara Brennan', 'ciarabrennan', 'ciara@example.com', '$2b$10$Ur7UNqKMmLAYWlL5HVb/BOq4lgHB7ijSvLnvWSsLGvSrgWhB2KEra', 'Plasterer', 'Bangor', 'Plastering and rendering specialist with 10 years experience. Skimming, dry lining and external rendering.', '2026-03-13 19:20:41'),
(7, 'Ryan McAllister', 'ryanmcallister', 'ryan@example.com', '$2b$10$Ur7UNqKMmLAYWlL5HVb/BOq4lgHB7ijSvLnvWSsLGvSrgWhB2KEra', 'Roofer', 'Newry', 'Roofing contractor covering all aspects of flat and pitched roofing. Fully insured, free quotes available.', '2026-03-13 19:20:41'),
(8, 'Patricia Doherty', 'patriciadoherty', 'patricia@example.com', '$2b$10$Ur7UNqKMmLAYWlL5HVb/BOq4lgHB7ijSvLnvWSsLGvSrgWhB2KEra', 'Tiler', 'Armagh', 'Wall and floor tiling specialist. Bathrooms, kitchens and conservatories. Fully insured with a portfolio of completed projects.', '2026-03-13 19:20:41'),
(9, 'Steven Jackson', 'stevenjackson', 'sjackson23@qub.ac.uk', '$2b$10$4qwnvbv3FGzc4g1Op8dtR.6MO4JAAGVEFULjfWFoXA2O9CRu6KtKC', 'Electrician', 'Belfast', 'Hi!', '2026-03-13 19:28:42');

-- --------------------------------------------------------

--
-- Table structure for table `trader_availability`
--

CREATE TABLE `trader_availability` (
  `id` int(11) NOT NULL,
  `trader_id` int(11) NOT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trader_availability`
--

INSERT INTO `trader_availability` (`id`, `trader_id`, `day_of_week`, `start_time`, `end_time`) VALUES
(1, 1, 'Monday', '08:00:00', '17:00:00'),
(2, 1, 'Tuesday', '08:00:00', '17:00:00'),
(3, 1, 'Wednesday', '08:00:00', '17:00:00'),
(4, 1, 'Thursday', '08:00:00', '17:00:00'),
(5, 1, 'Saturday', '09:00:00', '13:00:00'),
(6, 2, 'Monday', '09:00:00', '18:00:00'),
(7, 2, 'Wednesday', '09:00:00', '18:00:00'),
(8, 2, 'Friday', '09:00:00', '18:00:00'),
(9, 3, 'Tuesday', '08:00:00', '16:00:00'),
(10, 3, 'Thursday', '08:00:00', '16:00:00'),
(11, 3, 'Friday', '08:00:00', '16:00:00'),
(12, 3, 'Saturday', '09:00:00', '14:00:00'),
(13, 4, 'Monday', '09:00:00', '17:00:00'),
(14, 4, 'Tuesday', '09:00:00', '17:00:00'),
(15, 4, 'Thursday', '09:00:00', '17:00:00'),
(16, 5, 'Wednesday', '07:00:00', '16:00:00'),
(17, 5, 'Thursday', '07:00:00', '16:00:00'),
(18, 5, 'Friday', '07:00:00', '16:00:00'),
(19, 5, 'Saturday', '08:00:00', '14:00:00'),
(20, 6, 'Monday', '08:00:00', '17:00:00'),
(21, 6, 'Tuesday', '08:00:00', '17:00:00'),
(22, 6, 'Wednesday', '08:00:00', '17:00:00'),
(23, 6, 'Thursday', '08:00:00', '17:00:00'),
(24, 6, 'Friday', '08:00:00', '17:00:00'),
(25, 7, 'Monday', '07:30:00', '16:30:00'),
(26, 7, 'Tuesday', '07:30:00', '16:30:00'),
(27, 7, 'Wednesday', '07:30:00', '16:30:00'),
(28, 7, 'Friday', '07:30:00', '16:30:00'),
(29, 8, 'Tuesday', '09:00:00', '17:00:00'),
(30, 8, 'Wednesday', '09:00:00', '17:00:00'),
(31, 8, 'Thursday', '09:00:00', '17:00:00'),
(32, 8, 'Saturday', '09:00:00', '13:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `idx_bookings_trader` (`trader_id`),
  ADD KEY `idx_bookings_status` (`status`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trader_id` (`trader_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_services_trader` (`trader_id`);

--
-- Indexes for table `traders`
--
ALTER TABLE `traders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_traders_region` (`region`),
  ADD KEY `idx_traders_trade_type` (`trade_type`);

--
-- Indexes for table `trader_availability`
--
ALTER TABLE `trader_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_availability_trader` (`trader_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `traders`
--
ALTER TABLE `traders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `trader_availability`
--
ALTER TABLE `trader_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`trader_id`) REFERENCES `traders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`trader_id`) REFERENCES `traders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`trader_id`) REFERENCES `traders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `trader_availability`
--
ALTER TABLE `trader_availability`
  ADD CONSTRAINT `trader_availability_ibfk_1` FOREIGN KEY (`trader_id`) REFERENCES `traders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
