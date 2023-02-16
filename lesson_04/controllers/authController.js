const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    // do stuff
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {

}

// @desc Logout