CREATE TABLE `user` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`email` VARCHAR(255) NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`user_profile_id` INTEGER,
	`role_id` SMALLINT NOT NULL,
	`create_time` DATETIME,
	`modifier_time` DATETIME,
	`del` TINYINT DEFAULT 0,
	PRIMARY KEY(`id`)
);


CREATE TABLE `role_user` (
	`id` SMALLINT NOT NULL AUTO_INCREMENT UNIQUE,
	`role_name` VARCHAR(255),
	`permission` VARCHAR(255),
	`create_time` VARCHAR(255),
	`modifier_time` VARCHAR(255),
	PRIMARY KEY(`id`)
);


CREATE TABLE `user_profile` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`username` VARCHAR(255),
	`bio` TEXT(65535),
	`head_img` VARCHAR(255),
	`create_time` VARCHAR(255),
	`modifier_time` VARCHAR(255),
	PRIMARY KEY(`id`)
);


CREATE TABLE `article` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`title` VARCHAR(255),
	`description` VARCHAR(255),
	`content` TEXT(65535),
	`user_id` INTEGER,
	`seo_head_id` INTEGER,
	`cover_img` VARCHAR(255),
	`create_time` DATETIME,
	`modifier_time` DATETIME,
	`category_id` INTEGER,
	`tag_id` VARCHAR(255),
	`status` ENUM('draft', 'publish', 'delete'),
	PRIMARY KEY(`id`)
);


CREATE TABLE `seo` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`title` VARCHAR(255),
	`description` VARCHAR(255),
	PRIMARY KEY(`id`)
);


CREATE TABLE `user_log` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`area` VARCHAR(255),
	`ip_address` VARCHAR(255),
	`user_id` INTEGER,
	`operator` INTEGER,
	PRIMARY KEY(`id`)
);


CREATE TABLE `permission` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`permission_name` VARCHAR(255),
	PRIMARY KEY(`id`)
);


CREATE TABLE `category` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`category_name` VARCHAR(255),
	`create_time` DATETIME,
	`modifier_time` DATETIME,
	PRIMARY KEY(`id`)
);


CREATE TABLE `tag` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`tag_name` VARCHAR(255),
	`creaet_time` DATETIME,
	`modifier_time` DATETIME,
	PRIMARY KEY(`id`)
);


ALTER TABLE `user`
ADD FOREIGN KEY(`role_id`) REFERENCES `role_user`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `user`
ADD FOREIGN KEY(`id`) REFERENCES `user_profile`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `article`
ADD FOREIGN KEY(`user_id`) REFERENCES `user`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `seo`
ADD FOREIGN KEY(`id`) REFERENCES `article`(`seo_head_id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `user_log`
ADD FOREIGN KEY(`id`) REFERENCES `user`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `permission`
ADD FOREIGN KEY(`id`) REFERENCES `user_log`(`operator`)
ON UPDATE NO ACTION ON DELETE NO ACTION;
ALTER TABLE `article`
ADD FOREIGN KEY(`category_id`) REFERENCES `category`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;