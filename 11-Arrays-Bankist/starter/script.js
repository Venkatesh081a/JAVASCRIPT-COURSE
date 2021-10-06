'use strict';
// if (typeof document !== 'undefined') {
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// starting

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // sorting in Ascending order
  const sortedMovements = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  sortedMovements.forEach(function (movement, index) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
        <div class="movements__value">${movement}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUserNames = function (accnts) {
  accnts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

const calculateandDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (accum, currentValue) => accum + currentValue,
    0
  );
  labelBalance.textContent = `${account.balance}€`;
};

const calculateDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = account.movements
    .filter(movement => movement < 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = account.movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function (account) {
  // Display Movements
  displayMovements(account.movements);
  // Display Balance
  calculateandDisplayBalance(account);
  // Display Summary
  calculateDisplaySummary(account);
};

// Implementing Login
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent the form from submitting
  e.preventDefault();
  currentAccount = accounts.find(function (account) {
    return account.username === inputLoginUsername.value;
  });
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display welcome message and UI
    labelWelcome.textContent = `Welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields after login
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    // to loose focus
    inputLoginPin.blur();
    // updating the UI
    updateUI(currentAccount);
  } else if (currentAccount?.pin.value !== Number(inputLoginPin.value)) {
    alert(`Wrong Pin Entered , please try again`);
  } else {
    containerApp.style.opacity = 0;
    alert(
      `Oops ! , user with name  ${inputLoginUsername.value}  doesn't exists !`
    );
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(function (account) {
    return account.username === inputTransferTo.value;
  });
  // clearing the input fields
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Updating the UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const loanAmount = inputLoanAmount.value;

  const allDeposits = movements.filter(function (value) {
    return value > 0;
  });
  let tenPercentOfLoanRequest;
  if (loanAmount > 0) {
    tenPercentOfLoanRequest = (loanAmount * 10) / 100;
  }
  const anyDeposit = allDeposits.some(function (value, index, arr) {
    return value > tenPercentOfLoanRequest;
  });

  if (anyDeposit) {
    currentAccount.movements.push(loanAmount);
    updateUI(currentAccount);
  }
  // clearing the input field value
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const Index = accounts.findIndex(function (account) {
      return account.username === currentAccount.username;
    });

    // Delete the account
    accounts.splice(Index, 1);
    // clearing the input fields
    (inputCloseUsername.value = ''), (inputClosePin.value = '');
    // Hide the UI
    containerApp.style.opacity = 0;
  }
});

let sortedState = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Array Methods
//--------------------------------------------------
// SLICE : Does not changes the original Array
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

// SPLICE : Similar to SLICE , but SPLICE changes the original array
console.log(arr.splice(2));
console.log(arr);

// REVERSE : changes the original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);

//Join
console.log(arr2.join('-'));

// Looping Arrays : foreach
const movements1 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// using for of loop
for (const [i, movement] of movements1.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: you deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movement)}`);
  }
}

// using foreach loop
console.log('----- FOR EACH -----');
movements1.forEach(function (movement, index, arr) {
  if (movement > 0) {
    console.log(`Movement ${index + 1}: you deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: you withdrew ${Math.abs(movement)}`);
  }
});

// foreach with Maps and Sets
const currencies1 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies1.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

const currenciesUnique = new Set(['USD', 'EUR', 'GBP', 'USD', 'GBP']);
currenciesUnique.forEach(function (value, key, set) {
  console.log(`${value}`);
});

// challenge

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrect = dogsJulia.slice();
  dogsJuliaCorrect.splice(0, 1);
  dogsJuliaCorrect.splice(-2);
  const dogs = dogsJuliaCorrect.concat(dogsKate);
  dogs.forEach(function (value, index, arr) {
    if (value >= 3) {
      console.log(
        `Dog number ${index + 1} is an adult , and is ${value} years old`
      );
    } else {
      console.log(`Dog number ${index + 1} is still a puppy`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 5, 8, 3]);

/* Data Transformations : Map , Filter , Reduce 
-----------------------------------------------------------------
MAP : Map returns a "new array" containing the results of "applying an operation" on 
all original array elements.

FILTER : Filter returns a "new array" containing the array elements that passed a
"specific test condition".

REDUCE : Reduce boils(reduces) all the array elements down to one single value.

*/

// MAP
const testArray = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroTOusd = 1.1;

const testArrayUsd = testArray.map(function (value, index, arr) {
  return value * euroTOusd;
});
console.log(testArray);
console.log(testArrayUsd);

const testArrayUsd1 = testArray.map(value => value * euroTOusd);
console.log(testArray);
console.log(testArrayUsd1);

const movementDescription = testArray.map(
  (movement, index, arr) =>
    `Movement ${index + 1}: you ${
      movement > 0 ? 'deposited' : 'withdrew'
    } ${movement}`
);

console.log(movementDescription);

// const user = 'Steven Thomas Williams';
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(name => name[0])
//   .join('');

// console.log(username);
console.log(accounts);

// filter method
const testArray1 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = testArray1.filter(function (value, index, arr) {
  return value > 0;
});

console.log(testArray1);
console.log(deposits);

// reduce method
const testArray2 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const balance = testArray2.reduce(function (accumulator, value, index, arr) {
  console.log(`Iteration ${index}: ${accumulator}`);
  return accumulator + value;
}, 0);

//console.log(balance);

// To find Max value in array using reduce
const testArray3 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const maxEle = testArray3.reduce(function (acc, cur) {
  if (acc > cur) {
    return acc;
  } else {
    return cur;
  }
}, testArray3[0]);

console.log(maxEle);

// challenge
const calcAverageHumanAge = function (agesArray) {
  const humanAges = agesArray
    .map(function (age) {
      if (age <= 2) {
        return 2 * age;
      } else if (age > 2) {
        return 16 + age * 4;
      }
    })
    .filter(function (personage) {
      return personage >= 18;
    })
    .reduce(function (accum, currentValue, index, arr) {
      return accum + currentValue / arr.length;
    }, 0);
  return humanAges;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// using Arrow functions
const calcAverageHumanAge1 = agesArray =>
  agesArray
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(personage => personage >= 18)
    .reduce(
      (accum, currentValue, index, arr) => accum + currentValue / arr.length,
      0
    );

console.log(calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]));

// Find Method : Find method returns the first element that matches the specified condition
const firstWithdrawal = movements.find(function (movement) {
  return movement < 0;
});
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(function (account) {
  return account.owner === 'Steven Thomas Williams';
});
console.log(account);

/* FindIndex Method : Similar to "find" method, but find method returns the element 
where as findIndex method returns the Index at which the element was found.
 */

// some and every methods
//----------------------------------
// SOME : returns true if any one of the elements in the array passed the specific condition.
console.log(movements);
// Equality
console.log(movements.includes(-130));

// Condition
const anyDeposits = movements.some(function (value, index, arr) {
  return value > 1500;
});
console.log(anyDeposits);

// EVERY : return true if all the elements in the array passed the specific condition.
const allamount = movements.every(function (value) {
  return value > 0;
});
console.log(allamount);

// Flat and FlatMap

// flat : Flatterns the array , the defalut is one level of nesting , we can change accordingly
const nestedArr = [[1, 2, 3], 4, 5, [6, 7]];
console.log(nestedArr.flat());

const nestedArrDeep = [[1, 2, 3, [4, 5]], 6, [7, [8]]];
console.log(nestedArrDeep.flat(2));

const accountMovements = accounts.map(function (account) {
  return account.movements;
});
console.log(accountMovements);

const allMovements = accountMovements.flat();
console.log(allMovements);
const totalAmount = allMovements.reduce(function (
  accumulator,
  value,
  index,
  arr
) {
  return accumulator + value;
},
0);
console.log(totalAmount);

// flat : using chaining
const overAllBalance = accounts
  .map(account => account.movements)
  .flat()
  .reduce((accumulator, value) => accumulator + value, 0);
console.log(overAllBalance);

// flatMap : flatMap only goes one level deep and flatterns the array , if we want more levels , then we need to use flat method only
const overAllBalance1 = accounts
  .flatMap(account => account.movements)
  .reduce((accumulator, value) => accumulator + value, 0);
console.log(overAllBalance1);

// Sorting Arrays

// strings
const owners = ['jonas', 'jack', 'david', 'smith'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0 -> A , B (keep the order)
// return > 0 -> B , A (switch the order)
// Ascending order
movements.sort(function (a, b) {
  if (a > b) return 1;

  if (a < b) return -1;
});
// movements.sort(function (a, b) {
// return a - b;
// });
console.log(movements);

// Descending order
movements.sort(function (a, b) {
  if (a > b) return -1;

  if (a < b) return 1;
});
// movements.sort(function (a, b) {
// return b - a;
// });
console.log(movements);

// creating and filling the arrays programatically
const arr4 = [1, 2, 3, 4, 5];
console.log(arr4);
console.log(new Array(1, 2, 3, 4, 5, 6));

// Empty Array + fill
const x = new Array(7);
console.log(x);
x.fill(10);
console.log(x);
x.fill(20, 3, 5); // specifying the start and end elements
console.log(x);

// Array.from
const y = Array.from({ length: 7 }, () => 90);
console.log(y);

const z = Array.from({ length: 7 }, (value, index) => index + 1);
console.log(z);

// real use case of Array.from
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    value => Number(value.textContent.replace('€', ''))
  );

  // const mappingArr = movementsUI.map(function (value) {
  //   return value.textContent.replace('€', '');
  // });

  console.log(movementsUI);

  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementsUI2);
});

// Array methods practice
const bankDeposits = accounts
  .flatMap(acc => acc.movements)
  .filter(movement => movement > 0)
  .reduce((accum, curValue) => accum + curValue);
console.log(bankDeposits);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(movement => movement >= 1000).length;
console.log(numDeposits1000);

// convert titlecase

const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titleCase;
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));

// challenge
// Test Data
const dogs = [
  {
    weight: 22,
    curFood: 250,
    owners: ['Alice', 'Bob'],
  },
  {
    weight: 8,
    curFood: 200,
    owners: ['Matlida'],
  },
  {
    weight: 13,
    curFood: 275,
    owners: ['Sarah', 'John'],
  },
  {
    weight: 32,
    curFood: 340,
    owners: ['Michale'],
  },
];

//1.
dogs.forEach(
  i => (i.recommendedFoodPortion = Math.trunc(i.weight ** 0.75 * 28))
);

//console.log(dogs);

//2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recommendedFoodPortion ? 'Much' : 'Little'
  }`
);

console.log(dogs);

// const ownersEatTooMuch = [];
// const ownersEatTooLittle = [];
// dogs.forEach(function (dog) {
//   dog.curFood > dog.recommendedFoodPortion
//     ? ownersEatTooMuch.push(dog.owners)
//     : ownersEatTooLittle.push(dog.owners);
// });
// console.log(ownersEatTooMuch.flat());
// console.log(ownersEatTooLittle.flat());

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFoodPortion)
  .flatMap(owner => owner.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFoodPortion)
  .flatMap(owner => owner.owners);
console.log(ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5
console.log(
  dogs.filter(dog => dog.recommendedFoodPortion === dog.curFood).length > 0
    ? true
    : false
);
// 5
console.log(dogs.some(dog => dog.recommendedFoodPortion === dog.curFood));

// 6

const checkEatingOk = dog =>
  dog.curFood > dog.recommendedFoodPortion * 0.9 &&
  dog.curFood < dog.recommendedFoodPortion * 1.1;

console.log(dogs.some(checkEatingOk));

// 7
console.log(dogs.filter(checkEatingOk));

// 8
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFoodPortion - b.recommendedFoodPortion);

console.log(dogsSorted);
