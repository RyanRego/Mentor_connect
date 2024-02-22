import nodemailer from "nodemailer";
const sendEmail = (recipentEmail,recipentName,sendername,status,code) => {

    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587, 
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
    // Define email content
    let mailOptions = {
      from: "mentorconnect@gmail.com",
      to: "ryanrego14@gmail.com", 
      subject: `${sendername} has ${status} your request.`, 
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Mentor-Connect</h2>
                <p>Dear ${recipentName},</p>
                <p>${sendername} has ${status} your request.Click on the below link to join the video call with him</p>
    
                <h2 style="color:green">Join Now</h2>
                <p>Please click on the below</p>
                <a href="http://localhost:5173/room/${code}">mentor-connect.com/${sendername}</a>
                <p>Thank you once again for your interest in joining our platform.</p>
    
                <p>Best regards,<br>
                Taj Malnas<br>
                CEO, storyard</p>
            </div>
        `,
    };
    
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(mailOptions);
      if (error) {
        console.error("Error occurred:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });      
}

export {sendEmail};