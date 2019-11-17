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

