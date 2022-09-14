import mongoose from 'mongoose';
const {Schema} = mongoose;

const doctorSchema = new Schema({
    id:{
        type:String,
        required:true,
        unique:true,
        index:true,
        alias:'doctor_id',
    },
    available_hours:{
        type:String,
        required:true,
    },
    available_weekday:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    doctor_display_name:{
        type:String,
        required:true,
    },
    doctor_image_url:{
        type:String,
        required:true,
    },
    doctor_images:{
        type:Array,
        required:true,
    },
    doctor_tel:{
        type:String,
        required:true,
    },
    doctor_tel_kakao:{
        type:String,
        required:false,
    },
    hospital_addr:{
        type:String,
        required:true,
        alias:"store_address",
    },
    hospital_name:{
        type:String,
        required:true,
    },
    hospital_img:{
        type:String,
        required:false,
    },
    lab_addr:{
        type:String,
        required:true,
    },
    lab_name:{
        type:String,
        required:true,
    },
    lab_postal_code:{
        type:String,
        required:true,
    },

    lab_receiver_name:{
        type:String,
        required:true,
    },
    lab_tel:{
        type:String,
        required:true,
    },
    lat:{
        type:String,
        required:true,
    },
    lng:{
        type:String,
        required:true,
    },
    professional_statement:{
        type:String,
        required:true,
    },
    subjects:{
        type:String,
        required:true,
    },
    open_hours:{
        type:Array,
        required:false,
    }
    
},
{toJSON:{virtuals:true,transform(doc,ret,optoins){
    delete ret.__v;
    delete ret._id;
}},
toObject:{virtuals:true,transform(doc,ret,optoins){
    delete ret.__v;
    delete ret._id;
}}
});

export default mongoose.model('Doctor',doctorSchema);