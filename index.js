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

// Function to fetch department choices from the database.
async function fetchDepartmentChoices() {
    return new Promise((resolve, reject) => {
        const query = "SELECT id, department_name FROM department";
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const departmentChoices = results.map((department) => ({
                    name: department.department_name,
                    value: department.id,
                }));
                resolve(departmentChoices);
            }
        });
    });
}

// Function to fetch role choices from the database.
async function fetchRoleChoices() {
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

// Function to fetch employee choices from the database.
async function fetchEmployeeChoices() {
    return new Promise((resolve, reject) => {
        const query = "SELECT id, first_name, last_name FROM employee";
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const employeeChoices = results.map((employee) => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id,
                }));
                resolve(employeeChoices);
            }
        });
    });
}

// Function to fetch employee names from the database and convert them to choices.
async function fetchEmployeeNamesFromDatabase() {
    return new Promise((resolve, reject) => {
        const query = "SELECT first_name, last_name FROM employee";
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const employeeNames = results.map((employee) => `${employee.first_name} ${employee.last_name}`);
                resolve(employeeNames);
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
                "Delete department.",
                "Delete role.",
                "Delete employee.",
                "View department budget.",
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
                console.log("---ADDED NEW DEPARTMENT SUCCESSFULLY---");
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
                message: "Type New Department ID."
            }
        ]);

        // Insert new role into the database.
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.newRole, answers.newSalary, answers.newDepartmentID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.log("---ADDED NEW ROLE SUCCESSFULLY---");
                promptMenu();
            }
        });
    }

    // If statements for "Add new employee."
    if (answers.menu === "Add new employee.") {
        // Fetch roles from the database and convert them to choices.
        const roleChoices = await fetchRolesFromDatabase();

        // Fetch managers from the database and convert them to choices.
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
                console.log("---ADDED NEW EMPLOYEE SUCCESSFULLY---");
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

    // Fetch employee choices (with id) from the database.
    const employeeChoices = await fetchEmployeeChoices();

    const updateAnswers = await inquirer.prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Select the employee to update:",
            choices: employeeChoices
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

    // Updates the employee's role in the database using employee_id.
    db.query(
        "UPDATE employee SET role_id = ?, manager_id = ? WHERE id = ?",
        [updateAnswers.newRoleID, updateAnswers.newManagerID, updateAnswers.employeeId],
        (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.log("---UPDATED EMPLOYEE ROLE SUCCESSFULLY---");
                promptMenu();
            }
        }
    );
}

    // If statements for "Delete department."
    if (answers.menu === "Delete department.") {
        const departmentChoices = await fetchDepartmentChoices();
        const departmentID = await inquirer.prompt([
            {
                type: "list",
                name: "departmentID",
                message: "Select a department to delete:",
                choices: departmentChoices
            }
        ]);

        // Delete the selected department from the database.
        db.query("DELETE FROM department WHERE id = ?", [departmentID.departmentID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.log("---DELETED DEPARTMENT SUCCESSFULLY---");
            }
            promptMenu();
        });
    }

    // If statements for "Delete role."
    if (answers.menu === "Delete role.") {
        const roleChoices = await fetchRoleChoices();
        const roleID = await inquirer.prompt([
            {
                type: "list",
                name: "roleID",
                message: "Select a role to delete:",
                choices: roleChoices
            }
        ]);

        // Delete the selected role from the database.
        db.query("DELETE FROM role WHERE id = ?", [roleID.roleID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.log("---DELETED ROLE SUCCESSFULLY---");
            }
            promptMenu();
        });
    }

    // If statements for "Delete employee."
    if (answers.menu === "Delete employee.") {
        // Fetch employee name from the database.
        const employeeChoices = await fetchEmployeeChoices();
        const employeeID = await inquirer.prompt([
            {
                type: "list",
                name: "employeeID",
                message: "Select an employee to delete:",
                choices: employeeChoices
            }
        ]);

        // Delete the selected employee from the database.
        db.query("DELETE FROM employee WHERE id = ?", [employeeID.employeeID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.log("---DELETED EMPLOYEE SUCCESSFULLY---");
            }
            promptMenu();
        });
    }

    // Add a menu option to view the total utilized budget of a department.
    if (answers.menu === "View department budget.") {
        const departmentChoices = await fetchDepartmentChoices();
        const departmentID = await inquirer.prompt([
            {
                type: "list",
                name: "departmentID",
                message: "Select a department to view budget:",
                choices: departmentChoices
            }
        ]);

        // Query the database to calculate the total salary budget for the selected department.
        const query = "SELECT SUM(role.salary) AS total_budget FROM employee INNER JOIN role ON employee.role_id = role.id WHERE role.department_id = ?";
        db.query(query, [departmentID.departmentID], (err, result) => {
            if (err) {
                console.error("SQL query error:", err);
            } else {
                console.log(`Total Budget for the department: $${result[0].total_budget}`);
            }
            promptMenu();
        });
    }

    // Exiting the application
    else if (answers.menu === "Exit") {
        console.log("THANK YOU! TAKE CARE AND HAVE A NICE DAY!");
        process.exit(0);
    }
}

// Starts menu prompt when launched.
promptMenu();
