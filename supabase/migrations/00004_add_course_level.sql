-- 코스 레벨 컬럼 추가 (카테고리 내 난이도 단계)
ALTER TABLE problems
  ADD COLUMN IF NOT EXISTS course_level text
    CHECK (course_level IN ('beginner','basic','intermediate','advanced'))
    DEFAULT 'basic';

-- 기존 문제에 course_level 매핑 (difficulty 기반 초기값)
UPDATE problems SET course_level = 'beginner'     WHERE difficulty = 'easy';
UPDATE problems SET course_level = 'basic'        WHERE difficulty = 'medium';
UPDATE problems SET course_level = 'intermediate' WHERE difficulty = 'hard';

-- 인덱스: 코스 탐색용
CREATE INDEX IF NOT EXISTS idx_problems_category_level
  ON problems (category, course_level);
