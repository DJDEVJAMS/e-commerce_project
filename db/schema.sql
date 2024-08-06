-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

\c ecomerce_db;

-- -- Missing DATA TYPES needs revisit --
-- CREATE TABLE category (
--     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     category_name VARCHAR(38) NOT NULL,
-- );

-- CREATE TABLE product (
--     id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT
--     price DECIMAL(10,2) NOT NULL,
--     stock INTEGER NOT NULL DEFUALT "10",
--     category_id INTEGER, 
--     FOREIGN KEY (category_id) REFERENCES category(id),
-- );

-- CREATE TABLE tag (
--     id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     tag_name VARCHAR(38),
-- );

-- CREATE TABLE product_tag (
--     id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     product_id INTEGER,
--     tag_id INTEGER,
--     FOREIGN KEY (product_id) REFERENCES product(id),
--     FOREIGN KEY (tag_id) REFERENCES tag(id),
-- );
