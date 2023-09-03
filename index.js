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


// Function to fetch roles from the database and return them as choices.
async function fetchRolesFromDatabase() {
    return new Promise((resolve, reject) => {
        const query = "SELECT id, title FROM role";
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const roleChoices = results.map((role) => ({
                    name: role.title,
                    value: role.id,
                }));
                resolve(roleChoices);
            }
        });
    });
}

// Function to fetch managers (employees with null manager IDs) from the database and return them as choices
async function fetchManagersFromDatabase() {
    return new Promise((resolve, reject) => {
        const query = "SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL";
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const managerChoices = results.map((manager) => ({
                    name: `${manager.first_name} ${manager.last_name}`,
                    value: manager.id,
                }));
                resolve(managerChoices);
            }
        });
    });
}



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
        // Fetch roles from the database and convert them to choices
        const roleChoices = await fetchRolesFromDatabase();
        
        // Fetch managers from the database and convert them to choices
        const managerChoices = await fetchManagersFromDatabase();
        
        const employeeAnswers = await inquirer.prompt([
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
                type: "list",
                name: "roleID",
                message: "Select Role:",
                choices: roleChoices
            },
            {
                type: "list",
                name: "managerID",
                message: "Select Manager:",
                choices: managerChoices
            }
        ]);
        
        // Insert the new employee into the database.
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [employeeAnswers.firstName, employeeAnswers.lastName, employeeAnswers.roleID, employeeAnswers.managerID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                promptMenu();
            }
        });
    }

    // If statements for "Update employee role."
    if (answers.menu === "Update employee role.") {
        // Fetch roles from the database and convert them to choices.
        const roleChoices = await fetchRolesFromDatabase();
        
        // Fetch managers from the database and convert them to choices.
        const managerChoices = await fetchManagersFromDatabase();
        
        const updateAnswers = await inquirer.prompt([
            {
                type: "input",
                name: "employeeName",
                message: "Enter the employee's name: "
            },
            {
                type: "list",
                name: "newRoleID",
                message: "Select new Role:",
                choices: roleChoices
            },
            {
                type: "list",
                name: "newManagerID",
                message: "Select new Manager:",
                choices: managerChoices
            }
        ]);

        // Updates the employee's role in the database.
        db.query(
            "UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ? OR last_name = ?",
            [updateAnswers.newRoleID, updateAnswers.newManagerID, updateAnswers.employeeName, updateAnswers.employeeName],
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
        console.log("THANK YOU! TAKE CARE AND HAVE A NICE DAY!");
        process.exit(0);
    }
}

// Starts menu prompt when launched.
promptMenu();
