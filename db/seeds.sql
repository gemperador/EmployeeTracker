/* table and data for departments */
INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Engineering"),
    ("Marketing"),
    ("Finance");

/* table and data for each role */
INSERT INTO role (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 75000, 1),
    ("Marketing Strategist", 150000, 3), 
    ("Software Engineer", 120000, 2), 
    ("Accountant", 56000, 4), 
    ("Social Media Manager", 85000, 3),
    ("Account Manager", 160000, 4);

/* making the table and data for employees */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Desi", "Souir", 7, NULL),
    ("Zulema", "Gonzo", 6, 1),
    ("Frank", "Cantando", 5, 2),
    ("Peter", "Piper", 4, 1),
    ("Emily", "Elle", 3, 1),
    ("Joe", "Juice", 2, 3),
    ("Lola", "Show", 1, 4),
    ("Michelle", "Mama", 7, 4),
    ("Hello", "World", 6, 3),
    ("Peach", "Flower", 5, 4),
    ("Summer", "Daze", 4, 3),
    ("Anna", "Boots", 3, 4);
