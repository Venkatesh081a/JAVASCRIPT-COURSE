'use strict';

const openingHours = {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'ViLetelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 Enhanced object literals before ES6 we have write like  openingHours : openingHours
  openingHours,

  //  ES6 Enhanced object literals, we dont need to specify "function" keyword , to write a function
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // object Destructing used here
  orderDelivery({
    mainItem = 0,
    time = '6:00 Pm',
    address = 'default address',
    secondaryItem = 0,
  }) {
    console.log(
      `Order received ${this.starterMenu[mainItem]} and ${this.mainMenu[secondaryItem]} will
      be delivered to ${address} at around ${time} `
    );
  },

  // Spread operator is used here
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicous pasta with ${ing1} , ${ing2} and ${ing3}`
    );
  },

  // rest parmas is used here
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

restaurant.orderDelivery({
  time: '10:30 AM',
  address: 'Nellore , VR Nagar , 7th street',
  mainItem: 3,
  secondaryItem: 0,
});

// Real world example
const ingredients = [
  // prompt("let's make pasta ! ingredient 1"),
  // prompt('ingredient 2'),
  // prompt('ingredient 3'),
];
console.log(ingredients);

restaurant.orderPasta(...ingredients);

// Objects and Spread Operator

const newRestaurant = { foundedYear: '2007', ...restaurant, founder: 'Smith' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristroanta Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

// Destructuring Arrays : We can unpack the arrays directly
const arr = [2, 3, 4];
const [x, y, z] = arr;
console.log(x, y, z);

// Mutating variables
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receiving 2 return values from a function
const [starter, maincourse] = restaurant.order(0, 0);
console.log(starter, maincourse);

// Destructuring the nested arrays
const nested = [2, 4, [5, 6]];
const [i, , k] = nested;
console.log(i, k);

const [l, , [m, n]] = nested;
console.log(l, m, n);

// Default values
const defaultarr = [8, 9];
const [p = 1, q = 1, r = 1] = defaultarr;
console.log(p, q, r);

/*  OBJECT Destructuring  :

*/

const { name, categories } = restaurant;
console.log(name, categories);

const {
  name: restaurantName,
  openingHours: Timings,
  categories: Items,
} = restaurant;

console.log(restaurantName);
console.log(Items);

// Default Values

const { menu: MenuItems = [], starterMenu: starters = [] } = restaurant;
console.log(MenuItems, starters);

// Mutating Variables
let a = 10;
let b = 20;
const obj = { a: 40, b: 50 };
console.log(a, b);
({ a, b } = obj);
console.log(a, b);

// Nested Objects destructruing
const { fri } = openingHours;
console.log(fri);
const {
  fri: { start: O = 12, close: C = 10 },
} = openingHours;
console.log(O, C);

/*  SPREAD Operator  : we can unpack all the array elements at once
 */
const oldarray = [7, 8, 9];
const newarray = [5, 6, ...oldarray];
console.log(newarray);

const newMenu = [...restaurant.mainMenu, 'Sandwich'];
console.log(newMenu);

// copy arrays
const mainMenuCopy = [...restaurant.mainMenu];

// join two arrays
const arrJoin = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(arrJoin);

/* SPread operator is applied on all Iterables. 
Iterables : Every collections(string,arrays,maps etc...) 
*/
const myName = 'Venkatesh';
const letters = [...myName];
console.log(letters);

/* REST PATTERNS and PARAMETERS  : sntax is same as Spread operator , but it work in 
opposite way
*/
// Spread operator , because "..." is on the right side of "=" sign.
const myarray = [1, 2, ...[3, 4]];
console.log(myarray);

// Rest Parameter , because "..." is on the left side of "=" sign.
const [g, h, ...others] = [1, 2, 3, 4, 5, 6];
console.log(g, h, others);

// So , Spread will unpack the elements , where as REST will pack the elements

const [Pizza, , Risotto, ...otherFoods] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];

console.log(Pizza, Risotto, otherFoods);

// rest for objects

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// function with restparmas a input
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3);
add(1, 2, 3, 4, 5);

restaurant.orderPizza('mushrooms', 'ginger', 'garlic');

// challenge

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutincho', 'Perisic'];
console.log(players1Final);

const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
};

printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels', 'venky', 'Messi');
printGoals('Ronaldo', 'Messi');
printGoals(...game.scored);

team1 < team2 && console.log('Team1 is more likely to win');

team1 > team2 && console.log('Team2 is more likely to win');

// The for-of loop

const menus = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menus) console.log(item);

for (const [i, ele] of menus.entries()) {
  console.log(`${i + 1} : ${ele}`);
}

// Optional Chaining
// -------------------------------
// with out optional chaining
if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

//with optional chaining : The "?" in the below synatax read the open property only if the openinghours property has mon object
// otherwise it will return undefined
console.log(restaurant.openingHours.mon?.open);

// In the below one , first it will check , if the restaurant object has OpeningHOurs , if it is not null or undefined , then only it will read mon object
// otherwise it will return undefined
console.log(restaurant.openingHours?.mon?.open);

// Example

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`on ${day} we open restaurant at ${open}`);
}

// Optional Chaining with methods : we will check that the method actually exists before calling it
console.log(restaurant.order?.(2, 2) ?? 'Method does not exist');

console.log(restaurant.orderMaggie?.(1, 2) ?? 'Method does not exist');

// Optional Chaining with Arrays
const users = [{ name: 'Jonas', email: 'Hello@jonas' }];
console.log(users[0]?.name ?? 'Users array is empty');

// Looping objects(object keys,values and entries) using "for-of"
// --------------------------------------------------------------------------

// Property Names (object keys)
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `we open our restaurant on ${properties.length} days :`;
// console.log(openStr);
for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

//  Property Values (object Values)
const values = Object.values(openingHours);
console.log(values);

// Property entries (Object entries)
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(
    `On ${key} we open our restaurant at ${open} and closes at ${close}`
  );
}

// Challenge
const goalsScored = game.scored;
console.log(goalsScored);
for (const [key, value] of goalsScored.entries()) {
  console.log(`Goal ${key + 1} : ${value}`);
}

const odds = Object.entries(game.odds);
console.log(odds);

let avg = 0;
for (const [key, value] of odds) {
  avg += value;
}
console.log(avg / odds.length);

for (const [key, value] of odds) {
  const teamStr = key === 'x' ? 'draw' : `victory ${game[key]}`;
  console.log(`odd of ${teamStr} : ${value}`);
}

const scorers = {};

for (const [key, value] of Object.entries(game.scored)) {
  // if (value in scorers) {
  //   scorers[`${value}`] = scorers[`${value}`] + 1;
  // } else {
  //   scorers[`${value}`] = 1;
  // }
  value in scorers
    ? (scorers[`${value}`] = scorers[`${value}`] + 1)
    : (scorers[`${value}`] = 1);
}

console.log(scorers);

// SETS : Collection of Unique Values
const orderSet = new Set(['pasta', 'pizza', 'rosotto', 'pizza', 'pasta']);
console.log(orderSet);
console.log(orderSet.size);
console.log(orderSet.has('pizza'));
console.log(orderSet.has('bread'));
orderSet.add('garlic bread');
orderSet.add('garlic bread');
orderSet.add('garlic bread');
orderSet.delete('rosotto');
//orderSet.clear();
console.log(orderSet);

for (const order of orderSet) console.log(order);

// Example
const staff = ['waiter', 'cheff', 'manager', 'cheff', 'waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set('Venkatesh').size);

// MAPS : It is a key-value pair DS similar to Objects , but in objects the keys has to be strings only , in Map keys can be of any type
const rest = new Map();
rest.set('name', '3chef restaurant');
rest.set('location', 'chennai');
rest.set(1, 'chennai-Tnagar');
rest.set(2, 'chennai-Perungudi');

//console.log(rest);
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 10)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest);

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
console.log(rest.delete(2));
console.log(rest.size);
//console.log(rest.clear);

const myarr = [1, 2];
rest.set(myarr, 'Test');
//rest.set(document.querySelector('h1'), 'heading');
console.log(rest);

console.log(rest.get(myarr));

// MAPS : Iteration
const question = new Map([
  ['question', 'What is the best programming language?'],
  [1, 'Python'],
  [2, 'JavaScript'],
  [3, 'Java'],
  ['correct', 2],
  [true, 'Correct Answer'],
  [false, 'Try again !'],
]);

console.log(question);

// convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// quizz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key} : ${value}`);
}
//const answer = Number(prompt('Your answer'));
//console.log(answer);
const answer = 2;
console.log(question.get(question.get('correct') === answer));

// convert Map to Array
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);

// Which DataStructure to Choose
/*
  Sources of Data  : 
  ------------------------------------
  1. From the program itself : Data written directly in the source code (eg: status messages)
  2. From the UI : Data input from the user or Data written in DOM (eg: tasks in todo app)
  3. From external Sources : Data fetched for example from webapis

                   ||
                   \/
              Colleciton of Data
                   ||
                   \/
                Data Structures
                   ||
                   \/
             Simple List        KeyValue pairs    --> Objects or Maps              
                ||                    
                \/
              Arrays or Sets  

*/

// challenge
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(gameEvents.values())];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

const timeKey = [...gameEvents.keys()].pop();
//console.log(timeKey);
console.log(`An event happened every ${timeKey / gameEvents.size} minutes`);

for (const [min, events] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min} : ${events}`);
}

// Working With Strings
const airline = 'Tap air portugal';
const palne = 'A320';
console.log(palne[0]);
console.log(palne[1]);
console.log('B324'[0]);
console.log('B324'.length);
console.log(airline.indexOf('p'));
console.log(airline.lastIndexOf('p'));
console.log(airline.indexOf('portugal'));

// Slicing
console.log(airline.slice(4));
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middleSeats
  const s = seat.slice(-1);
  s === 'B' || s === 'E'
    ? console.log('you got middle seat')
    : console.log('You are lucky');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('16D');

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix Capitalization in Name
const passenger = 'jOnAs';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// comparing Emails
const email = 'hello.jonas@io';
const loginEmail = '  HELLO.JONAS@Io  \n';

const emailLower = loginEmail.toLowerCase();
const trimmedEmail = emailLower.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);

// replacing
const priceGB = '288,97£';
console.log(priceGB);
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boardig door 23 !';

console.log(announcement.replace('door', 'gate'));

// using regex to replace all occurences of door with gate
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const flite = 'Airbus A320neo';
console.log(flite.includes('A320'));
console.log(flite.includes('boeing'));
console.log(flite.startsWith('Airb'));

if (flite.startsWith('Air') && flite.endsWith('neo'))
  console.log('Part of the airbus Family');

// Example
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('gun') || baggage.includes('knife'))
    console.log('Not allowed to Onboard');
  else console.log('Welcome to Onboarding');
};

checkBaggage('I have a gun for protection');
checkBaggage('I have a camera and some snacks');
checkBaggage('I have a Knife ');

console.log('a+very+nice+string'.split('+'));

const [firstName, lastName] = 'David Warner'.split(' ');
//console.log(firstName, lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('david warner');

// padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+'));
const namePlayer = 'David Warner';
console.log(namePlayer.padStart(30, '$$').padEnd(40, '$$'));

const maskCreditCard = function (creditCardNumber) {
  const str = creditCardNumber + '';
  const last4Digits = str.slice(-4);
  return last4Digits.padStart(str.length, '*');
};

console.log(maskCreditCard(467823));
console.log(maskCreditCard(345629080432678));

// Repeat
const message2 = 'Bad Weather... All Departures Delayed....  ';
console.log(message2.repeat(5));

// challenge

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
const text = document.querySelector('textarea').value;

document.querySelector('button').addEventListener('click', function () {
  const inputText = document.querySelector('textarea').value;
  const rows = inputText.split('\n');

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(15, ' ')}${'⚽️'.repeat(i + 1)}`);
  }
});

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const flightsSplitted = flights.split('+');
for (const i of flightsSplitted) {
  const [type, from, to, time] = i.split(';');
  console.log(
    `${type.slice(1).replace('_', ' ')} from ${from
      .slice(0, 3)
      .toUpperCase()} to ${to.slice(0, 3).toUpperCase()} (${time.replace(
      ':',
      'h'
    )})`.padStart(36, ' ')
  );
}
