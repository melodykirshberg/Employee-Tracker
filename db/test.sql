use cms_db;

insert into department (name) 
values 
('Sales'),
('Engineering'), 
('Legal'), 
('Finance');
​
insert into role (title, salary, department_id)
values 
('Sales Lead', 10000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Legal Team Lead', 250000, 3),
('Lawyer', 190000, 3),
('Accountant', 125000, 4);
​
insert into employee (first_name, last_name, role_id, manager_id)
values 
('Kaidan', 'Alenko', 1, null),
('Liara','Tsoni', 3, null),
('Tali', 'Zorah', 4, 2),
('Urdnot', 'Wrex', 6, null),
('Garrus', 'Vakarian', 2, 1),
('Miranda', 'Lawson', 2, 1);