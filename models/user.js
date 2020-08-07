'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  User.register = async (
    email,
    password,
    phone,
    role,
    restaurant,
    fname,
    lname
  ) => {
    const passwordHash = bcrypt.hashSync(password, 10);
    let user = {
      email: email,
      password: passwordHash,
      phone: phone,
      role: role,
      restaurantId: restaurant,
      firstname: fname,
      lastname: lname
    };
  
    let created_user = await User.create(user);
    return User.authenticate(email, password);
  };
  
  User.getUser = async (obj) => {
    return await User.findOne({
      where: obj,
    });
  };
  
  // used to validate the user
  User.authenticate = async (email, password) => {
    let user = await User.findOne({ where: { email: email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      return null;
    }
  };

  return User;
};