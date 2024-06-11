const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employee_db',
    },
    console.log(`Connected to the employee_db database.`)
);

class Database {

    // Function to query the database to select all the departments from the departments table
    findDep() {
        return db.promise().query(`SELECT id, name AS department FROM department`);
    }

    // Function to query the database and add a new department to the departments table
    addDep(depName) {
        return db.promise().query(`INSERT INTO department SET ?`, { name: depName.dep_name });
    }

    // Function to query the database and select all employees from the employee table
    seeEmpList() {
        return db.promise().query(`
            SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, 
                   employees.role_id, roles.salary, roles.title, department.name AS department 
            FROM employee AS employees
            LEFT JOIN role AS roles ON employees.role_id = roles.id
            LEFT JOIN department ON roles.department_id = department.id
        `);
    }

    // Function to query the database and view the job title, role id, department, and salary that belongs to a role
    seeRoleList() {
        return db.promise().query(`
            SELECT roles.id, roles.title, roles.salary, roles.department_id, department.name AS department 
            FROM role AS roles
            LEFT JOIN department ON roles.department_id = department.id
        `);
    }

    // Function to query the database and add a new role, with its name, salary, and department
    addRole(role) {
        return db.promise().query(`INSERT INTO role SET ?`, {
            title: role.role_title,
            salary: role.role_salary,
            department_id: role.dep_id
        });
    }

    // Function to query the database and add an employee, with their first name, last name, role, and manager
    addEmp(employee) {
        return db.promise().query(`INSERT INTO employee SET ?`, {
            first_name: employee.first_name,
            last_name: employee.last_name,
            role_id: employee.role_id,
            manager_id: employee.manager_id
        });
    }

    // Function to query the database and update an employee's role
    updateEmpID(employeeId, newRoleID) {
        return db.promise().query(`UPDATE employee SET role_id = ? WHERE id = ?`, [newRoleID, employeeId]);
    }

    updateEmpManager(employeeId, newManager) {
        return db.promise().query(`UPDATE employee SET manager_id = ? WHERE id = ?`, [newManager, employeeId]);
    }

    // Function to call role id
    callRoleID() {
        return db.promise().query(`SELECT id, title FROM role`);
    }

    // Function to call manager id
    callManagerID() {
        return db.promise().query(`SELECT id, first_name, last_name FROM employee`);
    }
}

// Export the database class to use in index.js
module.exports = new Database();
