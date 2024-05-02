const obj1 = {};
const obj2 = { message: 'not empty.' };
const num = 5;
const str1 = 'one';
const str2 = '';

console.log(Object.keys(obj1).length); // 0
console.log(Object.keys(obj2).length); // 1
console.log(Object.keys(num).length); // 0
console.log(Object.keys(str1).length); // 3
console.log(Object.keys(str2).length); // 0

function isEmpty(obj) {
  if (obj.constructor === Object)
    if (Object.keys(obj).length) return true;
    else return false;
}
