CREATE TABLE `link` (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	parent INTEGER NOT NULL,
	child INTEGER NOT NULL,
	type INTEGER DEFAULT NULL,
	CONSTRAINT fk_link_parent FOREIGN KEY (parent) REFERENCES `category`(id),
	CONSTRAINT fk_link_child FOREIGN KEY (child) REFERENCES `category`(id),
	CONSTRAINT fk_link_type FOREIGN KEY (type) REFERENCES `linktype`(id)
);
