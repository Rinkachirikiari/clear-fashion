const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = (data, num = 0) => {
  const $ = cheerio.load(data);

  if(num==0){
    return $('.productList-container .productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');
        const price = parseInt(
          $(element)
            .find('.productList-price')
            .text()
        );
        const link = 
        'https://www.dedicatedbrand.com/en/men/news'+
        $(element)
            .find('.productList-link')[1]
            .attribs.href
        ;
        const brand = "DEDICATED";
    
      return {name, price, link, brand};
    })
    .get();
  }

  if(num==1){
    return $('.item')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
        const price = parseInt(
          $(element)
            .find('.price')
            .text()
        );
        const link = 
        $(element)
            .find('.product-name a').attr('href')
        ;
        const brand = "Montlimart";
    
      return {name, price, link, brand};
    })
    .get();
  }

  if(num==2){
    return $('.product-container')
    .map((i, element) => {
      const name = $(element)
        .find('.versionpc .product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
        const price = parseInt(
          $(element)
            .find('.price')
            .text()
        );
        const link = 
        $(element)
            .find('.product_img_link').attr('href')
        ;
        const brand = "ADRESSE Paris";
    
      return {name, price, link, brand};
    })
    .get();
  }

};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}

 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();
      if(url.includes('dedicatedbrand')){
        return parse(body, 0);
      }
      if(url.includes('montlimart')){
        return parse(body, 1);
      }
      if(url.includes('adresse.paris')){
        return parse(body, 2);
      }
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};