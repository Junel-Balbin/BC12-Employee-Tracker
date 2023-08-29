const express = require('express');
const mysql = require('mysql2');
const routes = require("./routes");
const { default: inquirer } = require('inquirer');

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
                "Update employee role."
            ]
        }
    ]);
}


// Create If statements for "View all departments."
if (answers.menu === "View all departments.") {

// Call a function to view all departments.

}




// Create If statements for "View all roles."
if (answers.menu === "View all roles.") {

// Call a function to View all roles.
    
}




// Create If statements for "View all employees."
if (answers.menu === "View all employees.") {

// Call a function to View all employees.
        
}




// Create If statements for "Add new department."
// Create Prompt for input.
if (answers.menu === "Add new department.") {
    const answers = await inquirer.prompt([
// Call a function to add new department.
        {

        }]);
        
}




// Create If statements for "Add new role."
// Create Prompt for input.
if (answers.menu === "Add new role.") {
    const answers = await inquirer.prompt([
// Call a function to add new role.
        {
        
        }]);
                
}




// Create If statements for "Add new employee."
// Create Prompt for input.
if (answers.menu === "Add new employee.") {
    const answers = await inquirer.prompt([
// Call a function to add new employee.
        {
                
        }]);
                        
}




// Create If statements for "Update employee role."
// Create Prompt for input.
if (answers.menu === "Update employee role.") {
    const answers = await inquirer.prompt([
// Call a function to update employee role.
        {
                
        }]);
                        
}



// Exiting the application
else if (answers.menu === "Exit") {

console.log("Exiting the application...");
    process.exit(0);
}


promptMenu();