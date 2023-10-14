import React, { useRef, useEffect } from "react";
import LottieView from "lottie-react-native";

export default function AnimationPlayer({
  animation,
  autoPlay = true,
  loop = true,
}) {
  const animRef = useRef(null);

  useEffect(() => {
    if (autoPlay) {
      animRef.current.play();
    }
  });

  return (
    <LottieView
      ref={animRef}
      style={{
        width: 200,
        height: 200,
        backgroundColor: "transparent",
      }}
      loop={loop}
      source={animation}
    />
  );
}
