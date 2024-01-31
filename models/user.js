const mongoDB = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(user,email,cart,id){
    this.user = user;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save(){
    const DB = getDb();
    return DB.collection('users')
    .insertOne(this)
    .then((results) => {
      console.log("saving user",results)
    })
    .catch((err) => {
      console.log(err)})
    }

    addToCart(product){
      if(!this.cart){
        this.cart = {items:[]};
      }
      const updatedCartItems =  [...this.cart.items];
      console.log("this cart",this.cart,this.cart.items)
      const cartProductIndex = this.cart.items.findIndex(cartProduct =>{
        return cartProduct.productId.toString() === product._id.toString()});
        console.log("cartIndex",cartProductIndex)

      let newQuantity = 1;
      if (cartProductIndex >=0){
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
      } else {
        updatedCartItems.push({ 
          productId: new mongoDB.ObjectId(product._id),
          quantity: newQuantity
        })
      }
      const updatedCart = {items: updatedCartItems}
      const DB = getDb();
      return DB
      .collection('users')
      .updateOne({_id:new mongoDB.ObjectId(this._id)},
      {$set:{cart:updatedCart}})
    }

    getCart(){
      const DB = getDb();
      const prodIds = this.cart.items.map(cartItem=>{console.log('cartItem',cartItem);
        return cartItem.productId})
      return DB
      .collection('products')
      .find({_id:{$in:prodIds}}).toArray()
      .then((results) =>{
        console.log('results in array',results);
        return results.map(product=>{
          return {...product,quantity:this.cart.items.find(items=>{return items.productId.toString() === product._id.toString()} ).quantity
          }
        })
      })
      .catch(( err)=>{
        console.log("cartItems",err)
      })

    }


  static findById(userId){
    const DB = getDb();
    return DB.collection('users')
    .findOne({_id:new mongoDB.ObjectId(userId)})
    .then((results)=>{
      console.log("get username",results)
      return results;
    })
    .catch((err)=>{
      console.log("user insertion",err)
    })
  }
}

module.exports = User;





// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

// module.exports = User;
