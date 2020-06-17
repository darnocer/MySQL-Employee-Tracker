// DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const console_table = require("console.table");
const chalk = require("chalk");
const clear = require("console-clear");
const util = require("util");

const log = console.log;

// creates the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees_DB",
});

// gives availability to async/await concept
connection.query = util.promisify(connection.query);

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

// do not need switch statements for every case
// return instead of break
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
          // can also use process.exit();
          break;
      }
    });
}

function viewEmployees() {
  log("Viewing All Employees");
}

async function viewByDepartment() {
  log("Viewing By Department");
  const departments = await connection.query("SELECT * FROM department");
  // returned as an array of id and names
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const { departmentId } = await inquirer.prompt([
    {
      type: "list",
      message: "What department would you like to view employees for?",
      name: "departmentId",
      choices: departmentChoices,
    },
  ]);

  const employees = await connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?;",
    departmentId
  );

  log("\n");
  console.table(employees);
  promptUser();
}

// function viewByManager() {
//   log("Viewing By Manager");
// }

function addEmployee() {
  log("Adding employee");
  // create prompt
}

function addRole() {
  log("Adding Role");
}

// function needs to be asynchronous. Can use asycn/await, .then chaining (returning), .then wrapping
function addDepartment() {
  log("Adding Department");
  inquirer
    .prompt({
      name: "deptname",
      message: "What's the name of the department?",
    })
    .then((response) => {
      return connection.query("INSERT INTO department SET ?", response);
    })
    .then(() => {
      console.log("Department added!");
      promptUser();
    });
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
