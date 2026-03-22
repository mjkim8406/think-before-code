-- 문제 카테고리 컬럼 추가 (파일 분류 기준: dp, greedy, graph 등)
alter table problems add column category text not null default 'uncategorized';
create index idx_problems_category on problems (category);
