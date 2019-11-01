const puppeteer = require('puppeteer');
const url = 'https://www.plus.nl/zoekresultaten?SearchTerm=brood';
const $ = require('cheerio');

puppeteer
    .launch()
    .then(function (browser: { newPage: () => void; }) {
        return browser.newPage();
    })
    .then(function (page: { goto: (arg0: string) => { then: (arg0: () => any) => void; }; content: () => void; }) {
        return page.goto(url).then(function () {
            return page.content();
        });
    })
    .then(function (html: any) {
        $('a.product-tile', html).each(function (this :any) {
            console.log($(this).text());
        });
    })
    .catch(function (err: any) {
        //handle error
    });