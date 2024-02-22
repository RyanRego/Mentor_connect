/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ActionIcon, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";

const FeedCard = ({ user, mentor }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currTime, setCurrTime] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const onSubmit = async (id) => {
    // Ensure selectedDate is a Date object
    const dateObject = new Date(selectedDate);
  
    // Format date as YYYY-MM-DD in UTC
    const formattedDate = dateObject.toISOString().slice(0, 10);
  
    // Get current time in HH:MM format
    const currentTime = new Date();
    const hours = currentTime.getUTCHours().toString().padStart(2, '0');
    const minutes = currentTime.getUTCMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
  
    console.log("date : ", formattedDate);
    console.log("time : ", currTime);
  
    axios.post('/requestmentor', {
      mentorId: id.toString(),
      menteeId: user.currentUser.mentee._id.toString(),
      date: formattedDate,
      time: currTime
    }).then(({data})=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    });
    close();
  }

  // eslint-disable-next-line no-unused-vars
  const makeRequestToMentor = (id) => {
    open();
  }


  return (
    <div className="p-5 border-2 border-gray-300 rounded-lg hover:border-blue-400">
       <Modal opened={opened} onClose={close} title="Select Date And Time">
        {/* Modal content */}
        <input
          type="date"
          className="block border p-2 rounded-md w-72"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          label="Date input"
          placeholder="Date input"
        />
        <input
          type="time"
          className="mt-4 block border p-2 rounded-md w-72"
          value={currTime}
          onChange={(e) => setCurrTime(e.target.value)}
          label="Select Time Slot"
        />
        <Button className="bg-blue-500 w-40 text-white rounded-md mt-6" onClick={()=>onSubmit(mentor._id)} variant="default">Submit</Button>
      </Modal>
      <div className=" flex justify-between border-b pb-5 border-gray-300">
        <div className="flex gap-6  ">
          <img src={mentor?.profilePicture || ProfilePhoto} className="h-24 rounded-lg" alt="profile" />
          <div>
            <h1 className="font-semibold text-xl">{mentor.firstName} {mentor.lastName}</h1>
            <h3 className="text-gray-500">{mentor.currentlyWorkingAt}</h3>
            <p className="text-sm mt-1 line-clamp-2 w-3/5">
              {mentor.bio}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center border-b py-5 border-gray-300">
        <div className="flex  gap-4 items-center">
          <span className="font-semibold">Profieciency: </span>
          <div className="flex flex-wrap w-44 gap-2">
            {mentor?.proficiency?.map((prof) => (
              <div key={prof} className="px-2 py-1 border border-gray-300 rounded-full text-sm">
                {prof}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-4 flex flex-col md:flex-row md:justify-between items-center gap-4">
        <button className="py-2.5 w-full md:w-auto px-4 bg-gray-400 rounded-lg font-semibold text-white ">
          View Profile
        </button>

        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">
            {mentor.rateOfMentorship}rs <span className="text-base font-normal">/hr</span>
          </h1>

          <button onClick={()=>makeRequestToMentor()} className="py-2.5 px-4 bg-green-400 rounded-lg font-semibold text-white ">
            Book a session
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
