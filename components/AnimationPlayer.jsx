import React, {useRef, useEffect} from 'react';

import LottieView from 'lottie-react-native';

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
      resizeMode="cover"
      style={{
        height: 250,
      }}
      loop={loop}
      source={animation}
    />
  );
}
