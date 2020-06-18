DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE employee
(
  id INT NOT NULL
  AUTO_INCREMENT,
  first_name VARCHAR
  (30) NOT NULL,
  last_name VARCHAR
  (30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY
  (id)
);


  CREATE TABLE role
  (
    id INT NOT NULL
    AUTO_INCREMENT,
  title VARCHAR
    (30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY
    (id)
);

    CREATE TABLE department
    (
      id INT NOT NULL
      AUTO_INCREMENT,
  department_name VARCHAR
      (30),
  PRIMARY KEY
      (id)
);