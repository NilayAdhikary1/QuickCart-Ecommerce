

// @desc Load User Profile details
// @route GET /account/profile
// @access Private

export const getUserProfile = (req, res, next) => {
    const userObj = req.user; // since in isUserAuth.js, I have already attatched the req.user object except password. To access password, you again have to fetch a db call. Otherwise It will work;
    
    res.status(200).json({
        message : "Check Your User Profile",
        user : userObj
    });
}