const mongoDB = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username,email){
    this.username = username;
    this.email = email;
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


  static findById(userId){
    const DB = getDb();
    return DB.collection('users')
    .findOne({_id:new mongoDB.ObjectId(userId)})
    .then((results)=>{
      console.log("get username",results)
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
