import Mentor from "../../model/mentor.model.js"

const getAllSession = async (req,res) =>{
    try{
        console.log(req.body)
        const {userId} = req.body;
        if(!userId){
            return res.status(400).json({
                msg: 'Not Id'
            });
        }
        const mentor = await Mentor.findById(userId)
        if(!mentor){
            return res.status(400).json({
                msg: 'Mentor not found'
            });
        }
        res.json({
            sessionRequest : mentor.sessionRequest
        });
    }catch(err){
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

export {getAllSession}