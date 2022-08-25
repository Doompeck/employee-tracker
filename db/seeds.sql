INSERT INTO department (dept_name)
VALUES
('Sales'),
('Marketing'),
('Web Dev'),
('Executive'),
('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Rep', 75000, 1),
('VP of marketing', 80000, 2),
('Web Developer', 90000, 3),
('CEO', 1000000, 4),
('Customer Service Agent', 60000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Larry", "Newhart", 1, 1),
("Daryl", "Newhart", 2, 1),
("Daryl", "Notnewhart", 3, 1),
("Bobby", "Ricky", 2, 1),
("Carl", "Potts", 4, 5),
("Arthur", "Dent", 5, 1),
("Duncan", "Idaho", 3, 1);