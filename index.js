const mysql2 = require('mysql2');
const utils = require('utils');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
);

db.query = utils.promisify(db.query);
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