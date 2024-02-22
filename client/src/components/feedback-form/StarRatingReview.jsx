/* eslint-disable react/prop-types */
import { Rating } from "@mantine/core";

const StarRatingReview = ({setExperience}) => {
  return <Rating size={"lg"} onChange={setExperience} />;
};

export default StarRatingReview;
