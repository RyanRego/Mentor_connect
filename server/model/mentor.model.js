import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    profilePicture: { 
        type: String, 
        default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png'
    },
    role: { 
        type: String, 
        default: 'mentor'
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    currentlyWorkingAt: {
        type: String,
    },
    bio: {
        type: String,
    },
    proficiency: {
        type: [String],
    },
    rateOfMentorship: {
        type: String,
    },
    isFormFilled: {
        type: Boolean,
        default: false
    },
    sessionRequest: [{
        id:String,
        user:String,
        date:Date,
        time:String,
        status:String,
    }],
    notifications: {
        type: [{
            id: String,
            status: String,
            mentee: String,
            message: String,
            time: String,
            date: String,
            code: String,
        }],
    },
},
    {
        timestamps: true
    }
);

export default mongoose.model('Mentor', mentorSchema);