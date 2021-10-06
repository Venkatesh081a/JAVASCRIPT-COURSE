'use strict';
// Default Parameters
const bookingDetails = [];
const createBooking = function (
  flightNum,
  NumOfPassengers = 1,
  price = NumOfPassengers * 1000
) {
  const booking = {
    flightNum,
    NumOfPassengers,
    price,
  };
  console.log(booking);
  bookingDetails.push(booking);
  //console.log(bookingDetails);
};

createBooking('LHA238');
createBooking('BWK452', 3, 4500);

// If we want to skip a parameter we can specify as undefined
createBooking('TGR4a0', undefined, 2500);

/* Passing arguments to  a function : value Vs reference
In javascript there no pass by reference , there is only pass by value , eventhough we are passing a reference , it is internally pass by value only.
 */
const flight = 'LH234';
const jonas = {
  name: 'Jonas smith',
  passportNum: 23498126,
};

const checkIn = function (flight, passenger) {
  flight = 'LA983';
  passenger.name = 'Mr.' + passenger.name;
  if (passenger.passportNum == 23498126) {
    console.log('Checked In');
  } else {
    console.log('Wrong Passport !');
  }
};
console.log(jonas);
checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passportNum = Math.trunc(Math.random() * 1000000);
};

newPassport(jonas);
checkIn(flight, jonas);

/* First class and Higher Order Functions 
---------------------------------------------------------------
FirstClassFunctions : JavaScript treats functions as first-class citizens
This means that functions are simply values
Functions are just another type of object
-- we can store functions in variables
-- we can pass functions as arguments to Other Functions
-- we can return functions from another functions
-- we can call methods on functions


Higher Order Functions
------------------------------------------
A function that receives another function as an argument , that returns a new function or both
This is only possible because of firstclass functions
*/

// Functions Accepting CallBack Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-Order Function
const transformer = function (str, fn) {
  console.log(`Original string ${str}`);
  console.log(`Transformed string ${fn(str)}`);
  console.log(`transformed by ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callBacks all the time
const high5 = function () {
  console.log('High-Fi');
};
['jonas', 'smith', 'adam'].forEach(high5);

// Functions Returning Functions
const greet = function (greet) {
  return function (name) {
    console.log(`${greet} ${name}`);
  };
};
const greeting = greet('Hello');
greeting('venky');
greeting('david');

// challenge
const greeter = greet => name => console.log(`${greet} ${name}`);

const greetings = greeter('Hey');
greetings('venkat');

// The Call and Apply methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNumber, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNumber}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNumber}`, name });
  },
};

lufthansa.book(2348, 'venky');
lufthansa.book(9842, 'warner');
console.log(lufthansa);

const euroWings = {
  airline: 'EuroWings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
// Does not work , because in a regular function call "this" refers to undefined , so we wll get an error if we try to call like
// book(4673, 'venkatesh');

/* So , we need to tell js that , if we want to call the book method of Lufthansa the the "this" keyword shoulb be Lufthansa and
 If we want to call the book method of Eurowings , then "this" keyword should become Eurowings 
 There are 3 functions methods to do the above . they are call , apply , bind
 */

// call method : In this method the first argument refers to the this keyword and remaining are same as function calls
book.call(euroWings, 7493, 'Sarah williams');
console.log(euroWings);

book.call(lufthansa, 9217, 'Dean Jones');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'SW',
  bookings: [],
};

book.call(swiss, 6519, 'Will Smith');
console.log(swiss);

// Apply Method : It is similar to call , but it takes the original function parameters from an array
const flightData = [5027, 'John Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

/* Bind Method : Just as call and apply methods , Bind method also allows to set the 
"this" keyword manually for any function call.
The difference is that , the Bind method does not immediately calls the function , 
instead it returns a new function where the "this" keyword is bound
 */
const bookEw = book.bind(euroWings);
bookEw(2439, 'Steven smith');
console.log(euroWings);

const bookEW23 = book.bind(euroWings, 23);
bookEW23('John smith');
bookEW23('Will john');

// Bind Method with EventListeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial application : presetting parameters
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(200));
console.log(addVAT(100));

// challenge
const poll = {
  question: 'What is your favourite programming language ?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll Results are ${this.answers.join(',')}`);
    }
  },
};

poll.registerNewAnswer = function () {
  const [option1, option2, option3, option4] = this.options;
  const input = Number(
    prompt(`${this.question}
  ${option1}
  ${option2}
  ${option3}
  ${option4}`)
  );

  // for (const [index, value] of this.answers.entries()) {
  //   if (index === input) {
  //     this.answers[index] += 1;
  //   }
  // }
  typeof input === 'number' &&
    input < this.answers.length &&
    this.answers[input]++;

  this.displayResults();
  this.displayResults('string');
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] });

// Immediately Invoked Function Expressions (IIFE)
(function () {
  console.log('This will run only once');
})();

(() => console.log('This will also run only once'))();

// Closures
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passenger`);
  };
};

// Example-1
let f;

const g = function () {
  let a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning "f" function
const h = function () {
  let b = 7777;
  f = function () {
    console.log(b * 2);
  };
};

h();
f();
console.dir(f);

// Example-2
const boardPassenegers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`we are onboarding all ${n} passengers`);
    console.log(`There are 3 groups each with ${perGroup}  passengers`);
  }, wait * 1000);

  console.log(`will start boarding in ${wait} seconds`);
};

boardPassenegers(180, 3);

// challenge
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
