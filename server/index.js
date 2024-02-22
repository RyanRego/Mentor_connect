import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

app.listen(PORT, () => {
    console.log(`Server listening on port : ${PORT}`);
})