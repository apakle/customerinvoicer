-- Sample Customers
INSERT INTO customer (first_name, last_name, street, zip, city) VALUES
('John', 'Doe', '123 Elm Street', '12345', 'Springfield'),
('Jane', 'Smith', '456 Oak Avenue', '67890', 'Shelbyville');

-- Sample Invoices
INSERT INTO invoice (invoice_number, date, total_amount, customer_id) VALUES
('22/1', '2022-09-01', 150.0, 2),
('24/1', '2024-09-05', 299.0, 1);

-- Sample Invoice Positions for INV001
INSERT INTO invoice_position (position, quantity, description, price, total_price, invoice_id) VALUES
(1, 2, 'Widget A', 25.0, 50.0, 1),
(2, 1, 'Widget B', 100.0, 100.0, 1);

-- Sample Invoice Positions for INV002
INSERT INTO invoice_position (position, quantity, description, price, total_price, invoice_id) VALUES
(1, 3, 'Gadget X', 50.0, 150.0, 2),
(2, 1, 'Gadget Y', 49.0, 49.0, 2);

-- Insert sample data into the UserDetails table
INSERT INTO user_details (name, street, zip, city, phone_number, bank_account) VALUES
('Al Bundy', '123 Main St', '79664', 'Wehr', '123-456-7890', 'DE89370400440532013000');
