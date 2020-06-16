USE employees_DB;

INSERT INTO department
    (id, name)
VALUES
    (1, "Management"),
    (2, "Engineering"),
    (3, "Quality Assurance"),
    (4, "Sales"),
    (5, "Tech Support");

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (1, "CEO", 200000, 1),
    (2, "Product Manager", 125000, 1),
    (3, "Senior Engineer", 95000, 2),
    (4, "Junior Engineer", 75000, 2),
    (5, "Sales Lead", 75000, 3),
    (6, "UX Director", 70000, 3),
    (7, "Support Specialist", 65000, 5),
    (8, "Chief Quality Tester", 80000, 3),
    (9, "Software Tester", 55000, 3);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Robert", "Ross", 1, 1),
    (2, "Sal", "Dali", 2, 1),
    (3, "Michael", "Angelo", 3, 2),
    (4, "Vince", "Van Gogh", 4, 3),
    (5, "Frita", "Kahlo", 5, 1),
    (6, "Drew", "Warhol", 6, 1),
    (7, "Georgia", "Keefe", 7, 6),
    (8, "Pablo", "Casso", 9 , 8),
    (9, "Claude", "Monett", 8, 2);