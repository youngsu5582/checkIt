export function isLogin(req,res,next){
    const token = req.get('Authorization').split(' ')[1];
    if(token)next();
    else throw Error("Token Error");
}