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
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee",
        "Exit",
        ],  
    })
    .then(({ choice }) => {
        if(choice === "View all departments"){
            viewDepartments();
        } else if (choice === "View all roles"){
            viewRoles();
        } else if (choice === "View all employees"){
            viewEmployees();
        }else if (choice === "Add a department"){
            addDepartment();
        } else if (choice === "Add a role"){
            addRole();
        } else if (choice === "Add an employee"){
            addEmployee();
        } else if (choice === "Update an employee"){
            updateEmployee
        } else if (choice === 'Exit'){
            endProgram();
        }
    });
}

// Next functions will be to view ALL departments, roles, and employees.
function viewDepartments() {
const sql = `SELECT d_id AS id, dept_name FROM department`;
db.query(sql, (err, rows) => {
    if(err){
        console.log(err.message);
    }
    console.table(rows);
    mainMenu();
})
}

function viewRoles() {
    const sql = `SELECT r_id AS id, title, salary, dept_name AS department FROM role 
    LEFT JOIN department ON role.department_id = department.d_id`;
    db.query(sql, (err, rows) => {
        if(err){
            console.log(err.message);
        }
        console.table(rows);
        mainMenu();
    });
}

function viewEmployees() {
    const sql = `SELECT e.e_id AS id, concat(e.first_name,' ', e.last_name) AS employee, e.title AS title, e.salary AS salary, e.dept_name AS department,
    CASE WHEN e.manager_id = e.e_id THEN concat ('N/A') ELSE concat(m.first_name,' ', m.last_name) END AS manager
    FROM (SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.r_id LEFT JOIN department ON role.department_id = department.d_id) AS e, employee m
    WHERE m.e_id = e.manager_id`;
    db.query(sql, (err, rows) => {
        if (err){
            console.log(err.message);
        }
        console.table(rows);
        mainMenu();
    })
}

// I will attempt this at some point.
// function viewEmployeesByDept(){

// }

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
    console.log("Goodbye!");
process.exit(1);
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