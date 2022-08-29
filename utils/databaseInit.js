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
inquirer.prompt([
    {
        type: "text",
        name: "newDept",
        message: "Enter the department name:",
    },
])
.then (({ newDept }) => {
    const sql = "INSERT INTO department (dept_name) VALUES (?)";
    const query = [newDept];
    db.query(sql, query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        inquirer
            .prompt ({
            type: "confirm",
            name: "result",
            message: "view results?"
        })
        .then(({ result }) =>{
            if(result) {
                viewDepartments();
            } else {
                mainMenu();
            }
        });
    });
});
}

function addRole() {
    const getDepartments = new Promise((resolve, reject) => {
        let departmentsArr = [];
        const sql = `SELECT dept_name FROM department`;
        db.query(sql, (err, rows) => {
            if (err){
                console.log(err.message);
            }
            for (var i = 0; i < rows.length; i++){
                departmentsArr.push(Object.values(rows[i])[0]);
            }
            resolve(departmentsArr);
            console.log(departmentsArr);
        });
    });

    getDepartments.then((departmentsArr) => {
        inquirer
        .prompt([
            {
                type: "list",
                name: "deptId",
                message: "Choose the department for your role.",
                choices: departmentsArr,
                filter: (deptIdInput) => {
                    if (deptIdInput) {
                        return departmentsArr.indexOf(deptIdInput);
                    }
                },
            },
            {
                type: "text",
                name: "roleTitle",
                message: "What is the title of your role?"
                // some sort of validation?
            },
            {
                type: "number",
                name: "roleSalary",
                message: "What is the salary of your role?"
                // some sort of validation?
            }
         ])
         .then (({ deptId, roleTitle, roleSalary }) =>{
            const sql = "INSERT INTO role (department_id, title, salary) VALUES (?,?,?)";

            const query = [deptId + 1, roleTitle, roleSalary];

            db.query(sql, query, (err, rows) => {
                if (err) {
                    console.log(err.message);
                }
                inquirer.prompt ({
                    type: "confirm",
                    name: "result",
                    message: "view results?"
                })
                .then(({ result }) =>{
                    if(result) {
                        viewRoles();
                    } else {
                        mainMenu();
                    }
                });
            });
         });
    });

}

function addEmployee() {
    const getTitles = new Promise((resolve, reject) => {
        let titlesArr = [];
        const sql = "SELECT title FROM role";
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err.message);
            }
            for (var i = 0; i < rows.length; i++) {
                titlesArr.push(Object.values(rows[i])[0]);
            }
            resolve(titlesArr);
        });
    });

    const getActiveManagerList = new Promise((resolve, reject) => {
        let activeManagersArr = [];
        const sql = `SELECT DISTINCT concat(m.first_name, ' ', m.last_name)
                    AS manager FROM employee e, employee m
                    WHERE m.e_id = e.manager_id `;
        db.query(sql, (err,rows) => {
            if(err) {
                console.log(err.message);
            }
            for (var i = 0; i < rows.length; i++) {
                activeManagersArr.push(Object.values(rows[i])[0]);
            }
            activeManagersArr.push("more");
            resolve(activeManagersArr);
        });
    });

    const getManager = new Promise((resolve, reject) => {
        let managerArr = [];
        const sql = `SELECT concat(m.first_name, ' ', m.last_name)
                    AS manager FROM employee m`;
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err.message);
            }
            for (var i = 0; i < rows.length; i++) {
                managerArr.push(Object.values(rows[i])[0]);
            }
            managerArr.push("Employee does not have a manager");
            resolve(managerArr);
        });
    });

    const getManagerIdList = new Promise((resolve, reject) => {
        let managerIdArr = [];
        const sql = `SELECT DISTINCT m.e_id AS manager
                    FROM employee e, employee m
                    WHERE m.e_id = e.manager_id`;
        db.query(sql, (err, rows) => {
            if(err) {
                console.log(err.message);
            }
            for (var i = 0; i < rows.length; i++) {
                managerIdArr.push(Object.values(rows[i])[0]);
            }
            resolve(managerIdArr);
        });
    });

    Promise.all([getTitles, getActiveManagerList, getManager, getManagerIdList])
        .then(([titlesArr, activeManagersArr, managerArr, managerIdArr]) => {
          inquirer.prompt([
            {
              type: "text",
              name: "firstname",
              message: "Enter Employee First Name:",
              // add some form of validation
            },
            {
              type: "text",
              name: "lastname",
              message: "Enter Employee Last Name:",
              // add some form of validation
            },
            {
              type: "list",
              name: "roleId",
              message: "Choose a role:",
              choices: titlesArr,
              filter: (roleIdInput) => {
                if (roleIdInput) {
                  return titlesArr.indexOf(roleIdInput) + 1;
                }
              },
            },
            {
              type: "list",
              name: "managerIdOne",
              message: "Select a Manager:",
              choices: activeManagersArr,
              filter: manangerIdOneInput => {
                if (manangerIdOneInput === "more") {
                    return manangerIdOneInput;
                } else {
                    return activeManagersArr.indexOf(manangerIdOneInput);
                }
              }
            },
            {
                type: "list",
                name: "managerIdTwo",
                message: "Select a Manager:",
                choices: managerArr,
                filter: manangerIdTwoInput => {
                  if (manangerIdTwoInput === "No manager assigned") {
                      return manangerIdTwoInput;
                  } else {
                      return managerArr.indexOf(manangerIdTwoInput) + 1;
                  }
                },
                when: ({ managerIdOne }) => {
                    if (isNaN(managerIdOne) === true) {
                        return true;
                    } else {
                        return false;
                    }
                }
              }
          ])
          .then(
            ({ firstname, lastname, roleId, managerIdOne, ManagerIdTwo }) => {
                const getManagerId = () => {
                    if (isNaN(managerIdOne)) {
                        if(isNaN(ManagerIdTwo)) {
                            managerArr.push(firstname +' '+ lastname);
                        } else {
                            return ManagerIdTwo;
                        }
                    } else {
                        return managerIdArr[managerIdOne];
                    }
                }
                const managerId = getManagerId();
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                const query = [
                    firstname,
                    lastname,
                    roleId,
                    managerId
                ];

                db.query(sql, query, (err, rows) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        inquirer
                        .prompt (
                            {
                                type: "confirm",
                                name: "results",
                                message: "View results?"
                            }
                        ).then(({ results }) => {
                            if (results) {
                                viewEmployees();
                            } else {
                                mainMenu();
                            }
                        })
                    }
                });
            }
          );  
        });

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

                // THEN ask the user what they want to do next



            