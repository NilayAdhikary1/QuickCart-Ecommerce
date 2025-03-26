// @desc Log out user and clears the cookie
// @route POST /account/logout
// @access private

export const logoutUser = (req, res, next) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict", // Ensure CSRF protection
    secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
  });
  res.status(200).json({
    message: "Logged Out successfully!!",
  });
};
