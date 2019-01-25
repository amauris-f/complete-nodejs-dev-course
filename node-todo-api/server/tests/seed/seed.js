const {ObjectId} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const todos = [{
  _id: new ObjectId(),
  text:'First text todo',
  _creator: userOneId
}, {
  _id: new ObjectId(),
  text: 'Second test todo',
  completed: true,
  completedAt: 135,
  _creator: userTwoId
}];



const users = [{
  _id: userOneId,
  email:'amauris@example.com',
  password:'user1pass',
  tokens:[{
    access: 'auth',
    token: jwt.sign({_id: userOneId,access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email:'jen@example.com',
  password:'user2pass',
  tokens:[{
    access: 'auth',
    token: jwt.sign({_id: userTwoId,access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const populateTodos = (done) =>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>{
    done();
  });
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();
    //Promise will not resolve until everything in the array is done
    return Promise.all([userOne, userTwo]);
  }).then(()=>{
    done();   
  });
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}