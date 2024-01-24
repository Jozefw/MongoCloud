const mongoDB = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username,email,cart,id){
    this.username = username;
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
      console.log(err)
    })
    }

    addToCart(product){
      // const cartContents = this
      // .cart
      // .items
      // .findIndex(cartItems =>{
      //   return cartItems._id === product._id
      // })
      const updatedCart = {items: [{...product, quantity:1}]}
      const DB = getDb();
      return DB
      .collection('users')
      .updateOne({_id:new mongoDB.ObjectId(this._id)},
      {$set:{cart:updatedCart}})
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
