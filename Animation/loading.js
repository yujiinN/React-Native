import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";

const SIZE = 100;

const App = () => {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, { toValue: 1, useNativeDriver: true }),
          Animated.spring(progress, { toValue: 0.5, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.spring(scale, { toValue: 2, useNativeDriver: true }),
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.timing(textOpacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        ])
      ])
    ).start();
  }, []);

  const rotateValue = progress.interpolate({
    inputRange: [0.5, 1],
    outputRange: [`${Math.PI}rad`, `${2 * Math.PI}rad`],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            borderRadius: Animated.multiply(progress, SIZE / 2),
            opacity: progress,
            transform: [{ scale }, { rotate: rotateValue }],
          },
        ]}
      />
      <Animated.Text
        style={[styles.text, { opacity: textOpacity }]}
      >
        Fetching Data...
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0, 0, 250, 0.5)",
  },
  text: {
    fontSize: 20,
    marginTop: 80,
  },
});

export default App;
