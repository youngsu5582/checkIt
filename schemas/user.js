import mongoose from 'mongoose';
const {Schema} = mongoose;

import {hash} from 'bcrypt';

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    key:{
        type:String,
        required:true,
    },

}); 

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('key'))
        user.key = await hash(user.key,10);
    else
        next();
    });

export default mongoose.model('User',userSchema);





