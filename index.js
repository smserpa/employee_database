var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View Employees by Department",
          "View Employees by Manager",
          "Add Employees",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
          employeeSearch();
          break;
  
        case "View Employees by Department":
          employeeSearchDepartment();
          break;
  
        case "View Employees by Manager":
          employeeSearchManager();
          break;
  
        case "Add Employees":
          addEmployee();
          break;

        case "Remove Employee":
            removeEmployee();
            break;

        case "Update Employee Role":
            updateRole();
            break;

        case "Update Employee Manager":
            updateManager();
            break;
  
        case "exit":
          connection.end();
          break;
        }
      });
  }

  function employeeSearch() {
    connection.query(`SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Role, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager
                      FROM employee LEFT JOIN role ON employee.role_id = role.id
                      INNER JOIN department on role.department_id = department.id;`, (err, res) => {
        if (err) {
            throw err;
        }
        console.table(res);
    })
    
  }

  function employeeSearchDepartment() {
      return inquirer
      .prompt({
          name: "searchDepartment",
          type: "list",
          message: "Please select a department:",
          choices: [
          "Sales",
          "Engineering",
          "Finance",
          "Legal"
          ]
      })
      .then((answer) => {
          var query = `SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Role, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager
          FROM employee LEFT JOIN role ON employee.role_id = role.id
          INNER JOIN department on role.department_id = department.id WHERE department.name = ?;`;
          connection.query( query, answer.searchDepartment, (err, res) => {
            if (err) {
              throw err;
            }
          
            console.table(res);

            // runSearch();
            })
      })
  }
  

  function addEmployee() {
    inquirer
      .prompt(
        {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "role_id",
        type: "checkbox",
        message: "What is the employee's role?",
        choices: []
      },
      {
        name: "manager_id",
        type: "checkbox",
        message: "Who is the employee's manager?",
        choices: []
      },
      )
      .then(function(answer) {
        var query = "";
        connection.query(query,function(err, res) {
          if (err) throw err;
          
        });
      });
  }