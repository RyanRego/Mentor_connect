import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import {
  IconClockHour2,
  IconStarFilled,
  IconCurrencyRupee,
  IconVideo,
  IconMessage,
  IconSquareCheck,
} from "@tabler/icons-react";

const MentorProfilePage = () => {
  const [mentor, setMentor] = useState({});
  const user = useSelector((state) => state.user);
  const getMentor = async () => {
    try {
      axios
        .post("/data/mentor/get-mentor-profile-data", {
          email: user?.currentUser?.mentor?.email,
        })
        .then((res) => {
          console.log(res.data);
          setMentor(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMentor();
  }, []);

  const [value, onChange] = useState(new Date());
  console.log(value);

  return (
    <div className="pt-24 p-3 md:p-12 h-[100vh] overflow-auto text-gray-700">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="bg-gray-50 w-full border border-gray-200 rounded-lg shadow-sm">
            <div className="relative h-40 bg-blue-200 rounded-t-lg w-full mb-12">
              <div className="absolute left-10 -bottom-10">
                <img
                  src={mentor.profilePicture}
                  className="h-32 w-32 rounded-full p-1 bg-white"
                  alt="profile"
                />
              </div>
            </div>
            <div className="pb-6 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex gap-6 items-center px-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-semibold">
                    {mentor?.firstName} {mentor?.lastName}
                  </h1>
                  <h3 className="">{mentor.currentlyWorkingAt}</h3>
                  <div className="flex gap-6">
                    <span className="flex items-center text-sm">
                      <IconStarFilled
                        className="mr-2 text-yellow-600"
                        size={16}
                      />
                      5
                    </span>
                    <span className="flex items-center text-sm">
                      <IconClockHour2 className="mr-2" size={16} />
                      1800+ Mentoring mins
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 mt-6 rounded-lg border border-gray-200 p-6 w-full shadow-sm">
            <h1 className="text-xl font-semibold">About</h1>
            <p className="mt-2 text-sm">{mentor?.bio}</p>

            <h1 className="mt-[72px] text-xl font-semibold">Expertise areas</h1>
            <div className="flex gap-4 flex-wrap mt-2 text-sm">
              {mentor?.proficiency?.map((item) => (
                <div
                  key={item}
                  className="bg-white flex items-center font-semibold px-2 py-1 rounded-lg border border-gray-300 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col gap-6">
          <div className="p-6 flex flex-col justify-between gap-4 bg-green-50 border border-gray-200 shadow-sm rounded-lg">
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

            <div className="flex justify-center flex-col">
              <p className="font-semibold mb-2 text-sm">Pick a time slot</p>
              <DateTimePicker
                className="bg-white"
                onChange={onChange}
                value={value}
              />
            </div>

            <button className="px-4 h-9 shadow-sm bg-green-700 rounded-lg text-white font-semibold">
              Book a session
            </button>
          </div>

          <div>
            <h1 className="mb-2 font-semibold">Demo video</h1>
            <iframe
              className="w-full"
              src={`https://www.youtube.com/embed/0PfiXof0E9s`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      </div>

      <div className="mt-20 md:flex flex-col max-w-[540px]">
        <h1 className="text-center mb-6 text-xl font-semibold">
          Happy mentees 😄
        </h1>
        <div>
          <Swiper navigation={true} modules={[Navigation]}>
            <SwiperSlide>
              <div className="p-6 mx-12 md:mx-16 bg-yellow-50 rounded-lg flex flex-col gap-2 items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
                  alt=""
                  className="h-14 w-14"
                />
                <p className="font-semibold text-sm">Manoj</p>
                <span className="flex gap-1">
                  <IconStarFilled className="mr-2 text-yellow-600" size={16} />
                  <IconStarFilled className="mr-2 text-yellow-600" size={16} />
                  <IconStarFilled className="mr-2 text-yellow-600" size={16} />
                  <IconStarFilled className="mr-2 text-yellow-600" size={16} />
                </span>

                <p className="text-center text-sm mt-2">
                  Interacting with Yash was delightful. He took time to
                  understand my issue in a few sessions without rushing into
                  solutions.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 mx-12 md:mx-16 bg-yellow-50 rounded-lg flex flex-col gap-2 items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
                  alt=""
                  className="h-14 w-14"
                />
                <p className="font-semibold text-sm">Manoj</p>
                <span className="flex gap-1">
                  <IconStarFilled className="mr-2 text-yellow-600" size={16} />
                  <IconStarFilled className="mr-2 text-yellow-600" size={16} />
                  <IconStarFilled className="mr-2 text-yellow-600" size={16} />
                  <IconStarFilled className="mr-2 text-yellow-600" size={16} />
                </span>

                <p className="text-center text-sm mt-2">
                  Interacting with Yash was delightful. He took time to
                  understand my issue in a few sessions without rushing into
                  solutions.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MentorProfilePage;