'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data) {
  const html = `
      <article class="country">
          <img class="country__img" src="${data.flags['png']}" />
          <div class="country__data">
          <h3 class="country__name">${data.name['common']}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${data.languages['amh']}</p>
          <p class="country__row"><span>💰</span>${
            data.currencies['ETB']['name']
          }</p>
          </div>
      </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry1 = function (data, className = '') {
  const html = `
  <article class="country ${className}">
     <img class="country__img" src="${data.flags['png']}" />
     <div class="country__data">
     <h3 class="country__name">${data.name['common']}</h3>
     <h4 class="country__region">${data.region}</h4>
     <p class="country__row"><span>👫</span>${(
       +data.population / 10000
     ).toFixed(1)}</p>
     <p class="country__row"><span>🗣️</span>${data.languages['ara']}</p>
     <p class="country__row"><span>💰</span>${
       data.currencies['DJF']['name']
     }</p>
     </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  //   countriesContainer.style.opacity = 1;
};

const renderErr = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // render country 1
//     renderCountry(data);

//     // render neghibour country
//     const [neghibour] = data.borders;

//     if (!neghibour) return;
//     //AJAX call country

//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neghibour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry1(data2, 'neghibour');
//     });
//   });
// };
// getCountryData('ethiopia');

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     .then(function (body) {
//       renderCountry(body[0]);
//       const neghibour = body[0].borders[0];
//       if (!neghibour) return;

//       return fetch(`https://restcountries.com/v3.1/alpha/${neghibour}`);
//     })
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry1(data[0]);
//     })
//     .catch(function (err) {
//       console.error(`${err}`);
//       renderErr(`Something went wrong ${err.message}. Try again.`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('ethiopia');
// });

const getJSON = function (url, getMsg = 'Something went wrong') {
  return fetch(url).then(function (response) {
    if (!response.ok) throw new Error(`Country not found (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  return getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    ' Country not found'
  )
    .then(function (body) {
      renderCountry(body[0]);
      const neghibour = body[0].borders[0];
      if (!neghibour) return;

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neghibour}`,
        'Country not found.'
      );
    })

    .then(function (data) {
      console.log(data);
      renderCountry1(data[0]);
    })
    .catch(function (err) {
      console.error(`${err}`);
      renderErr(`Something went wrong ${err.message}. Try again.`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('ethiopia');
});
