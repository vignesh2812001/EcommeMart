CREATE TABLE `registerations` (
  `s_no` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `login` tinyint(1) DEFAULT '0',
  `role` enum('admin','user','defaultUser') DEFAULT 'defaultUser',
  PRIMARY KEY (`s_no`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `s_no` (`s_no`)
);

insert into registerations(username ,password , email , role) values ("admin" , "admin@123" , "admin@gmail.com" , "admin");
insert into registerations(username ,password , email , role) values ("default" , "default@123" , "default@gmail.com" , "defaultUser");


CREATE TABLE `categories` (
  `categories_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`categories_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ;

CREATE TABLE `products` (
  `products_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_description` varchar(1024) NOT NULL,
  `product_price` int DEFAULT NULL,
  `product_image` varchar(10000) DEFAULT NULL,
  `categories_id` int NOT NULL,
  `product_quantity` int NOT NULL,
  PRIMARY KEY (`products_id`),
  KEY `products_ibfk_1` (`categories_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`categories_id`)
) ;

CREATE TABLE `cart` (
  `Cart_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `s_no` int NOT NULL,
  PRIMARY KEY (`Cart_id`)
) ;



