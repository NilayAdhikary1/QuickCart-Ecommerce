
// • notFound only runs when no previous middleware/route matches the request(e.g. /random)
// • If a route is matched but an error occurs, asyncHandler and errorHandler handle it before notFound is reached.
// • next(error) inside notFound is correct because it ensures all errors go through the centralized errorHandler.


// It only runs when no routes matches the given route................
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};


//we may throw error error from anywhere like throw new Error("..."). In that case if it is 200, then set it to 500 else set that as it is...

//overide the default express middleware...................
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //check for Mongoose bad ObjectID(when id doesn't match with the id saved in db)
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource Not Found😔";
  }
  res
    .status(statusCode)
    .json({
      message,
      stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
};

export { notFound, errorHandler };
