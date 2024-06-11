const inquirer = require('inquirer');
const Database = require('./server');

// The main inquirer menu with the list of all options to cycle through
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'home',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ],
        },
    ]).then((data) => {
        switch (data.home) {
            case 'View All Departments':
                seeDepList();
                break;
            case 'Add Department':
                addDept();
                break;
            case 'View All Employees':
                seeEmpList();
                break;
            case 'View All Roles':
                seeRoleList();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmp();
                break;
            case 'Update Employee Role':
                updateEmp();
                break;
            case 'Quit':
                console.log('Goodbye!');
                process.exit();
            default:
                mainMenu();
                break;
        }
    });
}

// Function to see the department list
function seeDepList() {
    Database.findDep().then(([rows]) => {
        console.table(rows);
        mainMenu();
    });
}

// Function to add a department to the department list
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Which Department would you like to add?',
            name: 'dep_name'
        },
    ]).then((response) => {
        Database.addDep(response).then(() => {
            console.log("Department added successfully!");
            mainMenu();
        });
    });
}

// Function to see the list of employee data
function seeEmpList() {
    Database.seeEmpList().then(([rows]) => {
        console.table(rows);
        mainMenu();
    });
}

// Function to see the list of roles
function seeRoleList() {
    Database.seeRoleList().then(([rows]) => {
        console.table(rows);
        mainMenu();
    });
}

// Function to add new roles
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the new role?',
            name: 'role_title'
        },
        {
            type: 'number',
            message: 'What is the salary of the new role?',
            name: 'role_salary'
        },
        {
            type: 'number',
            message: 'Which department does this role belong to? Enter the department ID',
            name: 'dep_id'
        }
    ]).then((response) => {
        Database.addRole(response).then(() => {
            console.log("Role added successfully!");
            mainMenu();
        });
    });
}

// Function to add a new employee
function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'last_name'
        },
        {
            type: 'number',
            message: 'What is the employee\'s role ID?',
            name: 'role_id'
        },
        {
            type: 'number',
            message: 'What is the employee\'s manager ID (if applicable)?',
            name: 'manager_id',
            default: null
        }
    ]).then((response) => {
        Database.addEmp(response).then(() => {
            console.log("Employee added successfully!");
            mainMenu();
        });
    });
}

// Function to update an employee's role
function updateEmp() {
    Database.seeEmpList().then(([employees]) => {
        const employeeChoices = employees.map(emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id
        }));

        Database.seeRoleList().then(([roles]) => {
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    message: 'Which employee do you want to update?',
                    name: 'employee_id',
                    choices: employeeChoices
                },
                {
                    type: 'list',
                    message: 'Which role do you want to assign to the selected employee?',
                    name: 'role_id',
                    choices: roleChoices
                }
            ]).then((response) => {
                Database.updateEmpRole(response.employee_id, response.role_id).then(() => {
                    console.log("Employee role updated successfully!");
                    mainMenu();
                });
            });
        });
    });
}

// Runs the main program
mainMenu();
