INSERT INTO department (department_name) VALUES
    ("Human Resources"),
    ("Finance Billing"),
    ("Engineering Production");

INSERT INTO role (title, salary, department_id) VALUES
    ("Recruiter Specialist", 30000, 1),
    ("Senior Recruiter", 40000, 1),
    ("Associate Accountant", 30000, 2),
    ("Senior Accountant", 40000, 2),
    ("Associate Engineer", 30000, 3),
    ("Senior Engineer", 40000, 3),
    ("HR Manager", 50000, 1),
    ("FB Manager", 50000, 2),
    ("EP Manager", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Etta", "Candy", 4, 1),
    ("Barbara", "Minerva", 5, 1),
    ("Lois", "Lane", 6, 2),
    ("Jimmy", "Olsen", 7, 2),
    ("Dick", "Grayson", 8, 3),
    ("Terry", "McGinnis", 9, 3),
    ("Diana", "Prince", 1, NULL),
    ("Clark", "Kent", 2, NULL),
    ("Bruce", "Wayne", 3, NULL);
