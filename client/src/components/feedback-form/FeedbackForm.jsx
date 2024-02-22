import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { Radio, Group } from "@mantine/core";

import EmojiFacesReview from "../feedback-form/EmojiFacesReview";
import StarRatingReview from "./StarRatingReview";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import axios from "axios";

const FeedbackForm = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 8; // Total questions including Suggestions and Review

  const [emoji, setEmoji] = useState(0); // Default value for emoji rating
  const [experience, setExperience] = useState(0); // Default value for experience rating
  const [preparation, setPreparation] = useState(0); // Default value for preparation rating
  const [communication, setCommunication] = useState(0); // Default value for communication rating
  const [engagement, setEngagement] = useState(0); // Default value for engagement rating
  const [relevant, setRelevant] = useState(0); // Default value for relevant rating
  const [suggestion, setSuggestion] = useState(""); // Default value for suggestion
  const [review, setReview] = useState(""); // Default value for review

  const questions = [
    "How satisfied were you with the mentor session?",
    "Please rate your overall experience",
    "How well-prepared was the mentor for the session?",
    "Did the mentor communicate effectively with you?",
    "Did you feel engaged and involved throughout the session?",
    "How relevant were the topics discussed to your goals or needs?",
    "Any suggestions for improvement?",
    "Share your overall review and feedback",
  ];

  const submitForm = () => {
    console.log("Form submitted");
    axios.post("/feedback",{
      emoji,
      experience,
      preparation,
      communication,
      engagement,
      relevant,
      suggestion,
      review
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    close();
  }

  console.log(emoji, "emoji")
  console.log(experience, "experience")
  console.log(preparation, "preparation")
  console.log(communication, "communication")
  console.log(engagement, "engagement")
  console.log(relevant, "relevant")
  console.log(suggestion, "suggestion")
  console.log(review, "review")

  const renderQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return <EmojiFacesReview setEmoji={setEmoji}/>;
      case 2:
        return <StarRatingReview setExperience={setExperience} />;
      case 3:
        return (
          <Radio.Group name="favoriteFramework" withAsterisk>
            <Group mt="xs">
              <Radio value="Excellent" onClick={()=>setPreparation(5)} label="Excellent" />
              <Radio value="Good" onClick={()=>setPreparation(4)} label="Good" />
              <Radio value="Fair" onClick={()=>setPreparation(3)} label="Fair" />
              <Radio value="Bad" onClick={()=>setPreparation(1)} label="Bad" />
            </Group>
          </Radio.Group>
        );
      case 4:
        return (
          <Radio.Group name="favoriteFramework" withAsterisk>
            <Group mt="xs">
              <Radio value="Excellent" onClick={()=>setCommunication(5)} label="Excellent" />
              <Radio value="Good" onClick={()=>setCommunication(4)} label="Good" />
              <Radio value="Fair" onClick={()=>setCommunication(3)} label="Fair" />
              <Radio value="Bad" onClick={()=>setCommunication(1)} label="Bad" />
            </Group>
          </Radio.Group>
        );
      case 5:
        return (
          <Radio.Group name="favoriteFramework" withAsterisk>
            <Group mt="xs">
              <Radio value="Excellent" onClick={()=>setEngagement(5)} label="Excellent" />
              <Radio value="Good" onClick={()=>setEngagement(4)} label="Good" />
              <Radio value="Fair" onClick={()=>setEngagement(3)} label="Fair" />
              <Radio value="Bad" onClick={()=>setEngagement(1)} label="Bad" />
            </Group>
          </Radio.Group>
        );
      case 6:
        return (
          <Radio.Group name="favoriteFramework" withAsterisk>
            <Group mt="xs">
              <Radio value="Excellent" onClick={()=>setRelevant(5)} label="Excellent" />
              <Radio value="Good" onClick={()=>setRelevant(4)} label="Good" />
              <Radio value="Fair" onClick={()=>setRelevant(3)} label="Fair" />
              <Radio value="Bad" onClick={()=>setRelevant(1)} label="Bad" />
            </Group>
          </Radio.Group>
        );
      case 7: // Suggestion
        return (
          <div className="flex flex-col w-full items-center">
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder={
                "Any suggestions?"
              }
              className="w-2/3 p-2.5 mt-2 outline-none border border-gray-300 rounded-lg focus:border-blue-700"
            />
          </div>
        );
      case 8: // Review
        return (
          <div className="flex flex-col w-full items-center">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder={
                  "Reviews on this session?"
              }
              className="w-2/3 p-2.5 mt-2 outline-none border border-gray-300 rounded-lg focus:border-blue-700"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleNextQuestion = () => {
    console.log("emoji", emoji)
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      close(); // Close modal after submitting the form
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div>
      <Modal size="60%" opened={opened} onClose={close}>
        <div className="p-6 text-gray-700">
          <form
            className="flex flex-col gap-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex items-center flex-col w-full">
              <span className="text-2xl font-semibold text-center">
                {questions[currentQuestion - 1]}
              </span>
              <div className="flex justify-center mt-6 w-full">
                {renderQuestion()}
              </div>
            </div>

            <div
              className={`${
                currentQuestion > 1 ? "justify-between" : "justify-end"
              } flex`}
            >
              {currentQuestion > 1 && (
                <div>
                  <button
                    type="button"
                    onClick={handlePreviousQuestion}
                    className="flex item-center px-9 py-4 bg-gray-400 text-white rounded-lg shadow-sm text-lg font-semibold"
                  >
                    <IconArrowLeft className="mr-2" />
                    Previous
                  </button>
                </div>
              )}

              <div>
                {currentQuestion < totalQuestions ? (
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="flex item-center px-9 py-4 bg-blue-600 text-white rounded-lg shadow-sm"
                    >
                      Next
                      <IconArrowRight className="ml-2" />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <button
                      onClick={submitForm}
                      type="submit"
                      className="px-9 py-4 text-lg font-semibold bg-green-700 text-white rounded-lg shadow-sm"
                    >
                      Submit form
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Button variant="default" onClick={open}>Open modal</Button>
    </div>
  );
};

export default FeedbackForm;
