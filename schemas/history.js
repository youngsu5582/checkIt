import mongoose from 'mongoose';
const {Schema} = mongoose;

const historySchema = new Schema({
    doctor_id:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    address_code:{
        type:String,
        required:true,
    },
    store_address:{
        type:String,
        required:false,
    },
    coupon_id:{
        type:String,
        required:false,
    }

});

export default mongoose.model('History',historySchema);