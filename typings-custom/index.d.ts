declare module 'supermarketscraper' {
    export class SupermarketScraper {
        SearchProduct(SearchTerm: String): Promise<IProductModel[]>;
        ReadData(html: any): any;
    }

    export interface IProductModel {
        description: String;
        imgLink: String
    }
}