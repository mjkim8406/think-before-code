import { getTagLabel, getConstraintLabel } from '../src/lib/tagLabels';

describe('getTagLabel', () => {
  it('returns Korean label for known tags', () => {
    expect(getTagLabel('count')).toBe('개수 (count)');
    expect(getTagLabel('minimum_cost')).toBe('최소 비용');
    expect(getTagLabel('interval_pairs')).toBe('구간 쌍 (시작, 끝)');
  });

  it('formats category-level tags via fallback', () => {
    // 'greedy' is not in TAG_LABELS directly → fallback capitalization
    expect(getTagLabel('greedy')).toBe('Greedy');
    expect(getTagLabel('dynamic-programming')).toBe('Dynamic-programming');
  });

  it('formats unknown tags with spaces and capitalization', () => {
    expect(getTagLabel('unknown_tag_xyz')).toBe('Unknown tag xyz');
  });

  it('handles empty string', () => {
    expect(getTagLabel('')).toBe('');
  });
});

describe('getConstraintLabel', () => {
  it('returns Korean label for known constraint keys', () => {
    expect(getConstraintLabel('N')).toBeTruthy();
    expect(typeof getConstraintLabel('N')).toBe('string');
  });

  it('formats unknown constraints with spaces and capitalization', () => {
    expect(getConstraintLabel('unknown_constraint')).toBe('Unknown constraint');
  });
});
