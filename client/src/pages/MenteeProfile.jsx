import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { IconClockHour2, IconStarFilled } from "@tabler/icons-react";

const MenteeProfilePage = () => {

  const dispatch = useDispatch();
  const [mentee, setMentee] = useState({});//[1
  const user =useSelector((state) => state.user);
  const getMentee = async () => {
    try {
      axios.post("/data/mentee/get-mentee-profile-data",{
        email:user?.currentUser?.email 
      }).then((res) => {
        console.log(res.data);
        setMentee(res.data);
        dispatch(signInSuccess(res?.data));
      }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMentee();
  }, []);

  return (
    <div className="pt-24 p-3 md:p-12 h-[100vh] overflow-auto text-gray-700">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-full">
          <div className="bg-gray-50 w-full border border-gray-200 rounded-lg shadow-sm">
            <div className="relative h-40 bg-blue-200 rounded-t-lg w-full mb-12">
              <div className="absolute left-10 -bottom-10">
                <img
                  src={mentee.profilePicture}
                  className="h-32 w-32 rounded-full p-1 bg-white"
                  alt="profile"
                />
              </div>
            </div>
            <div className="pb-6 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex gap-6 items-center px-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-semibold">
                    {mentee?.firstName} {mentee?.lastName}
                  </h1>
                  <h3 className="">{mentee.currentlyWorkingAt}</h3>
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
                      1800+ Menteeing mins
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 mt-6 rounded-lg border border-gray-200 p-6 w-full shadow-sm">
            <h1 className="text-xl font-semibold">About</h1>
            <p className="mt-2 text-sm">{mentee?.bio}</p>

            <h1 className="mt-[72px] text-xl font-semibold">Expertise areas</h1>
            <div className="flex gap-4 flex-wrap mt-2 text-sm">
              {mentee?.needs?.map((item) => (
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
      </div>
    </div>
  );
};

export default MenteeProfilePage;
