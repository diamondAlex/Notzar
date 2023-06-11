-- migrate:up

create table books (
    id integer,
    book varchar(255) not null,
    title varchar(255) not null,
    entry text,
    subjects varchar(255)
);



-- migrate:down

drop table books;

