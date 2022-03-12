const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");
// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};
// URL for data
const URL = "https://www.montlimart.com/polos-t-shirts.html";
// start of the program
const scrapeData = async () => {
   const rawData = await getRawData(URL);
   // parsing the data
   const parsedData = cheerio.load(rawData);

   const price = parseInt(
    cheerio.load(element)
      .find('.price')
      .text()
  );
  return {price};
   
};
// invoking the main function
scrapeData();