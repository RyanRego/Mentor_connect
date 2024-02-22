import Mentor from "../../model/mentor.model.js"
const requestMentor = async (req,res) =>{
    try{
        const {mentorId,menteeId,date,time} = req.body;
        if(!mentorId || !menteeId ||!date || !time){
            return res.status(400).json({
                msg: 'Not Valid Date And Time'
            });
        }
        const mentor = await Mentor.findById(mentorId)
        if(!mentor){
            return res.status(400).json({
                msg: 'Mentor not found'
            });
        }

        const id = Math.floor(Math.random() * 1000000);

        mentor.sessionRequest.unshift({
            id:id,
            user:menteeId,
            date:date,
            time:time,
            status:'pending'
        })
        await mentor.save();

        res.json({
            msg: 'Valid Date And Time',
            mentorId:mentorId,
            menteeId:menteeId,
            date:date,
            time:time
        });
    }catch(err){
        return res.status(500).json({
            msg: 'Server error'
        });
    }
}

export {requestMentor};
