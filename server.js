// DEPENDENCIES
const mysql = require("mysql");
const inquirer = require("inquirer");
const console_table = require("console.table");
const chalk = require("chalk");
const clear = require("console-clear");
const util = require("util");

// other variables
const log = console.log;

// chalk
const bgRed = chalk.bgRed;
const red = chalk.red;
const inverse = chalk.inverse;

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
  mainMenu();
}

// update with something fun
function renderGreeting() {
  log("~EMPLOYEE TRACKER~");
}

function mainMenu() {
  inquirer
    .prompt({
      name: "userSelection",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View Employees By Department",
        "View Employees By Role",
        // "View All Employees By Manager",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Remove Employee",
        "Remove Department",
        "Remove Role",
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

        case "View Employees By Department":
          viewByDepartment();
          break;

        case "View Employees By Role":
          viewByRole();
          break;

        //   case "View All Employees By Manager":
        //     viewByManager();
        //     break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Remove Role":
          removeRole();
          break;

        case "Remove Department":
          removeDepartment();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

async function viewEmployees() {
  log("Viewing All Employees");

  // const employees = await connection.query("SELECT * FROM employee");
  const employees = await connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
  );

  log("\n");
  console.table(employees);
  mainMenu();
}

async function viewByDepartment() {
  log("Viewing Employees By Department");

  const departments = await connection.query("SELECT * FROM department");

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  const { userDepartmentId } = await inquirer.prompt([
    {
      type: "list",
      message: "What department would you like to view employees for?",
      name: "userDepartmentId",
      choices: departmentChoices,
    },
  ]);

  const employees = await connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?;",
    userDepartmentId
  );

  log("\n");
  console.table(employees);
  mainMenu();
}

async function viewByRole() {
  log("Viewing Employees By Role");

  const roles = await connection.query("SELECT * FROM role");

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { userRoleId } = await inquirer.prompt([
    {
      type: "list",
      message: "What role would you like to view employees for?",
      name: "userRoleId",
      choices: roleChoices,
    },
  ]);

  const employees = await connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE role.id = ?;",
    userRoleId
  );

  log("\n");
  console.table(employees);
  mainMenu();
}

// function viewByManager() {
//   log("Viewing By Manager");
// }

async function addEmployee() {
  log("Adding employee");

  const roles = await connection.query("SELECT * FROM role");

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  inquirer
    .prompt([
      {
        name: "first_name",
        message: "What's the employee's first name?",
      },
      {
        name: "last_name",
        message: "What's the employee's last name?",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role_id",
        choices: roleChoices,
      },
    ])
    .then((answer) => {
      return connection.query("INSERT INTO employee SET ?", answer);
    })
    .then(() => {
      return connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
      );
    })
    .then((employees) => {
      console.log("Employee added!");
      log("\n");
      console.table(employees);
      mainMenu();
    });
}

function addRole() {
  log("Adding Role");

  inquirer
    .prompt({
      name: "title",
      message: "What's the name of the role you'd like to add?",
    })
    .then((answer) => {
      return connection.query("INSERT INTO role SET ?", answer);
    })
    .then(() => {
      console.log("Role added!");
      mainMenu();
    });
}

function addDepartment() {
  log("Adding Department");

  inquirer
    .prompt({
      name: "name",
      message: "What's the name of the department you'd like to add?",
    })
    .then((answer) => {
      return connection.query("INSERT INTO department SET ?", answer);
    })
    .then(() => {
      console.log("Department added!");
      mainMenu();
    });
}

async function removeEmployee() {
  const employees = await connection.query("SELECT * FROM employee");

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to remove?",
        name: "userEmployee",
        choices: employeeChoices,
      },
    ])
    .then(({ userEmployee }) => {
      return connection.query("DELETE FROM employee WHERE ?", {
        id: userEmployee,
      });
    })

    .then(() => {
      log(red("Employee deleted!"));

      return connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;"
      );
    })
    .then((employees) => {
      log("\n");
      log(inverse("All Employees"));
      console.table(employees);

      mainMenu();
    });
}

async function removeRole() {
  const roles = await connection.query("SELECT * FROM role");

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        message: "Which role would you like to remove?",
        name: "userRoleId",
        choices: roleChoices,
      },
    ])

    .then(({ userRoleId }) => {
      return connection.query("DELETE FROM role WHERE ?", {
        id: userRoleId,
      });
    })
    .then(() => {
      log(red("Role deleted!"));
      return connection.query("SELECT * FROM role");
    })
    .then((roles) => {
      log("\n");
      log(inverse("All Roles"));
      console.table(roles);
      mainMenu();
    });
}

async function removeDepartment() {
  const departments = await connection.query("SELECT * FROM department");

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        message: "What department would you like to remove?",
        name: "userDeptId",
        choices: departmentChoices,
      },
    ])

    .then(({ userDeptId }) => {
      log(red("Department deleted!"));
      return connection.query("DELETE FROM department WHERE ?", {
        id: userDeptId,
      });
    })
    .then(() => {
      log("\n");
      log(inverse("All Departments"));
      console.table(departments);
      mainMenu();
    });
}

async function updateEmployee() {
  log("Updating Employee's Role");

  const employees = await connection.query("SELECT * FROM employee");

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: first_name + " " + last_name,
    value: id,
  }));

  const roles = await connection.query("SELECT * FROM role");

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "userEmployee",
        choices: employeeChoices,
      },
      {
        type: "list",
        message:
          "Which role would you like to update the selected employee to?",
        name: "newRoleId",
        choices: roleChoices,
      },
    ])
    .then((answer) => {
      return connection.query("UPDATE employee SET ? WHERE ?", [
        {
          role_id: answer.newRoleId,
        },
        {
          id: answer.userEmployee,
        },
      ]);
    })
    .then(() => {
      log(`Role updated!`);
      mainMenu();
    });
}
