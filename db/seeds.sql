USE employees_DB;

INSERT INTO department
    (department_name)
VALUES
    ("Management"),
    ("Engineering"),
    ("Quality Assurance"),
    ("Sales"),
    ("Tech Support");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("CEO", 200000, 1),
    ("Product Manager", 125000, 1),
    ("Senior Engineer", 95000, 2),
    ("Junior Engineer", 75000, 2),
    ("UX Director", 70000, 3),
    ("Chief Quality Officer", 80000, 1),
    ("Software Tester", 55000, 3),
    ("Sales Lead", 75000, 4),
    ("Support Specialist", 65000, 5);


INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Robert", "Ross", 1, 1),
    ("Sal", "Dali", 2, 1),
    ("Michael", "Angelo", 3, 1),
    ("Vince", "Van Gogh", 4, 3),
    ("Frita", "Kahlo", 5, 2),
    ("Drew", "Warhol", 6, 2),
    ("Georgia", "Keefe", 7, 6),
    ("Pablo", "Casso", 9 , 2),
    ("Claude", "Monett", 8, 6);

SELECT * FROM employees_db.employee;