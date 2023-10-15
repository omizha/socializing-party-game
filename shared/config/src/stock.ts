export const COMPANY_NAMES = {
  미즈건설: '미즈건설',
  미즈금융: '미즈금융',
  미즈기획: '미즈기획',
  미즈물산: '미즈물산',
  미즈생명: '미즈생명',
  미즈은행: '미즈은행',
  미즈전자: '미즈전자',
  미즈제과: '미즈제과',
  미즈카드: '미즈카드',
  미즈통신: '미즈통신',
} as const;
export type CompanyNames = (typeof COMPANY_NAMES)[keyof typeof COMPANY_NAMES];

export const getRandomCompanyNames = (length?: number): string[] => {
  const names = Object.keys(COMPANY_NAMES).map((key) => key);
  names.sort(() => Math.random() - 0.5);
  const result = names.splice(0, length ?? names.length);
  return result;
};
