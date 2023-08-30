-- Drop existing database.
DROP DATABASE IF EXISTS employeeTracker_db;
-- Creates database.
CREATE DATABASE employeeTracker_db;

-- Switch to use employeeTracker_db.
USE employeeTracker_db;

-- Creates Department table.
CREATE TABLE  department (
    id INT NOT NULL auto_increment,
    department_name VARCHAR(30) not null,
    PRIMARY KEY(id)
);

-- Creates Role table.
CREATE TABLE role (
    id INT NOT NULL auto_increment,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id)
);

-- Creates Employee table.
CREATE TABLE employee (
    id INT NOT NULL auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);