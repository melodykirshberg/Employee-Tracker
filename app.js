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
db.connect(function (err) {
    if (err) throw err;
    start();
});
// =====================================

// Gets info from database =============

// =====================================

// Start ===============================
async function start() {
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
                    'View department',
                    'View roles',
                    'View employees',
                    'Update employee role',
                    'Exit'
                ]
            }
        ]).then(function (answer) {
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
                case 'View department':
                    viewDepartment();
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
        })
};


// =====================================

// Add Department function =============

// async function addDepartment(department)
