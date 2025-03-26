

export const isAuthAdmin = (req, res, next) => {
    const isAdmin = req.user?.isAdmin;
    if(isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error("Not Authorized as Admin!!");
    }
}