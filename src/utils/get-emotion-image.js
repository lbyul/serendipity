import emotion01 from "./../assets/emotion01.png";
import emotion02 from "./../assets/emotion02.png";
import emotion03 from "./../assets/emotion03.png";
import emotion04 from "./../assets/emotion04.png";
import emotion05 from "./../assets/emotion05.png";
import emotion06 from "./../assets/emotion06.png";
import emotion07 from "./../assets/emotion07.png";
import emotion08 from "./../assets/emotion08.png";
import emotion09 from "./../assets/emotion09.png";

const emotionImages = {
  1: emotion01,
  2: emotion02,
  3: emotion03,
  4: emotion04,
  5: emotion05,
  6: emotion06,
  7: emotion07,
  8: emotion08,
  9: emotion09,
};

export function getEmotionImage(emotionId) {
  return emotionImages[emotionId] || null;
}
