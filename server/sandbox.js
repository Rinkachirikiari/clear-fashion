const dedicatedbrand = require('./sources/dedicatedbrand');
var fs = require('fs');

async function sandbox () {
  try {
    var products = [];
    let websites = [];
    websites.push('https://www.dedicatedbrand.com/en/men/news');
    websites.push('https://www.montlimart.com/polos-t-shirts.html');
    websites.push('https://adresse.paris/608-pulls-et-sweatshirts');

    
    for(let eshop in websites){
      console.log(`🕵️‍♀️  browsing ${websites[eshop]} source`);
      
      let currentProducts = await dedicatedbrand.scrape(websites[eshop]);
      for(let i in currentProducts){
        products.push(currentProducts[i]);
      }
    }  
    fs.writeFileSync('products.json', JSON.stringify(products), 'utf8');
    console.log('done');
    process.exit(0);
   
   

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,,] = process.argv;
sandbox();