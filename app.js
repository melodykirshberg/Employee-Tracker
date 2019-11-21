// Packages ============================
const mysql = require('mysql')
const inquirer = require('inquirer')
const { table } = require('table')
const CFonts = require('cfonts');
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

// ASCII ===============================
CFonts.say('Employee Tracker', {
    font: 'block',
    align: 'left',
    colors: ['blueBright', 'whiteBright'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '8',
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
                    'View employees by manager',
                    'Update employee managers',
                    'Delete departments',
                    'Delete roles',
                    'Delete employees',
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
                case 'View employees by manager':
                    viewEmpByManager();
                    break;
                case 'Update employee managers':
                    updateEmpManagers();
                    break;
                case 'Delete departments':
                    deleteDepartments();
                    break;
                case 'Delete roles':
                    deleteRoles();
                    break;
                case 'Delete employees':
                    deleteEmployees();
                    break;
                default:
                    db.end();
                    break;
            }
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
                if (err) throw err;
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
                if (err) throw err;
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
                if (err) throw err;
                start();
            })
        })
}
// =====================================

// View department function ============
function viewByDepartment() {
    const query = 'select * from department';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log(table(toTableFormat(res)));
        start();
    });
};
// =====================================

// View roles function =================
function viewRoles() {
    const query = 'select * from role';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log(table(toTableFormat(res)));
        start();
    });
};
// =====================================

// View employees function =============
function viewEmployees() {
    const query = 'select * from employee';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log(table(toTableFormat(res)));
        start();
    });
};
// =====================================


// BONUS
// View employees by manager function ==
// function viewEmpByManager() {
//     inquirer
//     .prompt({
//         name: 'manager',
//         type: 'list',
//         message: 'Please select the manager: ',
//         choices: 
//     })
// }
// =====================================

// Update employee managers function ===
// updateEmpManagers()
// =====================================

// Delete departments function =========
// deleteDepartments()
// =====================================

// Delete roles function ===============
// deleteRoles()
// function deleteRoles() {
//     inquirer
//     .prompt({
//         name: 'id',
//         type: 'list'
//     })
// }
// =====================================

// Delete employees function ===========
// deleteEmployees()
function deleteEmployees() {
    inquirer
        .prompt({
            name: 'id',
            type: 'input',
            message: 'Enter the ID of the employee you want to delete: '
        }).then((id) => {
            const query = 'delete from employee where id=?';
            db.query(query, id, (err, res) => {
                if (err) throw err;
                start();
            })
        })
}
// =====================================

function toTableFormat(arr) {
    const header = Object.keys(arr[0]);
    const rows = arr.map(obj => Object.values(obj));
    return [header, ...rows];
}