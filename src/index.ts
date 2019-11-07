const puppeteer = require('puppeteer');
const url = 'https://www.plus.nl/zoekresultaten?SearchTerm=';
const imageUrlFormatBegin = 'https://www.plus.nl/INTERSHOP/static/WFS/PLUS-Site/-/PLUS/nl_NL/product/M/';
const imageUrlFormatEnd = '.png';
const $ = require('cheerio');
import { IProductModel } from "./models/product-model";

let productList: IProductModel[] = []

async function RetrieveSearchInformation(SearchTerm: String): Promise<IProductModel[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url + SearchTerm);
    await page.content();
    const bodyHandle = await page.$('body');
    const html = await page.evaluate((body: { innerHTML: any; }) => body.innerHTML, bodyHandle);
    await ReadData(html);
    return productList;
}

function ReadData(html: any) {
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
    }
    return productList;
};
let result = RetrieveSearchInformation("brood");
result.then(function (result) {
    console.log(result);
})