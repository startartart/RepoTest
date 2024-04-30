const arr = [1, 2, 3, 4, 5];

// forEach 함수
// return으로 새로운 배열 생성 X
const forEachArr = arr.forEach((el, idx, all) => {
  // console.log(
  //   `${idx}번째 속하는 원소의 값 => ${el}, 마지막 매개변수는 전체 배열 ${all}`
  // );
  return el * 2;
});

// map 함수
// return으로 새로운 배열 생성 O
const mapArr = arr.map((el, idx, all) => {
  // console.log(
  //   `${idx}번째 속하는 원소의 값 => ${el}, 마지막 매개변수는 전체 배열 ${all}`
  // );
  return el * 2;
});

console.log(`forEachArr => ${forEachArr}`);
console.log(`mapArr => ${mapArr}`);
