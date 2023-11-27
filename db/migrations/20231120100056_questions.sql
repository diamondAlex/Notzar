-- migrate:up
create table example(
    id integer auto_increment not null primary key,
    question text,
    answer text
);


-- migrate:down

drop table example;
