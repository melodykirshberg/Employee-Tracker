// Packages ============================
const mysql = require('mysql')
const inquirer = require('inquirer')
const ct = require('console.table')
// =====================================


// MySQL Connection ====================
const db = new Database({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'cms_db'
});
// =====================================

// Main Questions ======================
async function mainQuestions() {
    return inquirer
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
        ])
};
// =====================================

