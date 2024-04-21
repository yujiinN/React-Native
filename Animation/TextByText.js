import React, { useEffect } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const FadeInText = ({ text, duration, delay }) => {
  const animatedText = text.split('').map((char, index) => ({
    char,
    index,
    animation: new Animated.Value(0),
  }));

  useEffect(() => {
    Animated.sequence(
      animatedText.map(({ animation }, index) =>
        Animated.timing(animation, {
          toValue: 1,
          duration: duration,
          delay: delay + index * 50,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [animatedText, duration, delay]);

  return (
    <View style={{ flexDirection: 'row' }}>
      {animatedText.map(({ char, animation }, index) => (
        <Animated.Text key={index} style={[styles.text, { opacity: animation }]}>
          {char}
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
    // Add more styles as needed
  },
});

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FadeInText text="Pocket Financer" duration={100} delay={1} />
    </View>
  );
};

export default App;
