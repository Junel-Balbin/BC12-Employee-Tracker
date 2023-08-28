INSERT INTO department (department_name) VALUES
    ("Human Resources"),
    ("Finance Billing"),
    ("Engineering"),
    ("Maintenance"),
    ("Production"),
    ("Cafeteria");

INSERT INTO manager (manager_name, department_name, salary)
    ("Clark Kent", Finance Billing, 100),
    ("Diana Prince", Human Resources, 100),
    ("Bruce Wayne", Engineering, 100);


INSERT INTO employee (first_name, last_name, role_id, manager_name)
    ("John", "Grayson", 4, "Bruce Wayne"),
    ("Jimmy", "Olsen", 5, "Clark Kent"),
    ("Etta", "Candy", 6, "Diana Prince");
    ("Clark", "Kent", 1, NULL),
    ("Diana", "Prince", 2, NULL),
    ("Bruce", "Wayne", 3, NULL);


INSERT INTO role (title, salary, department_name)
    ()