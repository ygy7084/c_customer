export default function aggregate(input) {
  const output = [];
  // 빈배열 count 초기값
  for (let k = 0; k < input.length; k += 1) {
    output.push({ obj: '', count: 1 });
  }
  // json 비교 함수
  const compare = function (a, b) {
    let i = 0;
    let j = 0;
    if (typeof a === 'object' && a) {
      if (Array.isArray(a)) {
        if (!Array.isArray(b) || a.length !== b.length) return false;
        for (j = a.length; i < j; i += 1) if (!compare(a[i], b[i])) return false;
        return true;
      }
      b.entries.forEach(() => { i += 1; });
      a.entries.forEach((entry) => {
        if (compare(a[entry], b[entry])) {
          i -= 1;
        }
      });
      return !i;
    }
    return a === b;
  };
  // 배열 요소 중복 체크
  for (let i = 0; i < input.length; i += 1) {
    for (let j = i + 1; j < input.length; j += 1) {
      if (compare(input[i], input[j])) {
        output[i].obj = input[i];
        output[i].count += 1;
        input.splice(j, 1);
        j -= 1;
      }
    }
  }
  // index에 맞게 obj 처리
  for (let i = 0; i < input.length; i += 1) {
    output[i].obj = input[i];
  }
  output.splice(input.length, output.length - input.length);

  return output;
}
