// Packages ============================
const mysql = require('mysql')
const inquirer = require('inquirer')
const ct = require('console.table')
// =====================================

// MySQL Connection ====================
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'cms_db'
});
// Connects and checks for error -------
db.connect((err) => {
    if (err) throw err;
    start();
});
// =====================================

// Start ===============================
function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: [
                    'Add department',
                    'Add employee',
                    'Add role',
                    'View by department',
                    'View roles',
                    'View employees',
                    'Update employee role',
                    'Exit'
                ]
            }
        ]).then((answer) => {
            switch (answer.action) {
                case 'Add department':
                    addDepartment();
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'View by department':
                    viewByDepartment();
                    break;
                case 'View roles':
                    viewRoles();
                    break;
                case 'View employees':
                    viewEmployees();
                    break;
                case 'Update employee role':
                    updateEmployeeRole();
                    break;
                default:
                    db.end();
                    break;
            }
            if (err) throw (err);
        })
};
// =====================================

// Add department function =============
function addDepartment() {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'Enter name of new department'
        }).then(({ name }) => {
            const query = 'insert into department (name) values (?)';
            db.query(query, name, (err, res) => {
                if (err) throw (err);
                start();
            })
        })
}
// =====================================

// Add employee function ===============
function addEmployee() {
    inquirer
        .prompt([{
            name: 'first_name',
            type: 'input',
            message: 'Enter the new employees first name: '
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the new employees last name: '
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter the new employees role: '
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Enter the new employees manager'
        }
        ]).then((res) => {
            const query = 'insert into employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)';
            const employee = [res.first_name, res.last_name, res.role_id, res.manager_id]
            db.query(query, employee, (err, res) => {
                if (err) throw (err);
                start();
            });
        });
};
// =====================================

// Add role function ===================
function addRole() {
    inquirer
    .prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter title of new role: '
        },
        {
            name: 'salary',
            type: 'integer',
            message: 'Enter the salary of the new role: '
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'Enter the department ID for the new role: '
        }
    ]).then((res) => {
        const query = 'insert into role (title, salary, department_id) values (?,?,?)';
        const role = [res.title, res.salary, res.department_id];
        db.query(query, role, (err, res) => {
            if (err) throw (err);
            start();
        })
    })
}
// =====================================

// View department function ============
function viewByDepartment() {
    const query = 'select * from department';
    db.query(query, (err, res) => {
        if (err) throw (err);
        console.table(res);
        start();
    });
};
// =====================================

// View roles function =================
// =====================================

// View employees function =============
// =====================================