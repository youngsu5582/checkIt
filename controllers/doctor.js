import Doctor from "#schema/doctor.js";
import History from "#schema/history.js";
import {logger} from "#config/logger.js";

export function getDoctor(req,res){    
    const id = req.query.doctor_id;
    Doctor.findOne({id:id})
        .then((doctor)=>res.status(200).json({"status":"ok","data":{doctor:doctor}}))
        .catch((err)=>{logger.error('getDoctor Error : ' +err);throw new Error(err)});    
}

export function Doctorlist(req,res){ 
    const query = {id:1,doctor_display_name:1,doctor_image_url:1,hospital_name:1,hospital_address:1,description:1,hospital_img:1}
    Doctor.find({},query)
        .then((docs)=>res.status(200).json({"status":"ok","data":{"doctors":docs}}))
        .catch((err)=>{logger.error('Doctorlist Error : ' +err);throw new Error(err)});    
}

export async function stdReservation(req,res){
    const json = req.body;
    new History(json).save()
    .then(()=>res.status(200).json({"status":"ok"}))
    .catch((err)=>{
        logger.error('stdRegister Error : '+err);
        res.status(200).json({"status":"nok","data":{"message":err}})});
}