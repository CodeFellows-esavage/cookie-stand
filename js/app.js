'use strict';
// console.log('app.js is linked');

function customerRange(min, max) {
    return max - min;
};

Store.prototype.randHrlyCustomers = function() {
    return Math.trunc(Math.random() * customerRange(this.minHrlyCust, this.maxHrlyCust) + 1) + this.minHrlyCust;
};

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

Store.prototype.renderLedger = function (){
    const mainEl = document.querySelector('main');
    const sectionEl = document.createElement('section');
    mainEl.appendChild(sectionEl);
    sectionEl.setAttribute('class', 'ledger');

    const h2El = document.createElement('h2');
    sectionEl.appendChild(h2El);
    h2El.textContent = `${this.location}`;

    const ulEl = document.createElement('ul');
    sectionEl.appendChild(ulEl);
    for (let i = 0; i < this.estDailySales.length; i += 1){
        if (i < 6){
            const liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${i + 6}am: ${this.estDailySales[i]} cookies`;
            // console.log(ulEl.textContent);
        } else if (i === 6){
            const liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${i + 6}pm: ${this.estDailySales[i]} cookies`;
        } else {
            const liEl = document.createElement('li');
            ulEl.appendChild(liEl);
            liEl.textContent = `${i - 6}pm: ${this.estDailySales[i]} cookies`;
        }    
    }
    const liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `Total: ${this.totalSales}`;
};
// render to table
const tableHeader = ['6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', 'Daily Location Totals'];

function genTable(){
    const mainEl = document.querySelector('main');
    const sectionEl = document.createElement('section');
    mainEl.appendChild(sectionEl);
    sectionEl.setAttribute('class', 'ledgertabel');
    const tableEl = document.createElement('table');
    sectionEl.appendChild(tableEl);
    const theadEl = document.createElement('thead');
    tableEl.appendChild(theadEl);
    const trEl = document.createElement('tr');
    theadEl.appendChild(trEl);

    for(let i = -1; i < tableHeader.length; i += 1){
        if (i === -1){
            const thEl = document.createElement('th');
            trEl.appendChild(thEl);
        } else {
            const thEl = document.createElement('th');
            trEl.appendChild(thEl);
            thEl.setAttribute('scope', 'col');
            thEl.textContent = tableHeader[i];
        }
    }
}

Store.prototype.renderTableLedger = function (){
    const tableEl = document.querySelector('table');
    const trEl = document.createElement('tr');
    tableEl.appendChild(trEl);

    for (let i = -1; i <= this.estDailySales.length; i += 1){
        if (i === -1){
            const thEl = document.createElement('th');
            trEl.appendChild(thEl);
            thEl.setAttribute('scope', 'row');
            thEl.textContent = this.location;
        } else if (i >= 0 && i < this.estDailySales.length){
            const tdEl = document.createElement('td');
            trEl.appendChild(tdEl);
            tdEl.textContent = this.estDailySales[i];
        } else {
            const tdEl = document.createElement('td');
            trEl.appendChild(tdEl);
            tdEl.textContent = this.totalSales;
        }
    }     
};



function genTableFooter(objectArray){
    const tableEl = document.querySelector('table');
    const tfootEl = document.createElement('tfoot');
    tableEl.appendChild(tfootEl);
    const trEl = document.createElement('tr');
    tfootEl.appendChild(trEl);
    let grandTotal = 0;

    for (let i = -1; i < tableHeader.length; i += 1){
        if (i === -1){
            const thEl = document.createElement('th');
            trEl.appendChild(thEl);
            thEl.setAttribute('scope', 'row');
            thEl.textContent = "Totals";
        } else if (i >= 0 && i < tableHeader.length - 1){
            let hourTotal = 0;
            for (let j = 0; j < objectArray.length; j += 1){
                hourTotal += objectArray[j].estDailySales[i];
                console.log(objectArray[j].estDailySales[i]);
                console.log(hourTotal); 
            }
            const tdEl = document.createElement('td');
            trEl.appendChild(tdEl);
            tdEl.textContent = hourTotal;
            grandTotal += hourTotal;
        } else {
            const tdEl = document.createElement('td');
            trEl.appendChild(tdEl);
            tdEl.textContent = grandTotal;
        }
    }
}



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
const storeLocations = [seattleStore, tokyoStore, dubaiStore, parisStore, limaStore];
// seattleStore.renderLedger();
// tokyoStore.renderLedger();
// dubaiStore.renderLedger();
// parisStore.renderLedger();
// limaStore.renderLedger();

genTable();
seattleStore.renderTableLedger();
tokyoStore.renderTableLedger();
dubaiStore.renderTableLedger();
parisStore.renderTableLedger();
limaStore.renderTableLedger();
genTableFooter(storeLocations);

console.log(storeLocations[0].estDailySales[0]);
console.log(storeLocations[1].estDailySales[0]);
console.log(storeLocations[2].estDailySales[0]);
console.log(storeLocations[3].estDailySales[0]);
console.log(storeLocations[4].estDailySales[0]);