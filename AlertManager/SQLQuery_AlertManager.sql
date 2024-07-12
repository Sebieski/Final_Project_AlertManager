CREATE DATABASE AlertManager;
GO

USE AlertManager;

CREATE TABLE Users (
    user_id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE,
    email NVARCHAR(100) NOT NULL,
    password NVARCHAR(255) NOT NULL
);

CREATE TABLE Clients (
    client_id INT IDENTITY PRIMARY KEY,
    client_name NVARCHAR(255) NOT NULL,
    capital_group NVARCHAR(255) NULL,
    exposure NVARCHAR(50) NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Alerts (
    alert_id INT IDENTITY PRIMARY KEY,
    client_id INT NOT NULL,
    currency_pair NVARCHAR(255) NOT NULL,
    direction NVARCHAR(50) NOT NULL,
    amount_base DECIMAL(18, 2) NOT NULL,
    rate DECIMAL(5, 4) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Clients(client_id)
);

GO

INSERT INTO Users (name, email, password)
VALUES 
('Sebastian', 'sk@mbank.pl', 'pass1'),
('Agnieszka', 'an@mbank.pl', 'pass2');

INSERT INTO Clients (client_name, capital_group, exposure, user_id)
VALUES
('Tatooine Trading Co.', 'Outer Rim', 'eksport EUR', 1),
('Hoth Ventures', 'Rebel Alliance', 'import EUR', 1),
('Coruscant Enterprises', 'Core Worlds', 'eksport USD', 1),
('Naboo Industries', 'Mid Rim', 'eksport EUR', 1),
('Endor Supplies', 'Outer Rim', 'import EUR', 1),
('Bespin Gas', 'Colonies', 'eksport USD', 1),
('Dagobah Exploration', 'Outer Rim', 'eksport EUR', 1),
('Alderaan Holdings', 'Core Worlds', 'eksport USD', 1),
('Kashyyyk Timber', 'Mid Rim', 'import EUR', 1),
('Mustafar Mining Co.', 'Outer Rim', 'eksport USD', 1),
('Jakku Salvage', 'Outer Rim', 'eksport EUR', 1),
('Shire Farming Ltd.', 'Eriador', 'import EUR', 2),
('Rohan Steeds', 'Rohan', 'eksport USD', 2),
('Gondor Guard', 'Gondor', 'eksport USD', 2),
('Mordor Metals', 'Mordor', 'eksport USD', 2),
('Mirkwood Lumber', 'Mirkwood', 'import EUR', 2),
('Lothlorien Crafts', 'Lothlorien', 'eksport USD', 2),
('Rivendell Knowledge', 'Eriador', 'eksport EUR', 2),
('Bree Trading', 'Eriador', 'import EUR', 2),
('Isengard Industries', 'Rohan', 'eksport USD', 2),
('Fangorn Forestry', 'Rohan', 'eksport EUR', 2);

INSERT INTO Alerts (client_id, currency_pair, direction, amount_base, rate)
VALUES
(1, 'EUR/PLN', 'Buy', 500000, 4.20),
(2, 'USD/PLN', 'Sell', 6000000, 4.15),
(3, 'EUR/PLN', 'Buy', 7000000, 4.30),
(4, 'USD/PLN', 'Sell', 8000000, 3.90),
(5, 'EUR/PLN', 'Buy', 9000000, 4.25),
(6, 'USD/PLN', 'Sell', 10000000, 4.05),
(1, 'EUR/PLN', 'Buy', 11000000, 4.40),
(1, 'EUR/PLN', 'Sell', 12000000, 4.30),
(2, 'USD/PLN', 'Buy', 13000000, 4.00),
(4, 'USD/PLN', 'Sell', 14000000, 4.10),
(7, 'EUR/PLN', 'Buy', 15000000, 4.35),
(8, 'USD/PLN', 'Sell', 500000, 4.15),
(9, 'EUR/PLN', 'Buy', 6000000, 4.20),
(1, 'EUR/PLN', 'Sell', 7000000, 4.30),
(10, 'USD/PLN', 'Buy', 8000000, 3.95),
(11, 'EUR/PLN', 'Sell', 9000000, 4.40),
(4, 'USD/PLN', 'Buy', 10000000, 4.00);

CREATE VIEW ClientsAlerts AS
SELECT
    c.client_id AS client_id,
    c.client_name AS client_name,
    c.capital_group AS capital_group,
    c.exposure AS exposure,
    c.user_id AS user_id,
    a.alert_id AS alert_id,
    a.currency_pair AS currency_pair,
    a.direction AS direction,
    a.amount_base AS amount_base,
    a.rate AS rate
FROM
    Clients c
JOIN
    Alerts a ON c.client_id = a.client_id;
