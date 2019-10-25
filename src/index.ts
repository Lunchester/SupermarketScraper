const rp = require('request-promise');
const cheerio = require("cheerio");

const plussearch = "https://www.plus.nl/zoekresultaten?SearchTerm=";

function getFull(search: string) {
    var searchres = plussearch + search;
    rp({uri :searchres, headers:{'User-Agent': 'Mozilla/5.0'}})
    .then(function (htmlString: any) {
        // Process html...
        console.log(htmlString);
    })
    .catch(function (err: any) {
        // Crawling failed...
        console.log(err);
    });
};

getFull("Boterham");