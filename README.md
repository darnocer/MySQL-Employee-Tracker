# Employee Tracker

![last commit](https://img.shields.io/github/last-commit/darnocer/MySQL-Employee-Tracker?style=flat-square) ![license badge](https://img.shields.io/github/license/darnocer/MySQL-Employee-Tracker?style=flat-square)

### URL: https://darnocer.github.io/MySQL-Employee-Tracker/

## Description

CMS for employee management utilizing node and MySQL.

![demo](assets/demo.gif)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#Credits)
- [Tests](#tests)
- [Questions](#questions)

## Installation

```
fork repo
run schema in MySQL
run seeds in MySQL
node server.js
```

## Usage

After installation, select which action you'd like to take from the prompt. You can select fro the following actions:

> View Employees: _See all of the employees with their ID, first and last name, role, department, salary and manager._

> View Employees _By Department: Select a department from the list and see all employees within that department._

> View Employees by Role: _Select a role from the list and see all employees within that role._

> View Employees by Manager: _Select a manager from the list and see all employees under the specified manager._

> Add Employee: _Specify the employee's first name, last name, role, and manager_

> Add Role: _Specify new role_

> Add Department: _Specify new department_

> Remove Employee: _Specify which employee to remove from the list_

> Remove Role: _Specify which role to remove from the list_

> Remove Department: _Specify which role to remove from the list_

> Update Employee Role: _Select an employee from the list and select the employee's new role from the list_

> Update Employee Manager: _Select an employee from the list and select the employee's new manager from the list_

## Credits

- [MySQL](https://www.npmjs.com/package/mysql)

- [Inquirer](https://www.npmjs.com/package/inquirer)

- [console.table](https://www.npmjs.com/package/console.table)

- [Chalk](https://www.npmjs.com/package/chalk)

- My tutor who helped me understand how to write asynchrounous functions!

## Future Enhancements

- Show Department Name instead of only ID in the table after adding a new role
- Update informational logs (eg. "Viewing Employees for {selected department}")
- Refactor to use classes/constructors
- Refactor for asynchronous consistency (convert .then chains to async/await)
- If a selected table is blank, display a message rather than a blank table
- Add confirmations for deletions/additions/updates
- Add validation to free text prompts

## Tests

Coming Soon

## Questions?

Contact me at [darian.nocera26@gmail.com](mailto:darian.nocera26@gmail.com)

or [![Follow on Github](https://img.shields.io/github/followers/darnocer?label=Follow&style=social)](http://www.github.com/darnocer)

Copyright © 2020 [Darian Nocera](http://www.github.com/darnocer)

---

##### _Created with [darnocer's README generator](https://github.com/darnocer/Node.js-and-ES6-README-Generator)_ 👽
