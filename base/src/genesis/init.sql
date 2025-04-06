CREATE TABLE `sound` (
	`id` INTEGER AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(100) NOT NULL,
	`description` TEXT DEFAULT NULL,
	`episode` INTEGER NOT NULL,
	CONSTRAINT fk_sound_episode FOREIGN KEY (`episode`) REFERENCES `episode`(`id`)
);
