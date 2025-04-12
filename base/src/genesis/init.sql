CREATE TABLE `sound` (
	`id` INTEGER AUTO_INCREMENT PRIMARY KEY,
	`name` VARCHAR(100) NOT NULL CHECK (name <> ''),
	`description` TEXT DEFAULT NULL CHECK (description <> ''),
	`filename` VARCHAR(100) NOT NULL CHECK (filename <> ''),
	`episode` INTEGER NOT NULL,
	CONSTRAINT fk_sound_episode FOREIGN KEY (`episode`) REFERENCES `episode`(`id`)
);
