/* eslint-disable new-cap */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import puppeteer from 'puppeteer';
const url = 'https://www.plus.nl/zoekresultaten?SearchTerm=';
const imageUrlFormatBegin = 'https://www.plus.nl/INTERSHOP/static/WFS/PLUS-Site/-/PLUS/nl_NL/product/M/';
const imageUrlFormatEnd = '.png';
import $ from 'cheerio';
import {IProductModel} from './models/product-model';

export class SupermarketScraper {
  constructor() {

  }
    productList: IProductModel[] = []

    async SearchProduct(SearchTerm: String): Promise<IProductModel[]> {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url + SearchTerm);
      await page.content();
      const bodyHandle = await page.$('body');
      const html = await page.evaluate((body: { innerHTML: any; }) => body.innerHTML, bodyHandle);
      this.ReadData(html);
      return this.productList;
    }

    ReadData(html: any) {
      const descriptions: string[] = [];
      const images: string[] = [];
      $('a.product-tile > div.product-tile__info > p.product-tile__description', html).each((i, elem) => {
        // Displays the product info
        descriptions[i] = $(elem).text();
      });
      $('div.prod-tile', html).each((i, elem) => {
        // Displays the product data
        images[i] = imageUrlFormatBegin + $(elem).attr('data-id') + imageUrlFormatEnd;
      });
      for (let index = 0; index < descriptions.length; index++) {
        const product: IProductModel = {
          description: descriptions[index],
          imgLink: images[index],
        };
        this.productList[index] = product;
      }
      return this.productList;
    };
}
