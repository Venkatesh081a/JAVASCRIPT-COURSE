'use strict';

/* Constructor Functions and the "new" operator
================================================================================
Constructor Functions are similar to Functions , the only difference is that 
while calling the Constructor Functions , we use 'new' keyword.
 */
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);
const jack = new Person('Jack', 2007);
console.log(jack);
console.log(jonas instanceof Person);

/* PROTOTYPE
 we can decalre methods in Prototype , instead of directly declaring in constructor
  function , so any object which is created using the Person constructor function will
  have access to Person constructor function Prototype i.e Person.Prototype */
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
jack.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jack));
console.log(Person.prototype.isPrototypeOf(Person));

// we can decalre properties of constructor function also in Prototype
Person.prototype.species = 'Home Species';
console.log(jonas, jack);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

// PROTOTYPAL INHERITANCE ON BUILT-IN FUNCTIONS
console.log(jonas.__proto__);

// Object.Prototype ( top of the Prototype Chain)
console.log(jonas.__proto__.__proto__);

console.log(jonas.__proto__.__proto__.__proto__);

const arr = [1, 2, 3, 4];
console.log(arr.__proto__);

// coding challenge
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/hr`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/hr`);
};

const bmw = new Car('BMW', 120);
bmw.accelerate();
bmw.brake();
const mercedes = new Car('Mercedes', 95);
mercedes.accelerate();
mercedes.brake();

// CLASSES
class Student {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to " .prototype " property
  calculateAge() {
    console.log(2021 - this.birthYear);
  }
}

const s1 = new Student('Venky', 1997);
console.log(s1);
s1.calculateAge();

/* Note :
-----------------------------------------------------------------
1) Classes are not Hoisted , means we cannot use them before their declaration
2) Classes are also first-class citizens , means we can pass classes in to functions
and return classes from functions.
3) Classes are executed in Strict mode , even we don't activate strict mode
-------------------------------------------------------------------
*/

// Setters and Getters and StaticMethods
//=====================================================================
class Employee {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Getter
  get Age() {
    return 2021 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a fullName !`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method : static methods are not available on the instances
  static greet() {
    console.log(this);
    console.log('Hi , welcome to JS !');
  }
}

const emp1 = new Employee('Venkatesh V', 1997);
console.log(emp1.Age);
console.log(emp1);
const emp2 = new Employee('Warner D', 1990);
console.log(emp2);
Employee.greet();

/* Object.create 
------------------------------------------------------------------------
*/
const PersonProto = {
  calcuAge() {
    console.log(2021 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.firstName = 'Steven';
steven.birthYear = 2002;
steven.calcuAge();

const sarah = Object.create(PersonProto);
console.log(sarah);
sarah.init('Sarah', 1998);
sarah.calcuAge();

// Challenge
class Cars {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Cars('Ford', 120);
console.log(ford.speedUs);
ford.accelerate();
ford.brake();
ford.speedUs = 50;
console.log(ford);

// Practice
function addUp(num) {
  let array = [];
  let sum = 0;
  for (let i = 1; i <= num; i++) {
    array.push(i);
  }
  array.forEach(i => (sum += i));
  return sum;
}

console.log(addUp(4));

function timeForMilkAndCookies(date) {
  return date.getMonth() === 11 && date.getDate() === 24 ? true : false;
}
console.log(timeForMilkAndCookies(new Date(2013, 11, 25)));

function whichIsLarger(f, g) {
  if (f() < g()) {
    return 'g';
  }
  if (f() > g()) {
    return 'f';
  }
  if (f() === g()) {
    return 'neither';
  }
}

console.log(
  whichIsLarger(
    () => 5,
    () => 10
  )
);

const s = 'Venkatesh';
console.log(s.slice(1, -1));

// ----------------------------------------------------------------
// Inheritance Between Classes Using Constructor Functions
const Person1 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person1.prototype.calcAge = function () {
  console.log(2020 - this.birthYear);
};

const Student1 = function (firstName, birthYear, course) {
  Person1.call(this, firstName, birthYear);
  this.course = course;
};

// linking prototypes
Student1.prototype = Object.create(Person1.prototype);

Student1.prototype.introduce = function () {
  console.log(`My Name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student1('Mike', 2007, 'CSE');
console.log(mike);
mike.introduce();
mike.calcAge();

Student1.prototype.constructor = Student1;

// coding challenge

const Car1 = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car1.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed} km/hr`);
};

Car1.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/hr`);
};

const EelectriCar = function (make, speed, charge) {
  Car1.call(this, make, speed);
  this.charge = charge;
};

EelectriCar.prototype = Object.create(Car1.prototype);

EelectriCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EelectriCar.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/hr , with a charge of ${this.charge}`
  );
};

const tesla = new EelectriCar('Tesla', 120, 60);
tesla.chargeBattery(85);
console.log(tesla);
tesla.brake();
tesla.accelerate();

// Inheritance between Classes
//-------------------------------------
class Team {
  constructor(teamName, teamRanking) {
    this.teamName = teamName;
    this.teamRanking = teamRanking;
  }
}

class Player extends Team {
  constructor(PlayerName, teamName, teamRanking) {
    super(teamName, teamRanking);
    this.PlayerName = PlayerName;
  }

  introduce() {
    console.log(`Hi I am ${this.PlayerName} and I belong to ${this.teamName}`);
  }
}

const warner = new Player('David Warner', 'AUS', 2);
warner.introduce();
console.log(warner);

/* Encapsulation : Protected Properties and Methods
---------------------------------------------------------------------------
Encapsulation : Keeping some properties and Methods private inside the class , so they 
are not accessible outside of the class.

by usign "_" sign we are not making fields protected or private , they are still accessible
outside the class , we are using _ sign just to make sure that every one has an idea that the field
should not be changed outside the class , simply we are Faking the encapsulation here.
*/
class Account {
  constructor(ownerName, currency, pin) {
    this.ownerName = ownerName;
    this.currency = currency;
    // Protected properties
    this._pin = pin;
    this._movements = [];

    console.log(`Hey ${ownerName} , Thanks for opening an account`);
  }

  deposit(value) {
    this._movements.push(value);
  }

  withdraw(value) {
    this.deposit(-value);
  }
}

const acnt1 = new Account('venky', 2000, 8019);
acnt1.deposit(1000);
acnt1.withdraw(500);
console.log(acnt1);

// Private Methods and properties
//------------------------------------------------------------------------------
class BankAccount {
  // Public fields
  locale = navigator.language;

  // Private fields
  #movements = [];
  #pin;

  constructor(ownerName, currency, pin) {
    this.ownerName = ownerName;
    this.currency = currency;
    this.#pin = pin;
  }
}

const bankAcnt1 = new BankAccount('venkatesh', '5000', 8888);
//  bankAcnt1.#pin;
// private fields cannot be accessed outside the class
console.log(bankAcnt1);

/* Chaining Methods
----------------------------------
In order to chain methods we need to user "return this" in every method , so that the methods
current object will be returned and we can chain them with another method.
*/
class Account1 {
  constructor(ownerName, currency, pin) {
    this.ownerName = ownerName;
    this.currency = currency;
    // Protected properties
    this._pin = pin;
    this._movements = [];

    console.log(`Hey ${ownerName} , Thanks for opening an account`);
  }

  deposit(value) {
    this._movements.push(value);
    // chaining methods
    return this;
  }

  withdraw(value) {
    this.deposit(-value);
    // chaining methods
    return this;
  }
}

const account1 = new Account1('David', 3000, 9835);
// using method chaining
account1.deposit(500).withdraw(200).deposit(300);
console.log(account1);

// coding challenge
//---------------------------------------------------------------
class CarClass {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/hr`);
    return this;
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

class EelectricVehicle extends CarClass {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} km/hr , with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EelectricVehicle('Rivian', 120, 23);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(70)
  .accelerate();
console.log(rivian);
