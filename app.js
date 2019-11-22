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
                    'Update employee roles',
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
                case 'Update employee roles':
                    updateEmpRoles();
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
    db.query(
        'select * from employee', (err, empRes) => {
            const employees = empRes.map(employee => {
                return employee.first_name + ' ' + employee.last_name;
            });
            db.query(
                'select * from role', (err, roleRes) => {
                    const roles = roleRes.map(role => {
                        return role.title;
                    });

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
                            type: 'list',
                            message: 'Choose the new employees role: ',
                            choices: roles
                        },
                        {
                            name: 'manager_id',
                            type: 'list',
                            message: 'Choose the new employees manager',
                            choices: employees
                        }
                        ]).then((res) => {
                            const { first_name, last_name } = res;
                            const manager = empRes.filter(employee => {
                                return employee.first_name + ' ' + employee.last_name === res.manager;
                            })[0];
                            const role_id = roleRes.filter(role => {
                                return role.title === res.role;
                            })[0];
                            const manager_id = manager ? manager.id : null;
                            db.query(
                                'insert into employee set ?',
                                { first_name, last_name, role_id, manager_id }, (err, result) => {
                                    if (err) throw err;
                                }
                            )
                            start();
                        });
                }
            )
        }
    )
}
// =====================================

// Add role function ===================
function addRole() {
    db.query(
        'select * from department', (err, result) => {
            if (err) throw err;
            const departments = result.map(deparment => department.name);
            inquirer
                .prompt([
                    {
                        name: 'title',
                        type: 'input',
                        message: 'Enter title of new role: '
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'Enter the salary of the new role: ',
                        validate: salary => {
                            if (isNaN(salary) || salary < 0) {
                                return 'Please enter a number'
                            }
                            return true;
                        }
                    },
                    {
                        name: 'department',
                        type: 'list',
                        message: 'What department is it in?',
                        choices: departments
                    }
                ]).then((res) => {
                    const { title } = res;
                    const salary = res.salary;
                    const department_id = res.department_id;
                })[0];

            db.query(
                'insert into role set ?',
                {
                    title, salary, department_id
                },
                (err, result) => {
                    if (err) throw err;
                    start();
                }
            )
        }
    )
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

// Update employee roles ===============
function updateEmpRoles() {
    const query = 'select * from employee';
    db.query(query, (err, res) => {
        const employees = res.map(employee => {
            return employee.first_name + ' ' + employee.last_name;
        });
        db.query('select * from role', (err, result) => {
            const roles = result.map(role => {
                return role.title;
            });
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee\'s role do you want to update?',
                        choices: employees
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What\'s the employee\'s new role?',
                        choices: roles
                    }
                ]).then(answer => {
                    const id = result.filter(employee => {
                        return employee.first_name + ' ' + employee.last_name === answer.employee;
                    })[0]
                    db.query(
                        'update employee set role_id = ? where id = ?', [role_id, id], (err, result) => {
                            if (err) throw err;
                            start();
                        }
                    )
                })
        })
    })
}

// =====================================

function toTableFormat(arr) {
    const header = Object.keys(arr[0]);
    const rows = arr.map(obj => Object.values(obj));
    return [header, ...rows];
}
