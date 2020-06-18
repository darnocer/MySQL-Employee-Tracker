USE employees_DB;

INSERT INTO department
    (name)
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
    ("Sales Lead", 75000, 4),
    ("UX Director", 70000, 3),
    ("Support Specialist", 65000, 5),
    ("Chief Quality Tester", 80000, 3),
    ("Software Tester", 55000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Robert", "Ross", 1, 1),
    ("Sal", "Dali", 2, 1),
    ("Michael", "Angelo", 3, 2),
    ("Vince", "Van Gogh", 4, 3),
    ("Frita", "Kahlo", 5, 1),
    ("Drew", "Warhol", 6, 1),
    ("Georgia", "Keefe", 7, 6),
    ("Pablo", "Casso", 9 , 8),
    ("Claude", "Monett", 8, 2);

SELECT * FROM employees_db.employee;