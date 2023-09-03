-- Insert department data: HR, Finance, Engineering, and Top Secret.
INSERT INTO department (department_name) VALUES
    ("Human Resources"),
    ("Finance Billing"),
    ("Engineering Production"),
    ("Top Secret");

-- Insert role data with title, salary, and department.
INSERT INTO role (title, salary, department_id) VALUES
    ("Recruiter Specialist", 30000, 1),
    ("Senior Recruiter", 40000, 1),
    ("Associate Accountant", 30000, 2),
    ("Senior Accountant", 40000, 2),
    ("Associate Engineer", 30000, 3),
    ("Senior Engineer", 40000, 3),
    ("HR Manager", 50000, 1),
    ("Finance Manager", 50000, 2),
    ("Engineer Manager", 50000, 3);

-- Insert employee data with first name, last name, role, and manager ID.
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Etta", "Candy", 4, 7),
    ("Barbara", "Minerva", 5, 7),
    ("Lois", "Lane", 6, 8),
    ("Jimmy", "Olsen", 7, 8),
    ("Dick", "Grayson", 8, 9),
    ("Terry", "McGinnis", 9, 9),
    ("Diana", "Prince", 1, NULL),
    ("Clark", "Kent", 2, NULL),
    ("Bruce", "Wayne", 3, NULL);
-- NULL indicates no manager ID because they hold title.