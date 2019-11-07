const puppeteer = require('puppeteer');
const url = 'https://www.plus.nl/zoekresultaten?SearchTerm=';
const $ = require('cheerio');

function RetrieveSearchInformation(SearchTerm : String){
    puppeteer
    .launch()
    .then(function (browser: { newPage: () => void; }) {
        return browser.newPage();
    })
    .then(function (page: { goto: (arg0: string) => { then: (arg0: () => any) => void; }; content: () => void; }) {
        return page.goto(url + SearchTerm).then(function () {
            return page.content();
        });
    })
    .then(function (html: any) {
        $('a.product-tile > div.product-tile__info > p.product-tile__description', html).each(function (this :any) {
            //Displays the product info
            console.log($(this).text());
        });
    })
    .catch(function (err: any) {
        //handle error
    });
}

RetrieveSearchInformation("brood");