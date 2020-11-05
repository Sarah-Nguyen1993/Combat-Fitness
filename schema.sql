DROP DATABASE IF EXISTS fitnessDB;
CREATE DATABASE fitnessDB;
use fitnessDB;
CREATE TABLE IF NOT EXISTS `Users` (
`id` INTEGER NOT NULL auto_increment , 
`email` VARCHAR(255) NOT NULL UNIQUE,
 `password` VARCHAR(255) NOT NULL, 
 `createdAt` DATETIME NOT NULL, 
 `updatedAt` DATETIME NOT NULL, 
 PRIMARY KEY (`id`)
 );
 CREATE TABLE IF NOT EXISTS `Recipes` (
 `id` INTEGER NOT NULL auto_increment ,
 `title` VARCHAR(255),
 `serving` INTEGER, 
 `prep_time` VARCHAR(255), 
 `sourceUrl` VARCHAR(255), 
 `createdAt` DATETIME NOT NULL, 
`updatedAt` DATETIME NOT NULL, 
`UserId` INTEGER NOT NULL, 
PRIMARY KEY (`id`), 
FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
);
SELECT `Recipe`.`id`, `Recipe`.`title`, `Recipe`.`serving`, `Recipe`.`prep_time`, `Recipe`.`sourceUrl`, `Recipe`.`createdAt`, `Recipe`.`updatedAt`, `Recipe`.`UserId`, `User`.`id` AS `User.id`, 
`User`.`email` AS `User.email`, `User`.`password` AS `User.password`, 
`User`.`createdAt` AS `User.createdAt`, `User`.`updatedAt` AS `User.updatedAt` 
FROM `Recipes` AS `Recipe` 
LEFT OUTER JOIN `Users` AS `User` 
ON `Recipe`.`UserId` = `User`.`id`