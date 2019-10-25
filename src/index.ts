const request = require("request");
const cheerio = require("cheerio");

const plussearch = "https://www.plus.nl/zoekresultaten?SearchTerm=Boterham";

function getFull(callback: any) {
    request.get(plussearch, function (
        error: any,
        response: any,
        data: any
    ) {
        const $ = cheerio.load(data);
        callback(error, {
            story: $("")
                .text()
                .trim()
        });
        console.log($.html());
    });
}