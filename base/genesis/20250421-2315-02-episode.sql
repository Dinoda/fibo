CREATE TABLE `episode` (
	`id` INTEGER AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(100) NOT NULL CHECK (name <> ''),
	`description` TEXT DEFAULT NULL CHECK (description <> ''),
	`order` INTEGER DEFAULT 0,
	`work` INTEGER NOT NULL,
	CONSTRAINT fk_episode_work FOREIGN KEY (`work`) REFERENCES `work`(`id`)
);
