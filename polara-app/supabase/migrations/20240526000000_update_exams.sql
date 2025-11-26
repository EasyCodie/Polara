alter table exams
add column title text not null default 'Exam',
add column topics text,
add column target_grade text;
