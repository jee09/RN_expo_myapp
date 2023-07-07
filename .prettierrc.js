module.exports = {
  printWidth: 80, // 한 줄의 최대 글자 수
  tabWidth: 2, // 탭 간격
  useTabs: false, // 탭 대신 스페이스 사용
  semi: true, // 세미콜론 사용
  singleQuote: true, // 작은따옴표 사용
  trailingComma: 'all', // 여러 줄로 구성된 배열이나 객체에서 후행 콤마 사용 ("all"은 가능한 모든 곳에 콤마를 추가)
  bracketSpacing: true, // 객체 리터럴에서 중괄호 사이에 공백 추가
  jsxBracketSameLine: false, // 여러 줄로 구성된 JSX 요소에서 닫는 괄호를 다음 줄로 이동
  arrowParens: 'always', // 화살표 함수의 매개변수에 항상 괄호 사용
  endOfLine: 'auto', // 파일의 끝 줄바꿈 스타일을 자동으로 감지
  overrides: [
    {
      files: '*.ts', // TypeScript 파일에 대한 설정
      options: {
        parser: 'typescript', // TypeScript 파서 사용
      },
    },
    {
      files: '*.tsx', // TypeScript JSX 파일에 대한 설정
      options: {
        parser: 'typescript', // TypeScript 파서 사용
      },
    },
  ],
};
