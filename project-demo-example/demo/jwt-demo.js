const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const token = jwt.sign({ foo: 'bar' }, process.env.PRIVATE_KEY);

const decode = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decode);
