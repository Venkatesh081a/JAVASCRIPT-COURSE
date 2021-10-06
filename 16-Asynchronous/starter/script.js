'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*  Asynchronous JavaScript and AJAX calls
-----------------------------------------------------------------------

Synchronous Javascript :  It means the code is executed line by line and each line waits for
the previous line to finish execution. This can create problems if one line of code
takes long time to run

Asynchronous JavaScript : It is executed after a task that runs in the "background" finishes.

Asynchronous code is non-blocking . Execution does not wait for asynchronous task to finish
its work.


AJAX :  Asynchronous JavaScript and XML , Ajax allows us to communicate with the 
remote webservers in an asynchronous way. With Ajax calls we can request data from 
webservers dynamically

 */

// AJAX CALLS to fetch Data from online webapis and use that data in our code
//==================================================================================

function getCountryData(data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} M</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}
//
// function getCountryAndNeighbour(country) {
//   // AJAX call country1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(request.responseText);
//     const [data] = JSON.parse(request.responseText);
//     // console.log(data);
//     // get country 1
//     getCountryData(data);

//     // get neighbour country 2
//     const [neighbour] = data.borders;
//     // console.log(neighbour);
//     if (!neighbour) return;

//     // AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data = JSON.parse(request2.responseText);
//       getCountryData(data, 'neighbour');
//     });
//   });
// }

// getCountryAndNeighbour('usa');

/* ==================================================================================
    PROMISES and FETCH API in JavaScript :
    -----------------------------------------
    1) Instead of using AJAX call to get 3rd party data , we can use FETCH API .
    
    2) A Promise is an Object that is used as an PlaceHolder for the Future result of
    Asynchronous Operation.
    3)Simply , A Promise is a container for a future value.

    Advantages of Promises :
    -----------------------------
    4) We no longer need to rely on events and callbacks passed into asynchronous functions
    to handle asynchronous results.
    5) Instead of nesting callbacks, we can Chain Promises for a sequence of asynchronous
    operations.

LifeCycle of Promises:
----------------------------------------------------------------------------
1) PENDING --- Before the Future Value is available.
During the Pending state , the Async Task is still doing it's work in the background 
and when the task finally finishes the promise state is changed to SETTLED
2) SETTLED --- Async Task has Finished
 There are two types of SETTLED PROMISES :
  i) FULLFILLED Promises  ----- successfully resulted in a value as expected.
  ii) REJECTED Promises   ----- An Error happened.

======================================================================================
*/

/* Consuming PROMISES 
--------------------------------------
We can build a promise , or we can consume it by using fetch api

If a promise is successfull , we can handle it by using "then"

we need to use ".json" on the promise in order to get the data

At the end of "then" method we should always "RETURN THE PROMISE" using "return"
*/

// const getCountry = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       getCountryData(data[0]);
//     });
// };

// const getCountry = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => response.json())
//     .then(data => getCountryData(data[0]));
// };

//getCountry('portugal');

/* Chanining Promises  and Handling  REJECTED PROMISES 
----------------------------------------------------------------------
we can return a promise from then function and can call another then function on the
returned promise object and can call another then method on it and so on is called
Chaining promises.

we can use "Catch" method to handle the errors. 
We can use one Catch method at the end of promise chain , it will any errors occured
in between the promise chain also.

we can also throw errors manually using "throw" clause.
-----------------------------------------------------
*/
// const getCountryAndNeighbour = function (country) {
//   // fetching country
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found !`);
//       return response.json();
//     })
//     .then(data => {
//       getCountryData(data[0]);
//       // const [neighbour] = data[0].borders;
//       const neighbour = 'venkatesh';
//       if (!neighbour) return;
//       // fetching neighbour country for given country
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error('No Neigbour country found');
//       return res.json();
//     })
//     .then(result => getCountryData(result, 'neighbour'))
//     .catch(error => console.log(error.message));
// };

function getJson(url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);
    return response.json();
  });
}
const getCountryAndNeighbour = function (country) {
  // fetching country
  getJson(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country Not Found'
  )
    .then(data => {
      getCountryData(data[0]);
      const [neighbour] = data[0].borders;

      if (!neighbour) throw new Error('No Neighbour Found !');
      // fetching neighbour country for given country
      return getJson(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country Not Found'
      );
    })
    .then(result => getCountryData(result, 'neighbour'))
    .catch(error => console.log(error.message));
};

// //getCountryAndNeighbour('portugal');
// btn.addEventListener('click', function () {
//   getCountryAndNeighbour('Portugal');
//   // getCountryAndNeighbour('australia');
//   // getCountryAndNeighbour('dddd');
// });

// function whereAmI(latitude, longitude) {
//   fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
//     .then(response => {
//       //console.log(response);
//       if (!response.ok)
//         throw new Error(`Problem in Geocode API ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       getCountryData(data[0]);
//     })
//     .catch(error => console.log(error.message));
// }

// btn.addEventListener('click', function () {
//   whereAmI(52.508, 13.381);
//   whereAmI(19.037, 72.873);
//   whereAmI(-33.933, 18.474);
// });

// EVENT LOOP Handling
// console.log('Test Start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('Test End');

/*  Building our own Promise  
---------------------------------------------------
*/
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery Draw is happening');
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('You Win ');
    } else {
      reject(new Error('You Lost your Money'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(error => console.log(error));

// Promisifying the GeoLocation API
//---------------------------------------------------------------------------

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   error => console.log(error)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error)
    );
  });
};

// getPosition()
//   .then(pos => console.log(pos))
//   .catch(err => console.log(err.message));

function whereAmI() {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: long } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    })
    .then(response => {
      //console.log(response);
      if (!response.ok)
        throw new Error(`Problem in Geocode API ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      getCountryData(data[0]);
    })
    .catch(error => console.log(error.message));
}

// btn.addEventListener('click', whereAmI);

//document.body.style.backgroundImage = 'url(./img/img-1.jpg)';

const wait = function (seconds) {
  new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imageContainer = document.querySelector('.images');
const createImage = function (path) {
  return new Promise(function (resolve, reject) {
    const newImage = document.createElement('img');
    newImage.src = path;

    newImage.addEventListener('load', function () {
      imageContainer.append(newImage);
      resolve(newImage);
    });

    newImage.addEventListener('error', function () {
      reject(new Error('Error occured while loading the Image'));
    });
  });
};

let currentImage;
// createImage('img/img-1.jpg')
//   .then(Img => {
//     currentImage = Img;
//     console.log('Image1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(Img => {
//     currentImage = Img;
//     console.log('Image2 loaded');
//     return wait(2);
//   })
//   .then(() => (currentImage.style.display = 'none'))
//   .catch(error => console.log(error));

// getPosition().then(pos => {
//   const { latitude: lat, longitude: long } = pos.coords;
//   return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
// });

/*  Consuming PROMISES with Async/Await
-----------------------------------------------------------------------------------
we need to use 'async' keyword infront of a function , to make it asynchronous.
Instead of using "then" to hanlde a promise , we can use "await" , await simply blocks
the asynchronous code in background and waits for the response from fetch api, once the 
response (promise) is returned from fetch api , then we can store it in a variable.

So , by using async/await , we don't need to use "then" in order to chain multiple 
promises , promise chaining will become easy.

Handling errors while using async/await  using try catch block
----------------------------------------------------------------------
we cannot use Catch block and attach it while we are consuming promises using 
async/await.
we need to handle the errors using try catch block

 */
const countryDetails = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: long } = pos.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
    if (!resGeo.ok) throw new Error('Error getting Location Details');
    const dataGeo = await resGeo.json();
    console.log(dataGeo);
    const response = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!response.ok) throw new Error('Error getting Country Details');
    const data = await response.json();
    getCountryData(data[1]);
  } catch (error) {
    console.log(error.message);
  }
};

countryDetails();
console.log('First');

// Getting covid data using async/await
const covidData = async function (country) {
  try {
    const response = await fetch(
      `https://covid-api.mmediagroup.fr/v1/cases?country=${country}`
    );
    if (!response.ok) throw new Error('Error in Fetching Country Details');
    const data = await response.json();
    const { lat, long } = data.Karnataka;
    const karnatakaRes = await fetch(
      `https://geocode.xyz/${lat},${long}?geoit=json`
    );
    if (!karnatakaRes.ok) throw new Error('Error in Fetching State Details');
    const karnatakaData = await karnatakaRes.json();
    //returning data from asyc functions
    return `you are in ${karnatakaData.region}`;
  } catch (error) {
    console.log(error.message);
  }
};

// covidData('India');

// Returning Values from Async functions
//-------------------------------------------------------------------------
console.log('1 : will fetch covid country details');
// const city = covidData('India');
// console.log(city);
// covidData('India')
//   .then(city => console.log(`2: ${city}`))
//   .catch(error => console.log(`2: ${error}`))
//   .finally(() => console.log('3: will fetch covid state details'));

(async function () {
  try {
    const city = await covidData('India');
    console.log(`2: ${city}`);
  } catch (error) {
    console.log(`2: ${error}`);
  }
  console.log('3: will fetch covid state details');
})();

/*  Running Promises in SEQUENCE
------------------------------------------------------------ 
*/
const get3Countries = async function (c1, c2, c3) {
  try {
    const response1 = await fetch(
      `https://restcountries.eu/rest/v2/name/${c1}`
    );
    if (!response1.ok) throw new Error('Error Fetching country1 Details');
    const [countryData1] = await response1.json();
    const response2 = await fetch(
      `https://restcountries.eu/rest/v2/name/${c2}`
    );
    if (!response2.ok) throw new Error('Error Fetching country2 Details');
    const [countryData2] = await response2.json();
    const response3 = await fetch(
      `https://restcountries.eu/rest/v2/name/${c3}`
    );
    if (!response3.ok) throw new Error('Error Fetching country3 Details');
    const [countryData3] = await response3.json();
    console.log([
      countryData1.capital,
      countryData2.capital,
      countryData3.capital,
    ]);
  } catch (error) {
    console.log(error);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

/* Running PROMISES in PARALLEL
-----------------------------------------------------------------------------
In the abouve "get3Countries" , we are running the 3 promises in sequence (one after 
  the other) even though  , one is not dependent on other.

  Promise.all() Combinator :
--------------------------------------------------------
we can RUn promises in Parallel using "Promise.all()".
 Inside promise.all() , we can pass an array of promises that we want to run then promise.all(Arrayofpromises) runs 
all the promises at the same time and return a new promise
*/

async function getJsonDataAsync(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Error in fetching Details');
  const data = await response.json();
  return data;
}

const get3CountriesParallel = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJsonDataAsync(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJsonDataAsync(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJsonDataAsync(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    //console.log(data);
    console.log(data.map(d => d[0].capital));
  } catch (error) {
    console.log(error);
  }
};

get3CountriesParallel('portugal', 'canada', 'tanzania');

/* Other Promise Combinators
-----------------------------------------------------------------------------
Promise.race()
---------------------------------------------
Promise.race() receives an array of promises and returns a promise. 
The promise returned by promise.race() gets settled(either fullfilled or rejected) , 
if any one of the input promise gets settled(either fullfilled or rejected).
*/

(async function () {
  const result = await Promise.race([
    getJsonDataAsync(`https://restcountries.eu/rest/v2/name/mexico`),
    getJsonDataAsync(`https://restcountries.eu/rest/v2/name/italy`),
    getJsonDataAsync(`https://restcountries.eu/rest/v2/name/egypt`),
  ]);
  console.log(result[0]);
})();

// promise that will reject a request after some amount of time
function timeout(seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('request took too long'));
    }, seconds * 1000);
  });
}

async function getDetails() {
  try {
    const response = await Promise.race([
      getJsonDataAsync(`https://restcountries.eu/rest/v2/name/tanzania`),
      timeout(1),
    ]);
    if (!response.ok) throw new Error('Error while fetching Country details');
    // const data = await response.json();
    console.log(response[0]);
  } catch (error) {
    console.log(error);
  }
}

console.log(getDetails());

/* Promise.allSettled() 
-------------------------------------------------------------------------
It takes an array of promises and return an array of all the settled promises ,
no matter whether the promise got fulfilled or rejected.
*/
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

/* Promise.any() 
----------------------------------------------------------
It takes in array of multiple promises and it will return the first fullfilled promise.
and ignores the rejected promises.
*/
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));

// Coding Challenge
//---------------------------------------------------------------------------

async function loadAll(imagesPath) {
  try {
    const imgs = imagesPath.map(async Image => await createImage(Image));
    //console.log(Image);
    const imgElements = await Promise.all(imgs);
    console.log(imgElements);
    imgElements.forEach(img => img.classList.add('parallel'));
  } catch (error) {
    console.log(error);
  }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

// let currentImage;
// createImage('img/img-1.jpg')
//   .then(Img => {
//     currentImage = Img;
//     console.log('Image1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(Img => {
//     currentImage = Img;
//     console.log('Image2 loaded');
//     return wait(2);
//   })
//   .then(() => (currentImage.style.display = 'none'))
//   .catch(error => console.log(error));

async function loadNPause() {
  try {
    // Load Image-1
    let Img = await createImage('img/img-1.jpg');
    console.log('Image1 loaded');
    await wait(2);
    Img.style.display = 'none';

    // Load Image-2
    Img = await createImage('img/img-2.jpg');
    console.log('Image2 loaded');
    await wait(2);
    Img.style.display = 'none';
  } catch (error) {
    console.log(error);
  }
}
