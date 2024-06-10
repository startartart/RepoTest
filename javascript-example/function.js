function foo(arg) {
  return arg;
}

// 함수 선언문
function bar() {
  console.log('bar');
}

foo(bar); // f bar
foo(bar)(); // 'bar'

// 함수 표현식
const foo2 = function (arg) {
  return arg;
};
foo2(1); // 1

function foo3(arg = 1) {
  console.log(arg);
}

foo3(2); // 2
foo3(); // 1

function foo4(arg, ...rest) {
  console.log(rest);
}

foo4(1); // []
foo4(1, 2, 3, 4); // [2, 3, 4]

function foo5(arg) {
  console.log(arguments);
}

foo5(1, 2, 3, 4);
/* 
{
    '0': 1,
    '1': 2,
    '2': 3,
    '3': 4,
    length: 4,
    callee: f foo4(),
    __proto__: ...
}
*/

// Function 생성자 함수
const foo6 = new Function("console.log('foo6')");

// 화살표 함수 표현식
const foo7 = () => console.log('foo7');

// IIFE (즉시 실행 함수)
(function start() {
  console.log('start');
})();

// 재귀함수
function foo8(arg) {
  if (arg === 0) return;
  foo8(arg - 1);
}

// 중첩함수
function foo9(arg) {
  function bar() {
    console.log(arg);
  }
  bar();
}

// 콜백함수
function foo10(arg) {
  arg();
}
foo(() => console.log('callback'));
