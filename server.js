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
        "View All Employees By Role",
        // "View All Employees By Manager",
        "Add Employee",
        "Add Role",
        "Add Department",
        // "Remove Employee",
        // "Remove Department",
        // "Remove Role",
        "Update Employee Role",
        // "Update Employee Manager",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.userSelection) {
        case "View All Employees":
          viewEmployees();
          break;
      }
      switch (answer.userSelection) {
        case "View All Employees By Department":
          viewByDepartment();
          break;
      }
      // switch (answer.userSelection) {
      //   case "View All Employees By Manager":
      //     viewByManager();
      //     break;
      // }
      switch (answer.userSelection) {
        case "Add Employee":
          addEmployee();
          break;
      }
      switch (answer.userSelection) {
        case "Add Role":
          addRole();
          break;
      }
      switch (answer.userSelection) {
        case "Add Department":
          addDepartment();
          break;
      }
      // switch (answer.userSelection) {
      //   case "Remove Employee":
      //     removeEmployee();
      //     break;
      // }
      // switch (answer.userSelection) {
      //   case "Remove Role":
      //     removeRole();
      //     break;
      // }
      // switch (answer.userSelection) {
      //   case "Remove Department":
      //     removeDepartment();
      //     break;
      // }
      switch (answer.userSelection) {
        case "Update Employee Role":
          updateEmployee();
          break;
      }
      switch (answer.userSelection) {
        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewEmployees() {
  log("Viewing All Employees");
}

function viewByDepartment() {
  log("Viewing By Department");
}

// function viewByManager() {
//   log("Viewing By Manager");
// }

function addEmployee() {
  log("Adding employee");
}

function addRole() {
  log("Adding Role");
}

function addDepartment() {
  log("Adding Role");
}

// function removeEmployee() {
//   log("Removing Employee");
// }

// function removeRole() {
//   log("Removing Role");
// }

// function removeDepartment() {
//   log("Removing Department");
// }

function updateEmployee() {
  log("Updating Employee");
}
