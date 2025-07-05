ALTER TABLE item 
	ADD CONSTRAINT fk_item_ui_category 
	FOREIGN KEY (itemUICategory) 
	REFERENCES itemUICategory (id);
