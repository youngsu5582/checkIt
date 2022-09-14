import jwt from 'jsonwebtoken';
export function token (payload){
    return jwt.sign({
        payload
    },
    process.env.SECRET_KEY);
}
export function payload(token){
    return jwt.verify(
        token,process.env.SECRET_KEY,
    );

}