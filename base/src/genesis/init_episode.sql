CREATE TABLE `episode` (
	`id` INTEGER AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(100) NOT NULL,
	`description` TEXT DEFAULT NULL,
	`work` INTEGER NOT NULL,
	CONSTRAINT fk_episode_work FOREIGN KEY (`work`) REFERENCES `work`(`id`)
);
