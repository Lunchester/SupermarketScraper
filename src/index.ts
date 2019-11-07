const puppeteer = require('puppeteer');
const url = 'https://www.plus.nl/zoekresultaten?SearchTerm=';
const imageUrlFormatBegin = 'https://www.plus.nl/INTERSHOP/static/WFS/PLUS-Site/-/PLUS/nl_NL/product/M/';
const imageUrlFormatEnd = '.png';
const $ = require('cheerio');
import { IProductModel } from "./models/product-model";

var productList: IProductModel[] = [];

function RetrieveSearchInformation(SearchTerm: String): IProductModel[] {
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
            $('a.product-tile > div.product-tile__info > p.product-tile__description', html).each(function (this: any) {
                //Displays the product info
                // = $(this).text();
                console.log($(this).text());
            });
            $('div.prod-tile', html).each(function (this: any) {
                //Displays the product info
                console.log(imageUrlFormatBegin + $(this).attr('data-id') + imageUrlFormatEnd);
            });
            return productList;
        })
        .catch(function (err: any) {
            //handle error
            return null;
        });
    return productList;
}
RetrieveSearchInformation("brood");