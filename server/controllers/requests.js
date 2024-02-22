import Mentor from "../model/mentor.model.js";
import Mentee from "../model/mentee.model.js";
import { sendEmail } from "../utils/email.js";
const acceptRequest = async (req, res) => {
    try {
        const { mentorId, requestorId,time,date,code} = req.body;
        console.log(req.body);
        const mentor = await Mentor.findById(mentorId);
        const requestor = await Mentee.findById(requestorId);
        if (!mentor || !requestor) {
            return res.status(404).json({ message: "Mentor or Requestor not found" });
        }
        const mentorName = mentor.firstName + " " + mentor.lastName;
        const requestorName = requestor.firstName + " " + requestor.lastName;

        const requestNotificationId = Math.floor(Math.random() * 1000000); 
        requestor.notifications.unshift({
            id: requestNotificationId,
            status: "accepted",
            mentor: mentorName,
            message: "Your request has been accepted",
            time: time,
            date: date,
            code: code,
        });

        sendEmail(requestor.email, requestorName,mentorName, "Request Accepted", code);
        console.log("done it");

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { acceptRequest };