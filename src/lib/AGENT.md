# AGENT.md — src/lib/

## 책임

앱 전체에서 사용하는 **전역 상수, Supabase 클라이언트, 채점 로직, 태그 라벨 매핑**을 제공한다.

---

## 파일별 역할

### constants.ts
디자인 토큰 + 도메인 상수.
- `CONCEPT_TAGS`: 32개 알고리즘 개념 태그
- `COLORS`: Figma 디자인 기반 컬러 팔레트 (green800, figmaEasyBg, figmaMediumBg, figmaHardBg 등)
- `FONTS`: Inter 폰트 패밀리 (400~900) + SpaceMono
- `SPACING`: 8단계 간격

### supabase.ts
```typescript
export const supabase = createClient(url, key, { auth: { storage: AsyncStorage } });
```
- URL/Key: `app.config.ts` > `extra` (환경변수)
- 화면에서 직접 사용 금지 → `src/services/`를 통해 사용

### tagLabels.ts
영어 태그 → 한국어 라벨 매핑 (200+ 항목).
```typescript
getTagLabel(tag: string): string      // 매핑 없으면 원본 반환
getConstraintLabel(key: string): string  // 제약조건 키 한국어 변환
```
⚠️ **알려진 버그**: 252행/262행 `single_pass_after_sort` 중복 키 → TS1117 에러. 수정 필요.

### scoring.ts
단계별 채점 로직:
- `scoreSingleSelect()`: 정확 매칭 1.0
- `scoreMultiSelect()`: 완전(1.0)/부분(0.5)/오답(0.0)
- `scoreOrderedSteps()`: LCS 기반 순서 채점
- `scoreEdgeCases()`: 3단계 가중치 (required 70%, recommended 20%, optional 10%)
- `calcTotalScore()`: 전체 평균 0~100

### mistakes.ts
`evaluateMistakes()`: 조건 기반 실수 판별 (equals/not_equals/includes/not_includes)
`getMistakeFeedbacks()`: 트리거된 실수 → 피드백 메시지

### stepConfig.ts
7단계 설정: reading → pattern_analysis → strategy_design → solution_flow → edge_cases → complexity → comparison

### sampleData.ts
⚠️ **더 이상 탭 화면에서 사용하지 않음.** 실제 Supabase 데이터로 교체됨.
남아있는 이유: 개발/테스트 참조용. 추후 제거 가능.

---

## 규칙
- 새 색상/간격/폰트 → constants.ts에 추가
- 태그 표시 시 항상 `getTagLabel()` 사용
- Supabase 직접 호출 금지 → services 레이어 사용
