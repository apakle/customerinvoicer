-- Sample Customers
INSERT INTO customer (first_name, last_name, street, zip, city) VALUES
('John', 'Doe', '123 Elm Street', '12345', 'Springfield'),
('Jane', 'Smith', '456 Oak Avenue', '67890', 'Shelbyville');

-- Sample Invoices
INSERT INTO invoice (invoice_number, invoice_date, total_amount, customer_id, service_date, deleted) VALUES
('22/1', '2022-09-01', 150.0, 2, '2022-08-11', false),
('24/1', '2024-09-05', 299.0, 1,'2024-07-01', false);

-- Sample Invoice Positions for 22/1
INSERT INTO invoice_position (position, quantity, description, price, total_price, invoice_id) VALUES
(1, 2, 'Widget A', 25.0, 50.0, 1),
(2, 1, 'Widget B', 100.0, 100.0, 1);

-- Sample Invoice Positions for 24/1
INSERT INTO invoice_position (position, quantity, description, price, total_price, invoice_id) VALUES
(1, 3, 'Gadget X', 50.0, 150.0, 2),
(2, 1, 'Gadget Y', 49.0, 49.0, 2);

-- Insert sample data into the UserDetails table
INSERT INTO user_details (name, username, password, street, zip, city, phone_number, iban, bank, bic, tax_number) VALUES
('Al Bundy', 'albun', '$2a$10$ITZGijYpPMgP7FlnX0jUhu.zVauJDTetYxHbP4qpe7o7RPcmuKX2.', '123 Main St', '79664', 'Wehr', '123-456-7890', 'DE89370400440532013000', 'Volksbank Rhein-Wehra eG', 'GENODE61BSK', '16163/25108');
