const db = require('../db/connect');
const conTable = require('console.table');
const inquirer = require("inquirer");

// All functionality is built into this file.

// function to display a homescreen and the initial prompts.
function databaseInit() {
console.log("Welcome to the Employee Database.");
mainMenu();
}

// function for the prompts from inquirer. All methods will be determined in this function.
function mainMenu() {
inquirer
    .prompt({
        type: "list",
        name: "choice",
        message: "Select an option.",
        choices:[
        "View all departments",
        "View all roles",
        "View all employees",
        "View employees by Department",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee",
        "Exit",
        ],  
    })
    .then(({ choice }) => {
        if(home === "View all departments"){
            viewDepartments();
        } else if (home === "View all roles"){
            viewRoles();
        } else if (home === "View all employees"){
            viewEmployees();
        }else if (home === "View employees by Department"){
            viewEmployeesByDept();
        } else if (home === "Add a department"){
            addDepartment();
        } else if (home === "Add a role"){
            addRole();
        } else if (home === "Add an employee"){
            addEmployee();
        } else if (home === "Update an employee"){
            updateEmployee
        }
    });
}

// Next functions will be to view ALL departments, roles, and employees.
function viewDepartments() {

}

function viewRoles() {

}

function viewEmployees() {

}
function viewEmployeesByDept(){

}

// Next functions will be to add a department, role, or employee
function addDepartment() {

}

function addRole() {

}

function addEmployee() {

}

// Next functions will be to update a department, role, or employee
function updateDepartment() {

}

function updateRole() {

}

function updateEmployee() {

}

// End the program
function endProgram() {

}

module.exports = databaseInit;


// view all departments
// SELECT * FROM department

// view all roles
// SELECT * FROM role

// view all employees
// SELECT * FROM employee

// prompt the user for the "name" of the department

// THEN Run the query
// Create new departments
// INSERT INTO department (name)
    // VALUES
    //     ("Sales");
       
        // THEN ask the user what they want to do next

// Create a new role

// Get the existing departments from the 'department' table

    // Then prompt the user for the "title", "salary", "department" for the role

        // THEN

        // INSERT INTO role (title, salary, department_id)
            // VALUES
            //     ("Engineer", 120000, 1);
            //     (?, ?, ?);

                // THEN ask the user what they want to do next=