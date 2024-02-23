// export default FeedCard;
/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import {
  IconStarFilled,
  IconCurrencyRupee,
  IconVideo,
  IconMessage,
  IconSquareCheck,
} from "@tabler/icons-react";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import axios from 'axios';

const FeedCard = ({user, mentor }) => {
  const [value, onChange] = useState(new Date());
  // console.log(value);
  const getRole = localStorage.getItem('role');
  console.log(getRole);

  // const onChange = (date) => {
  //   setDateTime(date); // Update state with the selected date and time
  // };

  const onSubmit = async (id) => {
    // Ensure selectedDate is a Date object
    const formattedDate = value.toDateString(); // Convert to string format
    const formattedTime = value.toLocaleTimeString();
    console.log(formattedDate);
    console.log(formattedTime);
    console.log(user);
    axios.post('/requestmentor', {
      mentorId: id.toString(),
      menteeId: user.currentUser._id.toString(),
      date: formattedDate,
      time: formattedTime
    }).then(({data})=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    });
    close();
  }

  return (
    <div className="text-gray-700 flex flex-col mx-3 md:mx-0 md:flex-row shadow-sm border border-gray-300 rounded-lg bg-gray-50">
      <div className=" md:w-2/3 border-b md:border-b-0 md:border-r border-gray-300">
        <div className="flex gap-6 p-6">
          <img
            src={mentor?.profilePicture}
            className="h-24 w-24 rounded-full"
            alt="profile"
          />
          <div className="flex flex-col gap-2">
            <h1 className="flex items-center font-semibold text-xl gap-4">
              {mentor.firstName} {mentor.lastName}
              <span className="flex items-center text-sm font-normal">
                <IconStarFilled className="mr-2 text-yellow-600" size={16} />5
              </span>
            </h1>
            <p>{mentor.currentlyWorkingAt}</p>
            <p className="text-sm line-clamp-2">{mentor.bio}</p>
          </div>
        </div>
        <div className="border-t border-gray-300 p-6">
          <div className="">
            <span className="text-lg font-semibold">Expertise areas</span>
            <div className="flex gap-4 flex-wrap mt-2 text-sm">
              {mentor?.proficiency?.map((prof) => (
                <div
                  key={prof}
                  className="flex items-center font-semibold px-2 py-1 rounded-lg border border-gray-300 shadow-sm bg-white"
                >
                  {prof}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/3 p-6 flex flex-col justify-between bg-green-50 gap-4">
        <div>
          <p className="flex text-sm items-center">
            <IconVideo className="mr-4" />
            one to one vedio call
          </p>
          <p className="flex text-sm items-center">
            <IconSquareCheck className="mr-4" />
            get resources to follow
          </p>
          <p className="flex text-sm items-center">
            <IconMessage className="mr-4" />
            chat with mentor
          </p>
        </div>
        <span className="flex items-center text-2xl font-semibold">
          <IconCurrencyRupee />
          {mentor.rateOfMentorship}
          <span className="text-base font-normal">/hr</span>
        </span>

        <div className="flex flex-col gap-4">
          <button className="px-4 h-9 shadow-sm hover:bg-gray-50 bg-white border border-gray-300 rounded-lg font-semibold">
            View Profile
          </button>

          <div className="flex justify-center flex-col">
            <p className="font-semibold mb-2 text-sm">Pick a time slot</p>
            <DateTimePicker
              className="bg-white"
              onChange={onChange}
              value={value}
            />
          </div>

          <button className="px-4 h-9 shadow-sm bg-green-700 rounded-lg text-white font-semibold" onClick={() => onSubmit(mentor._id)}>
            Book a session
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

