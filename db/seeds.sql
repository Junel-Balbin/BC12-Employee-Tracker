INSERT INTO department (department_name) VALUES
    ("Human Resources"),
    ("Finance Billing"),
    ("Engineering"),
    ("Maintenance"),
    ("Production"),
    ("Cafeteria");

INSERT INTO manager (manager_name, department_name, salary)
    ("Clark Kent", "Finance Billing", 50000),
    ("Diana Prince", "Human Resources", 50000),
    ("Bruce Wayne", "Engineering", 50000);


INSERT INTO employee (first_name, last_name, role_id, manager_name)
    ("Dick", "Grayson", 4, "Bruce Wayne"),
    ("Jimmy", "Olsen", 5, "Clark Kent"),
    ("Etta", "Candy", 6, "Diana Prince");
    ("Clark", "Kent", 1, NULL),
    ("Diana", "Prince", 2, NULL),
    ("Bruce", "Wayne", 3, NULL);


INSERT INTO role (title, salary, department_name)
    ("Associate Engineer", 40000, "Engineering"),
    ("Associate Accountant", 40000, "Finance Billing"),
    ("Recruiter Specialist", 40000, "Human Resources"),
    ("Manager", 50000, "Finance Billing"),
    ("Manager", 50000, " Human Resources"),
    ("Manager", 50000, "Engineering");