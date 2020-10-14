CREATE database employee_db

USE employee_db

CREATE TABLE employee ( id INT NOT NULL PRIMARY KEY,  first_name VARCHAR(30) NOT NULL,  last_name VARCHAR(30) NOT NULL,  role_id INT NOT NULL,  manager_id INT NULL )

CREATE TABLE role ( id INT NOT NULL PRIMARY KEY,  title VARCHAR(30) NOT NULL,  salary DECIMAL NULL,  department_id INT NOT NULL )

CREATE TABLE department ( id INT NOT NULL PRIMARY KEY,  name VARCHAR(30) NULL )

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;

-- employees with role
SELECT employee.id, employee.first_name, employee.last_name, employee.role_id AS Role, employee.manager_id AS Manager,
role.title AS Role
FROM employee LEFT JOIN role ON employee.role_id = role.id;

-- role with department
SELECT role.id, role.title, role.salary, role.department_id, department.name AS Department
FROM role LEFT JOIN department ON role.department_id = department.id;

-- employee with role and department
SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Role, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager
FROM employee LEFT JOIN role ON employee.role_id = role.id
INNER JOIN department on role.department_id = department.id;
