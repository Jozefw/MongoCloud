const mongoDB = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl,id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }

  save() {
    const db = getDb();
    if(this._id){
      //update product
      let dbOperation = db.collection('products')
      .updateOne({_id: new mongoDB.ObjectId(this._id)},{$set:this})
    }else{
      dbOperation = db.collection('products').insertOne(this)
    }
    return dbOperation
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log("model products",products);
        return products;
      })
      .catch(err => {
        console.log("Fetch error",err);
      });
  }

  static findById(ProdId) {
    const db = getDb();
    return db.collection ('products').find({_id:new mongoDB.ObjectId(ProdId)})
    .next()
    .then((product) => {
      console.log("product:",
      product);
      return product;
    })
    .catch((err)=>{
      console.log(err)
    })

  }
}

module.exports = Product;
