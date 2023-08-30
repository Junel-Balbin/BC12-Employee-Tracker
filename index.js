const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add Prompt for menu.
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

    // Create If statements for "View all departments."
    if (answers.menu === "View all departments.") {
        const query = "SELECT * FROM department";
        
        db.query(query, (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.table(result);
                promptMenu();
            }
        });
    }

    // Create If statements for "View all roles."
    if (answers.menu === "View all roles.") {
        const query = "SELECT * FROM role";
        
        db.query(query, (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.table(result);
                promptMenu();
            }
        });
    }

    // Create If statements for "View all employees."
    if (answers.menu === "View all employees.") {
        const query = "SELECT * FROM employee";
        
        db.query(query, (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.table(result);
                promptMenu();
            }
        });
    }

    // Create If statements for "Add new department."
    // Create Prompt for input.
    if (answers.menu === "Add new department.") {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "Type new department name."
            }
        ]);
        
        db.query(`INSERT INTO department (department_name) VALUES (?)`, [answers.newDepartment], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                promptMenu();
            }
        });
    }
    
    // Create If statements for "Add new role."
    // Create Prompt for input.
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
        
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.newRole, answers.newSalary, answers.newDepartmentID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                promptMenu();
            }
        });
    }

    // Create If statements for "Add new employee."
    // Create Prompt for input.
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
        
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, answers.roleID, answers.managerID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                promptMenu();
            }
        });
    }


    // Create If statements for "Update employee role."
    // Create Prompt for input.
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
            }
        ]);

        db.query(
            "UPDATE employee SET role_id = ? WHERE first_name = ? OR last_name = ?",
            [updateAnswers.newRoleID, updateAnswers.employeeName, updateAnswers.employeeName],
            (err, result) => {
                if (err) {
                    console.error("SQL query error:", err);
                }
                promptMenu();
            }
        );
    }


    // Exiting the application
    else if (answers.menu === "Exit") {
        console.log("Have an AWESOME day!");
            process.exit(0);
        }
    }


promptMenu();