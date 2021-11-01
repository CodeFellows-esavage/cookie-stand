'use strict';
console.log('app.js is linked');

function customerRange(min, max) {
    return max - min;
};

function randHrlyCustomers() {
    return Math.trunc(Math.random() * customerRange(this.minHrlyCust, this.maxHrlyCust) + 1) + this.minHrlyCust;
};

function estCookieSales(object) {
   let cookieSales;
   let dailySales = [];
   let total = 0;
   for (let i = 0; i <=  13; i += 1){
    cookieSales = Math.round(object.randHrlyCust() * object.avgCustSale)
    dailySales[i] = cookieSales;
    total += cookieSales;
   }
   object.estDailySales = dailySales;
   object.totalSales = total;
};

function locationLedger (object){
    estCookieSales(object);
    const mainEl = document.querySelector('main');
    const sectionEl = document.createElement('section');
    mainEl.appendChild(sectionEl);

    const h2El = document.createElement('h2');
    sectionEl.appendChild(h2El);
    h2El.textContent = `${object.location}`;

    const ulEl = document.createElement('ul');
    sectionEl.appendChild(ulEl);
    for (let i = 0; i < object.estDailySales.length; i += 1){
        if (i < 6){
            const liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${i + 6}am: ${object.estDailySales[i]} cookies`;
            // console.log(ulEl.textContent);
        } else if (i === 6){
            const liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${i + 6}pm: ${object.estDailySales[i]} cookies`;
        } else {
            const liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${i - 6}pm: ${object.estDailySales[i]} cookies`;
        }    
    }
    const liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `Total: ${object.totalSales}`;
};

const seattle = {
    location: 'Seattle',
    minHrlyCust: 23,
    maxHrlyCust: 65,
    avgCustSale: 6.3,
    randHrlyCust: randHrlyCustomers,
    estDailySales: [],
    totalSales: 0,
};

const tokyo = {
    location: 'Tokyo',
    minHrlyCust: 3,
    maxHrlyCust: 24,
    avgCustSale: 1.2,
    randHrlyCust: randHrlyCustomers,
    estDailySales: [],
    totalSales: 0,
};

const dubai = {
    location: 'Dubai',
    minHrlyCust: 11,
    maxHrlyCust: 38,
    avgCustSale: 3.7,
    randHrlyCust: randHrlyCustomers,
    estDailySales: [],
    totalSales: 0,
};

const paris = {
    location: 'Paris',
    minHrlyCust: 20,
    maxHrlyCust: 38,
    avgCustSale: 2.3,
    randHrlyCust: randHrlyCustomers,
    estDailySales: [],
    totalSales: 0,
};

const lima = {
    location: 'Lima',
    minHrlyCust: 2,
    maxHrlyCust: 16,
    avgCustSale: 4.6,
    randHrlyCust: randHrlyCustomers,
    estDailySales: [],
    totalSales: 0,
};

//Start writing into the DOM:
locationLedger(seattle);
locationLedger(tokyo);
locationLedger(dubai);
locationLedger(paris);
locationLedger(lima);


