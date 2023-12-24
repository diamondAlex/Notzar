-- migrate:up
create table journal(
    id integer auto_increment not null primary key,
    date timestamp not null default current_timestamp(),
    entry text
);
-- migrate:down
drop table journal;

