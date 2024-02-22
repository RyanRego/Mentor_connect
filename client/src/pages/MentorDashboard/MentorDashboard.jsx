import { useEffect, useState } from "react";
import MentorAllowCard from "../../components/MentorAllowCard/MentorAllowCard";
import axios from "axios";
import { useSelector } from "react-redux";
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
    <main className="w-full flex flex-col gap-10 h-[95vh] overflow-auto text-gray-700 md:px-16">
      <div className="w-full min-h-[90px] bg-blue-400 text-white rounded-md">
        <div className="w-full  flex items-center font-bold text-[30px] p-5  tracking-wide">
          Mentor Dashboard
        </div>
      </div>
      <div className="min-h-[100vh] w-full flex flex-col gap-7">
        {sessions.map((item)=>(
          <MentorAllowCard key={item.time} item={item}/>
        ))}
      </div>
    </main>
  );
};

export default MentorDashboard;
