//asyncHandler(func) is a higher-order function that takes an async function (func) and returns a new function (asyncFn).



const asyncHandler = (func) =>
  function asyncFn(req, res, next) {
    // Since func is async, it returns a Promise.
    // That Promise is stored in funcReturn.
    const funcReturn = func(req, res, next); 

    
    // If funcReturn resolves successfully:
      //  -> The await Product.find({}) completes.
      //  -> res.json(products) sends the response.
      //  -> The request finishes normally.
    // If an error occurs (e.g., database is down):
      // -> Product.find({}) rejects.
      // -> The .catch(next) automatically calls next(error).
      // -> This sends the error to Express' global error handler.
    return Promise.resolve(funcReturn).catch(next);
  };

export default asyncHandler;
