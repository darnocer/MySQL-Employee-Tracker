// DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const console_table = require("console.table");
const chalk = require("chalk");
const clear = require("console-clear");

const log = console.log;

// creates the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_DB",
});

// connects to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  clear();
  renderGreeting();
  promptUser();
}

// update with something fun
function renderGreeting() {
  log("~EMPLOYEE TRACKER~");
}

function promptUser() {
  inquirer
    .prompt({
      name: "userSelection",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    })
    .then((answer) => {
      switch (answer.userSelection) {
        case "View All Employees":
          viewEmployees();
          break;
      }
    });
}

function viewEmployees() {
  console.log("HELLO");
}
