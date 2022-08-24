const db = require('../db/connect');
const conTable = require('console.table');
const inquirer = require("inquirer");

// All functionality is built into this file.

// function to display a homescreen and the initial prompts.
function databaseInit() {

}

// function for the prompts from inquirer. All methods will be determined in this function.
function mainMenu() {

}

// Next functions will be to view ALL departments, roles, and employees.
function viewDepartments() {

}

function viewRoles() {

}

function viewEmployees() {

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