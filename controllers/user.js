const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);
const User = require('../models/user');

//Register  new user 
const register = (user) => User.create(user);

//login 
const login = async ({ username, password }) => {
const user = await User.findOne({ username }).exec();

  if (!user) {
    throw Error('UN_AUTHENTICATED');
  }

  const isVaildPass = user.validatePassword(password);
  console.log(isVaildPass)
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }

  const token = await asyncSign({
    username: user.username,
    id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' } );
  return { ...user.toJSON(), token };
};


//get all user  
const getAll = () => User.find({}).exec();

//get one user 
const getuser = (id) => User.findById(id).exec();

//user edit his data 
const editUser = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();

//user remove his account  
const removeAcc = (id) =>  User.findByIdAndDelete(id).exec();

 //follow 
//Add  User to you follwing array 
const addfollowing = (id, trgetid) => User.update(
  { "_id": id },
  {
      $push: {
          following: trgetid,
      }
  }
    
);
//Add you to user  follower array 
const addfollower = (id, trgetid) => User.update(
  { "_id": trgetid },
  {
      $push: {
          followers: id,
      }
  }
);


//unfollow 
//Remove user from you following array 
const removefollowing = (id, trgetid) => User.update(
  { "_id": id },
  {
      $pull: {
          following: trgetid,
      }
  }
);
//Remove  you from follower array 
const removefollower = (id, trgetid) => User.update(
  { "_id": trgetid },
  {
      $pull: {
          followers: id,
      }
  }
);
module.exports = {
   register ,
  login,
  getAll,
  getuser,
  editUser,
  removeAcc,
  addfollowing,
  addfollower,
  removefollowing,
  removefollower
};
