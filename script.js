'use strict';

const quoteContainer = document.getElementById('quote-container');
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newBtn = document.getElementById('new-btn');
const loader = document.getElementById('loader');

let dataArr = [];

const loading = function(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
const nonLoad = function(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

const randomIndex = () =>{
    loading();
    const quotes = dataArr[Math.floor(Math.random() * dataArr.length)];
    quote.textContent = quotes.text;
    author.textContent = quotes.author;
// console.log(quotes);
    if(quotes.text.length < 60){
        quote.classList.add('short-quote');
    }else{
        quote.classList.remove('short-quote');
    }

    if(!quotes.author){
        author.textContent = 'Anonymous';
    }else{
        author.textContent = quotes.author;
    }
    nonLoad();
}
newBtn.addEventListener('click',randomIndex);
async function quoteGenerator(){
    loading();
    const data = 'https://type.fit/api/quotes';
    try{
        const getData = await fetch(data);
        dataArr = await getData.json();
        randomIndex();
    }catch(error){
    }
}
quoteGenerator();
