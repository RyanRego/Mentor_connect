/* eslint-disable react/prop-types */
import { Rating, rem } from "@mantine/core";
import {
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from "@tabler/icons-react";

const EmojiFacesReview = ({setEmoji}) => {
  const getIconStyle = (color) => ({
    width: rem(40),
    height: rem(40),
    color: color ? `var(--mantine-color-${color}-7)` : undefined,
  });

  const getEmptyIcon = (value) => {
    const iconStyle = getIconStyle();

    switch (value) {
      case 1:
        return <IconMoodCry onClick={()=>setEmoji(1)} style={iconStyle} />;
      case 2:
        return <IconMoodSad onClick={()=>setEmoji(2)} style={iconStyle} />;
      case 3:
        return <IconMoodSmile onClick={()=>setEmoji(3)} style={iconStyle} />;
      case 4:
        return <IconMoodHappy onClick={()=>setEmoji(4)} style={iconStyle} />;
      case 5:
        return <IconMoodCrazyHappy onClick={()=>setEmoji(5)} style={iconStyle} />;
      default:
        return null;
    }
  };

  const getFullIcon = (value) => {
    switch (value) {
      case 1:
        return <IconMoodCry onClick={()=>setEmoji(1)} style={getIconStyle("red")} />;
      case 2:
        return <IconMoodSad onClick={()=>setEmoji(2)} style={getIconStyle("orange")} />;
      case 3:
        return <IconMoodSmile onClick={()=>setEmoji(3)} style={getIconStyle("yellow")} />;
      case 4:
        return <IconMoodHappy onClick={()=>setEmoji(4)} style={getIconStyle("lime")} />;
      case 5:
        return <IconMoodCrazyHappy onClick={()=>setEmoji(5)} style={getIconStyle("green")} />;
      default:
        return null;
    }
  };

  return (
    <Rating
      emptySymbol={getEmptyIcon}
      fullSymbol={getFullIcon}
      highlightSelectedOnly
    />
  );
};

export default EmojiFacesReview;
