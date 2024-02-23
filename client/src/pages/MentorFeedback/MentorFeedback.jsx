import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';

const MentorFeedback = () => {
    const [feedback, setFeedback] = useState();
    const user = useSelector((state) => state.user);
    console.log(user?.currentUser?.mentor?._id)
    const mentorId = user?.currentUser?.mentor?._id;
    useEffect(() => {
        if (mentorId) {
            axios.post('/fetch-feedback', { mentorId })
              .then(res => {
                // Update state with feedback data
                console.log(res.data);
                setFeedback(res.data);
              })
              .catch(err => {
                console.error('Error fetching feedback:', err);
                // Handle error if necessary
              });
          }
    }, [])
  return (
    <main className='w-full min-h-[100vh]'>
        {feedback && feedback.map((feed, index) => (
        <div key={index} className="feedback-item">
          {/* Render feedback item */}
          <p>{feed.review}</p>
        </div>
      ))}{
        !feedback && <div>Nothing to show</div>
      }
    </main>
  )
}

export default MentorFeedback
