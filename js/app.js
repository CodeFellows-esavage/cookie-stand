'use strict';
// console.log('app.js is linked');

function customerRange(min, max) {
    return max - min;
};

// function randHrlyCustomers() {
//     return Math.trunc(Math.random() * customerRange(this.minHrlyCust, this.maxHrlyCust) + 1) + this.minHrlyCust;
// };
Store.prototype.randHrlyCustomers = function() {
    return Math.trunc(Math.random() * customerRange(this.minHrlyCust, this.maxHrlyCust) + 1) + this.minHrlyCust;
};

// function estCookieSales(object) {
//    let cookieSales;
//    let dailySales = [];
//    let total = 0;
//    for (let i = 0; i <=  13; i += 1){
//     cookieSales = Math.round(object.randHrlyCustomers() * object.avgCustSale)
//     dailySales[i] = cookieSales;
//     total += cookieSales;
//    }
//    object.estDailySales = dailySales;
//    object.totalSales = total;
// };
Store.prototype.estCookieSales = function() {
    let cookieSales;
    let dailySales = [];
    let total = 0;
    for (let i = 0; i <=  13; i += 1){
     cookieSales = Math.round(this.randHrlyCustomers() * this.avgCustSale)
     dailySales[i] = cookieSales;
     total += cookieSales;
    }
    this.estDailySales = dailySales;
    this.totalSales = total;
 };

function locationLedger (object){
    // estCookieSales(object);
    const mainEl = document.querySelector('main');
    const sectionEl = document.createElement('section');
    mainEl.appendChild(sectionEl);
    sectionEl.setAttribute('class', 'ledger');

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

function Store (location, minHrlyCust, maxHrlyCust, avgCustSale, estDailySales, totalSales) {
    this.location = location,
    this.minHrlyCust = minHrlyCust,
    this.maxHrlyCust = maxHrlyCust,
    this.avgCustSale = avgCustSale,
    this.estDailySales = estDailySales,
    this.totalSales = totalSales,
    this.estCookieSales()
}

const seattleStore = new Store('Seattle', 23, 65, 6.3, [], 0);
const tokyoStore = new Store('Tokyo', 3, 24, 1.2, [], 0);
const dubaiStore = new Store('Dubai', 11, 38, 3.7, [], 0);
const parisStore = new Store('Paris', 20, 38, 2.3, [], 0);
const limaStore = new Store('Lima', 2, 16, 4.6, [], 0);
console.log(seattleStore.randHrlyCustomers());
console.log(seattleStore.randHrlyCustomers());
console.log(seattleStore.randHrlyCustomers());
console.log(seattleStore.randHrlyCust);
console.log(seattleStore.randHrlyCust);
console.log(seattleStore.randHrlyCust);
console.log(seattleStore.randHrlyCust);

locationLedger(seattleStore);
locationLedger(tokyoStore);
locationLedger(dubaiStore);
locationLedger(parisStore);
locationLedger(limaStore);


