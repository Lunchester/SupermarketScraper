const puppeteer = require('puppeteer');
const url = 'https://www.plus.nl/zoekresultaten?SearchTerm=';
const imageUrlFormatBegin = 'https://www.plus.nl/INTERSHOP/static/WFS/PLUS-Site/-/PLUS/nl_NL/product/M/';
const imageUrlFormatEnd = '.png';
const $ = require('cheerio');
import { IProductModel } from "./models/product-model";

let productList: IProductModel[] = []

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
            var descriptions: string[] = [];
            var images: string[] = [];
            $('a.product-tile > div.product-tile__info > p.product-tile__description', html).each(function (i: number, elem: string) {
                //Displays the product info
                descriptions[i] = $(elem).text();
            });
            $('div.prod-tile', html).each(function (i: number, elem: string) {
                //Displays the product data
                images[i] = imageUrlFormatBegin + $(elem).attr('data-id') + imageUrlFormatEnd;
            });
            for (let index = 0; index < descriptions.length; index++) {
                //console.log(descriptions[index])
                //console.log(images[index])
                let product: IProductModel = {
                    description: descriptions[index],
                    imgLink: images[index]
                }
                productList[index] = product;
                console.log(productList);
            }
            return productList;
        })
        .catch(function (err: any) {
            console.log(err);
            return null;
        });
    return productList;
}
let result = RetrieveSearchInformation("brood");
console.log(result);