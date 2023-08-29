const express = require('express');
const mysql = require('mysql2');
const routes = require("./routes");
const { default: inquirer } = require('inquirer');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api', routes);


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



// Create If statements for "View all roles."



// Create If statements for "View all employees."



// Create If statements for "Add new department."
// Create Prompt for input.



// Create If statements for "Add new role."
// Create Prompt for input.



// Create If statements for "Add new employee."
// Create Prompt for input.



// Create If statements for "Update employee role."
// Create Prompt for input.





app.listen(port, () => {
    console.log(`server running on port ${port}`);
});