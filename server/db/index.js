require('dotenv').config();
const {MongoClient} = require('mongodb');
const fs = require('fs');

const MONGODB_DB_NAME = 'cluster0';
const MONGODB_COLLECTION = 'products';
const MONGODB_URI = "mongodb+srv://Mathis:Tictac64@cluster0.eo0ip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let client = null
let database =  null

/**
 * Get db connection
 * @type {MongoClient}
 */
const getDB = module.exports.getDB = async () => {
  try {
    if (database) {
      console.log('💽  Already Connected');
      return database;
    }

    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    database = client.db(MONGODB_DB_NAME);

    console.log('💽  Connected');

    return database;
  } catch (error) {
    console.error('🚨 MongoClient.connect...', error);
    return null;
  }
};

//Insert list of products
//const collection = db.collection('products');
//const result = collection.insertMany(products);

//console.log(result);
 
module.exports.insert = async products => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    // More details
    // https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/#insert-several-document-specifying-an-id-field
    const result = await collection.insertMany(products, {'ordered': false});

    return result;
  } catch (error) {
    console.error('🚨 collection.insertMany...', error);
    fs.writeFileSync('products.json', JSON.stringify(products));
    return {
      'insertedCount': error.result.nInserted
    };
  }
};

/**
 * Find products based on query
 * @param  {Array}  query
 * @return {Array}
 */
module.exports.find = async query => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    const result = await collection.find(query).toArray();

    return result;
  } catch (error) {
    console.error('🚨 collection.find...', error);
    return null;
  }
};

// Trouve les noms des marques 
const findBrand = module.exports.findBrand = async brand => {
  try{
    const query = {brand}
    const res = await this.find(query);
    return res;
  }catch(err){
    console.log("🚨 findBrand error :",err);
    process.exit(1);
  }
}

// Trouve les prix moins par rapport (2eme query)
//const query = {brand : brand, price : {$lte:price}}
const findPrice = module.exports.findPrice = async brand => {
  try{
    const query = {brand : brand, price : {$lte:price}}
    const res = await this.find(query);
    return res;
  }catch(err){
    console.log("🚨 findPrice error :",err);
    process.exit(1);
  }
}

// 3eme query - Sorted 
const findPriceSorted = module.exports.findPriceSorted = async brand => {
  try{
    const query = {brand : brand, price : {$lte:price}}
    const res = await this.find(query);
    return res.sort();
  }catch(err){
    console.log("🚨 findPriceSorted error :",err);
    process.exit(1);
  }
}



const findId=module.exports.findId =async id =>{
  try{
    const query ={_id : id};
    const res =await this.find(query);
    return res;
  }
  catch(error){
    console.error('Find Id error...',error);
    return null;
  }
};





const Search = module.exports.Search = async queries =>{
  try{

    const db = await getDB();
    const collection = db.collection(MONGODB_COLLECTION);
    let query ={};
    let limit =12;
    console.log(queries)
    for(const[key,val] of Object.entries(queries)){
      switch(key){
        case "brand":
          query["brand"]=val;
          break;
        case "price":
          query["price"]={$lte:parseInt(val)};
          break;
        case "limit":
          limit=val;
          break;
        default:
          break;

      }
    }
    var mysort={price:'asc'};
    const res =await collection.find(query).sort(mysort).limit(parseInt(limit)).toArray();
    return res;
  }
  catch(error){
    console.error('Find Sorted Price error...',error);
    return null;
  }
};





/**
 * Close the connection
 */
module.exports.close = async () => {
  try {
    await client.close();
  } catch (error) {
    console.error('🚨 MongoClient.close...', error);
  }
};
