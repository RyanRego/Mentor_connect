import Mentor from "../../model/mentor.model.js"
import _ from "lodash"
const getRecommended = async (req,res) =>{
    try{
        const {needs} = req.body;
        console.log(needs);
        const mentors = await Mentor.find();
        // console.log(mentors);
        const results = mentors.map((mentor) => {
            console.log(mentor.proficiency)
            const sharedTopics = _.intersection(needs, mentor?.proficiency || []);
            const similarity = sharedTopics.length / (needs.length + (mentor?.proficiency?.length || 0) - sharedTopics.length);
            return { mentor, similarity };
        });
          console.log("hie")
          const recommended =  _.orderBy(results, ['similarity'], ['desc']);
          console.log(recommended);
        res.status(200).json({
            recommended
        })
    }catch(error){
        return res.status(500).json({msg: 'Server error'});
    }
}

export {getRecommended};