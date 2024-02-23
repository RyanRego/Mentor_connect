import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Mentor from './model/mentor.model.js'
import mongoose from "mongoose";
import mentorAuth from "./routes/mentor/auth.js"; 
import menteeAuth from "./routes/mentee/auth.js";
import menteeProfileEdit from "./routes/mentee/Info.js";
import mentorProfileEdit from "./routes/mentor/info.js";
import getMenteeProfileData from "./routes/mentee/data.js";
import getMentorProfileData from "./routes/mentor/data.js";
import getAllMentorsProfile from "./routes/getmentors.js";
import requestMentor from "./routes/mentee/requestmentor.js"
import getAllSessions from "./routes/mentor/dashboard.js"
import onRequesting from "./routes/requests.js"
import getRecommended from "./routes/mentee/getRecommended.js"
import giveFeedback from "./routes/feedback.js"
const app = express();
app.use(cors());    
app.use(express.json());
dotenv.config();

const PORT = 5000;

mongoose.connect(process.env.MONGO_KEY).then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Connection failed');
}
);

app.use('/api/auth/mentor', mentorAuth);
app.use('/api/auth/mentee', menteeAuth);

app.use('/api/profile/mentee',menteeProfileEdit);
app.use('/api/profile/mentor',mentorProfileEdit);

app.use('/api/data/mentee',getMenteeProfileData);
app.use('/api/data/mentor',getMentorProfileData);

app.use('/api/getallmentors',getAllMentorsProfile);

app.use('/api/requestmentor',requestMentor);
app.use('/api/requestmentor',getAllSessions);

app.use('/api/request',onRequesting);

// get recommend mentors api
app.use('/api/get-recommended',getRecommended);

//get feedback from mentee
app.use('/api/feedback',giveFeedback);


//fetch feedback for the mentors from mentees
app.use('/api/fetch-feedback', async (req, res) => {
    try {
      const { mentorId } = req.body; // Destructure mentorId from the request body
  
      // Find the mentor by mentorId and select the feedback field
      const mentor = await Mentor.findById(mentorId, 'feedback');
  
      if (!mentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
  
      res.json(mentor.feedback); // Send the feedback array as the response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
})