-- migrate:up

create table entry (
    id integer not null primary key auto_increment,
    entry text,
    status integer
);



-- migrate:down

drop table entry;


