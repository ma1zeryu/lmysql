-- create table player (
-- 	id INT,
--     name VARCHAR(100),
--     level INT,
--     exp INT,
--     gold decimal(10, 2)
-- );
desc player;
-- alter table player modify column name varchar(200);
insert into player (id, name, level, exp, gold) values (1, "yxc", 1, 1, 1);
desc player;
select * from player;