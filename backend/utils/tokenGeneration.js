// What Happens If maxAge and expiresIn Are Different?
// 1) JWT Expires Before Cookie (expiresIn < maxAge):
// Problem:---
// a) The cookie is still present, but the JWT is invalid (expired).
// b) If you don’t check token validity on every request, it may lead to broken sessions.

// 2) Cookie Expires Before JWT (maxAge < expiresIn):
// Problem:---
// a) The JWT is still valid, but the browser deletes the cookie.
// b) User is logged out even though the JWT hasn’t expired.


import jwt from 'jsonwebtoken';


const TOKEN_EXPIRATION = 30 * 24 * 60 * 60; // 30 days in seconds

// WE SHOULD NOT STORE 'password' TO THE TOKEN AS IT WILL BE SENT TO THE USER, SO IT IS IDEAL NOT TO SEND PASSWORD ALONG...
export const generateToken = (res, userId) => {
  const token = jwt.sign(
    {
      userId : userId,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: `${TOKEN_EXPIRATION}s` }
  );

  // Now here I will store the token in a http-only cookie...
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Ensures cookie is only sent over HTTPS
    sameSite: "strict", // Restricts cookie sharing across sites to prevent CSRF attacks
    maxAge: TOKEN_EXPIRATION * 1000, // Cookie expires in 30 day (in milliseconds)
  });
};
