DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE  department (
    id INT NOT NULL auto_increment,
    department_name VARCHAR(100) not null,
    PRIMARY KEY(id)
);

CREATE TABLE manager (
    id INT NOT NULL auto_increment,
    department_name VARCHAR(100) not null,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL auto_increment,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role_id INT,
    manager_name VARCHAR(100),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL auto_increment,
    title VARCHAR(100),
    salary DECIMAL,
    department_name VARCHAR(100),
    PRIMARY KEY(id)
);