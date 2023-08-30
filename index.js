// Import necessary libraries and dependencies.
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');

const port = process.env.PORT || 3001;

const app = express();

// Configure Express to handle JSON and URL-encoded data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Function to prompt the user with a menu of options.
async function promptMenu() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "How can I assist you today?",
            choices: [
                "View all departments.",
                "View all roles.",
                "View all employees.",
                "Add new department.",
                "Add new role.",
                "Add new employee.",
                "Update employee role.",
                "Exit"
            ]
        }
    ]);

    // If statements for "View all departments."
    if (answers.menu === "View all departments.") {
        const query = "SELECT * FROM department";
        
        // Execute SQL query and display results.
        db.query(query, (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.table(result);
                promptMenu();
            }
        });
    }

    // If statements for "View all roles."
    if (answers.menu === "View all roles.") {
        const query = "SELECT * FROM role";
        
        // Execute SQL query and display results.
        db.query(query, (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.table(result);
                promptMenu();
            }
        });
    }

    // If statements for "View all employees."
    if (answers.menu === "View all employees.") {
        const query = "SELECT * FROM employee";
        
        // Execute SQL query and display results.
        db.query(query, (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.table(result);
                promptMenu();
            }
        });
    }

    // If statements for "Add new department."
    if (answers.menu === "Add new department.") {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "Type new department name."
            }
        ]);
        
        // Insert new department into the database.
        db.query(`INSERT INTO department (department_name) VALUES (?)`, [answers.newDepartment], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                promptMenu();
            }
        });
    }
    
    // If statements for "Add new role."
    if (answers.menu === "Add new role.") {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "newRole",
                message: "Type new Role."
            },
            {
                type: "input",
                name: "newSalary",
                message: "Type Salary."
            },
            {
                type: "input",
                name: "newDepartmentID",
                message: "Type Department ID."
            }
        ]);
        
        // Insert new role into the database.
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.newRole, answers.newSalary, answers.newDepartmentID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                promptMenu();
            }
        });
    }

    // If statements for "Add new employee."
    if (answers.menu === "Add new employee.") {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Type First Name."
            },
            {
                type: "input",
                name: "lastName",
                message: "Type Last Name."
            },
            {
                type: "input",
                name: "roleID",
                message: "Type Role ID."
            },
            {
                type: "input",
                name: "managerID",
                message: "Type Manager ID."
            }
        ]);
        
        // Inserts new employee into the database.
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, answers.roleID, answers.managerID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                promptMenu();
            }
        });
    }


    // If statements for "Update employee role."
    if (answers.menu === "Update employee role.") {
        const updateAnswers = await inquirer.prompt([
            {
                type: "input",
                name: "employeeName",
                message: "Enter the employee's name: "
            },
            {
                type: "input",
                name: "newRoleID",
                message: "Enter new role ID: "
            },
            {
                type: "input",
                name: "newManagerID",
                message: "Enter new Manager ID: "
            }
        ]);

        // Updates the employees role in the database.
        db.query(
            "UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ? OR last_name = ?",
            [updateAnswers.newRoleID, updateAnswers.newManagerID, updateAnswers.employeeName, updateAnswers.employeeName],
            (err, result) =>{
                if (err) {
                    console.error("SQL query error:", err);
                }
                promptMenu();
            }
        );
    }


    // Exiting the application
    else if (answers.menu === "Exit") {
        console.log("THANK YOU! TAKE CARE AND HAVE A NICE DAY!");
            process.exit(0);
        }
    }

// Starts menu prompt when launched.
promptMenu();