-- migrate:up
create table cards(
    id integer auto_increment not null primary key,
    question text,
    answer text,
    subject varchar(255),
);


-- migrate:down

drop table cards;
