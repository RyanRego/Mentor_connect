import Mentee from '../model/mentee.model.js';

const getRequestor = async (req,res)=>{
    try{
        const {userId} = req.body;
        const requestor = await Mentee.findById(userId);
        if(!requestor){
            return res.status(404).json({message:"Requestor not found"});
        }
        res.json(requestor);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export {getRequestor};