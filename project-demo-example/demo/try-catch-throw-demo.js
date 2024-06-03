const string = '{"num1":1}';
try {
  const json = JSON.parse(string);

  if (!json.name) throw new SyntaxError('name does not exist.');
  else console.log(json.name);
} catch (err) {
  console.log(err);
}
