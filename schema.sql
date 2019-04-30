DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE merch(
  item_id INT AUTO_INCREMENT NOT NULL,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT(10) NOT NULL,
  primary key(item_id)
)
SELECT * FROM merch;

INSERT INTO merch (product, department, price, quantity)
VALUES
    ('Mango', 'Food', 0.99, 1000),
    ('Dave Matthews CDs', 'Electronics', 10.00, 37),
    ('Daisy Dukes', 'Clothing', 25.99, 11),
    ('Spaghetti', 'Food', 1.59, 142),
    ('Records', 'Electronics', 5.00, 431),
    ('Forks', 'Household', 19.99, 28),
    ('T.V.', 'Electronics', 349.99, 8),
    ('Lamp', 'Household', 27.89, 2)