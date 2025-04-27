CREATE TABLE `linktype` (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	child_to_parent VARCHAR(100),
	parent_to_child VARCHAR(100)
);
