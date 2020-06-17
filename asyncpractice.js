// async/await method
async function addDepartment() {
  const department = await inquirer.prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]);
  await connection.query("INSERT INTO department SET ?", department);
  console.log(`Added ${department.name} to the database`);
  loadMainPrompts();
}
// .then chaining method
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      return connection.query("INSERT INTO department SET ?", answer);
    })
    .then(() => {
      console.log(`Added department to the database`);
      loadMainPrompts();
    });
}
// .then wrapping method
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((response) => {
      connection.query("INSERT INTO department SET ?", response).then(() => {
        console.log(`Added department to the database`);
        loadMainPrompts();
      });
    });
}
