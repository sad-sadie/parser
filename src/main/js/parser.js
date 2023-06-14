const acorn = require('acorn');

const javascriptCode = `
const randomNumber = Math.random() * 100;

function multiplyByTwo(num) {
  return num * 2;
}

for (let i = 0; i < 10; i++) {
  const result = multiplyByTwo(randomNumber + i);
  if (result > 50) {
    console.log('Result is greater than 50');
  } else {
    console.log('Result is less than or equal to 50');
  }
}

const fruits = ['apple', 'banana', 'orange', 'grapefruit'];

for (const fruit of fruits) {
  console.log(fruit);
}

const person = {
  name: 'John',
  age: 30,
  profession: 'developer',
};



const add = (a, b) => {
  return a + b;
};

const sum = add(5, 10);


greet('Alice');

let counter = 0;

while (counter < 5) {
  counter++;
}

const isEven = num => {
  return num % 2 === 0;
};

console.log(isEven(4));
console.log(isEven(7));

const colors = {
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
};


const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
};



const randomNumberArray = Array.from({ length: 10 }, () => Math.random() * 100);
console.log(randomNumberArray);

const square = num => num * num;
const squaredNumbers = randomNumberArray.map(square);
console.log(squaredNumbers);

const filteredNumbers = squaredNumbers.filter(num => num > 50);
console.log(filteredNumbers);

const sumOfNumbers = randomNumberArray.reduce((total, num) => total + num, 0);

const getEvenNumbers = numbers => {
  return numbers.filter(num => num % 2 === 0);
};

console.log(getEvenNumbers(randomNumberArray));

const isPrime = num => {
  if (num < 2) {
    return false;
  }
  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

console.log(isPrime(7));
console.log(isPrime(10));

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  get perimeter() {
    return 2 * (this.width + this.height);
  }
}

const rectangle = new Rectangle(5, 10);

`;


const parser = acorn.parse(javascriptCode, { ecmaVersion: 2020 });
const root = buildAST(parser, javascriptCode);


displayAST(root, '');

function buildAST(node, code) {
    const type = node.type;
    const value = getValue(node, code);
    const children = [];

    for (const key in node) {
        if (key !== 'type' && key !== 'start' && key !== 'end' && typeof node[key] === 'object' && node[key] !== null) {
            if (Array.isArray(node[key])) {
                for (const childNode of node[key]) {
                    children.push(buildAST(childNode, code));
                }
            } else {
                children.push(buildAST(node[key], code));
            }
        }
    }

    return { type, value, children };
}

function displayAST(node, indent) {
    console.log(indent + node.type + (node.value ? ': ' + node.value : ''));
    for (const child of node.children) {
        displayAST(child, indent + '  ');
    }
}

function getValue(node, code) {
    if (node.type === 'Identifier' || node.type === 'Literal' || node.type === 'UnaryExpression' || node.type === 'BinaryExpression') {
        return code.slice(node.start, node.end);
    }
    return null;
}
