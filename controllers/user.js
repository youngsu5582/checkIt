import User from '#schema/user.js';
import {token,payload} from '#middleware/jwt.js';
import {logger} from '#config/logger.js';
import {compare} from 'bcrypt';

export async function signup(req,res){
    const json = req.body;
    var user = await User.findOne({email:json.email});
        if(user)
            res.status(200).json({"status" : "user_duplicate"});
        else{
            new User(json).save()
            .then(
                res.status(200).json({
                    "status":"ok",
                    "data":{"token":token(json.email)}
           }))
           .catch((err)=>{
                logger.error('Signup Error : '+ err);
                res.status(200).json({"status":"nok"});
           })
           ;
        }
}

export async function withdrawal(req,res){
    const token = req.get('Authorization').split(' ')[1];
    const email = payload(token).payload;

    User.findOneAndDelete({email:email},(err) => {
        if(err) logger.error('No user : '+err);
        else {
            res.status(200).json({"status":"ok"});
        }
    });
}
export async function login(req,res) {

    const user = await User.findOne({email:req.body.email});

    try{
        if(user && await compare(req.body.key,user.key))
            res.status(200).json({
                "status":"ok",
                "data" : {"token":token(user.email)}
            })
        else
            res.status(200).json({
                "status" : "no_user"
            })
    }
    catch(err){
        logger.error('Login Error : '+ err);
        return res.status(200).json({"status":"nok"});
    }

}
