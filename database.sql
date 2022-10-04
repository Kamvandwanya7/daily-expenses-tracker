sudo -u postgres createdb tracker;

sudo -u postgres createuser kay -P;

password kv990;

create table usernames(
    id serial not null primary key,
    first_name text not null,
    last_name text,
    email varchar(25),
    user_code varchar(10)
);

create table categories(
 id serial not null primary key,
 cat_description text not null
);

INSERT INTO categories(cat_description) Values('Travel'), ('Food'), ('Toiletries'), ('Communication');

create table expenses(
      id serial not null primary key,
      users_id integer,
      category_id integer,
      amount integer not null,
      expense_date date
      
    FOREIGN KEY (users_id) references usernames(id),
    FOREIGN KEY (category_id) references categories(id)
);




SELECT usernames.id AS userid, categories.id, expenses.id
FROM usernames, categories
INNER JOIN expenses
ON expenses.id=categories.id;



SELECT SUM(amount) as total_value FROM expenses WHERE category_id=1;

SELECT * FROM expenses JOIN usernames ON expenses.id = usernames.id