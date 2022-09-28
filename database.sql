sudo -u postgres createdb tracker;

sudo -u postgres createuser kay -P;

password kv990;

create table usernames(
    id serial not null primary key,
    first_name text not null,
    last_name text not null,
    email varchar(25)
);

create table categories(
 id serial not null primary key,
 cat_description text not null
);

INSERT INTO categories(cat_description) Values('Travel'), ('Food'), ('Toiletries'), ('Communication');

create table expenses(
      id serial not null primary key,
      users_id integer,
      category_des text,
      amount integer not null,
      expense_date date,


    FOREIGN KEY (users_id) references usernames(id),
    FOREIGN KEY (category_id) references categories(id)
);


