const { getUserIdFromToken } = require("../config/jwtProvider");
const User = require("../models/user.model");
const bcrypt = require('bcrypt');

const createUser = async(userDate) => {
    try {
        let { firstName, lastName, email, password } = userDate;
        const isUserExisits = await User.findOne({ email });
        if(isUserExisits) {
            throw new Error('user already exists with email:', email);
        }
        password = await bcrypt.hash(password, 8);

        const user = await User.create({firstName, lastName, email, password});

        console.log('user created!', user);
        return user
    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserById = async(userId) => {
    try {
        const user = await User.findById(userId)
        // .populate('address');
        if(!user) {
            throw new Error('user not found with id:', userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserByEmail = async(email) => {
    try {
        const user = await User.findOne({email});
        if(!user) {
            throw new Error('user not found with email: ', email);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserProfileBytoken = async(token) => {
    try {
        const userId = getUserIdFromToken(token);
        const user = await findUserById(userId);

        if(!user) {
            throw new Error('user not found with id:', userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllUsers = async() => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { 
    createUser, 
    findUserById, 
    getUserByEmail,
    getUserProfileBytoken,
    getAllUsers
}
