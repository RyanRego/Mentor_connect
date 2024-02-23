import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MentorAllowCardTable from "../MentorDashboard/MentorAllowCardTable";

const MentorDashboard = () => {

  const user = useSelector((state)=>state.user);
  const [sessions,setSessions] = useState([]);

  const getAllSessions = async () =>{
    axios.post('/requestmentor/sessions',{
      userId:user?.currentUser?.mentor?._id
    }).then((res)=>{
      console.log(res)
      setSessions(res.data.sessionRequest)
    })
  }

  useEffect(()=>{
    console.log(user)
    getAllSessions()
  },[])

  return (
    <div className="pt-24 p-3 md:p-12 h-[100vh] overflow-auto text-gray-700">
      <div className="p-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-md shadow">
        <h1 className="font-semibold text-4xl">Mentor Dashboard</h1>
      </div>
      <div className="mt-6 flex flex-col gap-6 border border-gray-300 bg-gray-50 p-6 rounded-lg">
        <MentorAllowCardTable sessions={sessions} />
      </div>
    </div>
  );
};

export default MentorDashboard;