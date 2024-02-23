/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import * as faceapi from "face-api.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {useSelector} from 'react-redux';
import FeedbackForm from "../../components/feedback-form/FeedbackForm";

const MentorCall = () => {
  const user = useSelector((state) => state.user)
  const { roomId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null); // Reference to the video element // To track video stream activation
  const [error, setError] = useState(null); // To store any errors
  // const [btnPresses, setBtnPressed] = useState(false);
  const [noFace, setNoFace] = useState(0);
  const [room, setRoom] = useState(true);
  const [showForm,setShowForm] = useState(false);

  // Load face detection models (moved outside myMeeting for reusability)
  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []); // Run only once on component mount

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = async () => {
    Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models")]).then(
      () => {
        console.log("face detection model loaded successfully");
        faceMyDetect();
      }
    );
  };

  const faceMyDetect = () => {
    const getRole = localStorage.getItem('role')
    console.log(getRole);
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detections && detections.length > 0) {
        console.log("Face detected. Good going Mentor");
      } else if(room === false) {
        console.log("No face detected");
        setNoFace((prevTime) => prevTime + 1); // Increment no face time

        if (noFace >= 10) { // Check if no face time exceeds 10 seconds
          toast.error("Please ensure you are visible on camera to provide the best mentoring experience.");
          setNoFace(0); // Reset no face time after showing toast
        }
      }
      else
      {
        console.log(room);
        console.log("No Room No Face");
      }
    }, 1000);
  };
  const myMeeting = async (element) => {
    if (error) {
      return <div>Error loading face detection model: {error.message}</div>;
    }
    const appId = 1118000397;
    const serverSecret = "282ab140579e78a3eab87dd7e3603c2e";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      Date.now().toString(),
      "Mentor"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:5173/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      onJoinRoom: () => {
        console.log("Room joined successfuly")
        // console.log(room);
        setRoom((prevState) => !prevState);
      },
      onLeaveRoom : () => {
        setShowForm(true)

        console.log("Room closed successfuly");
        setRoom((prevState) => !prevState);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.srcObject = null;
        }
        if(user?.currentUser?.role === 'mentee')
        {
          navigate('/feedback');
        }
      }
    });
  };

  return (
    <main className="flex flex-col gap-20">
      <div ref={myMeeting} />
      <video
        crossOrigin="anonymous"
        ref={videoRef}
        autoPlay
        className="hidden"
      ></video>
      <div className="w-full min-h-[20vh] flex flex-col items-center justify-center gap-7">
        {!showForm && <div className="w-[60%] min-h-[90%] border-2 border-rose-500 rounded-lg">
          <div className="text-justify w-full h-full p-5">
            <b> Dear Mentor,</b>
            <br />
            <br />
            As you engage in this session, we encourage you to remain present
            and actively participate to provide the best value for both you and
            your mentee. Your expertise and guidance are invaluable, and your
            commitment to the session ensures a meaningful exchange of knowledge
            and insights.
            <br />
            <br />
            {/* Remember, your mentorship plays a crucial role in shaping the future
            of your mentee. Your dedication to this session not only enriches
            their learning experience but also reflects your professionalism and
            commitment to their growth.
            <br />
            <br /> */}
            Thank you for your time and dedication. Let's make this session a
            truly impactful and rewarding experience for both parties involved.
            <br />
            <br />
            <span className="font-semibold">
              Please be aware that this session is continuously monitored to
              ensure the highest quality experience for both you and your
              mentee. Non-compliant behavior such as staying away from the
              camera, using your phone during the session may result in a
              deduction of ratings, which can affect your overall standing as a
              mentor.
            </span>
            <br />
            <br />
            Best regards,
            <br />
            <b>Mentor-Connect team</b>
          </div>
        </div>}
        {
          showForm && <FeedbackForm mentorId={roomId}/>
        }
        {/* {
          setBtnPressed && (
            <button className="w-[200px] h-[40px] bg-blue-400 rounded-md text-white font-semibold" onClick={handleRefresh}>Agree and Continue</button>
          )
        } */}
      </div>
    </main>
  );
};

export default MentorCall;