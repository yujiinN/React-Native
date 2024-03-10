import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const App = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchWidth] = useState(new Animated.Value(0));
  const [searchQuery, setSearchQuery] = useState("");

  const handleExpand = () => {
    Animated.timing(searchWidth, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={handleExpand}>
            <AntDesign
              name="search1"
              size={24}
              color="black"
              style={styles.iconSearch}
            />
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.searchInput,
              {
                width: searchWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "75%"],
                }),
              },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </Animated.View>
          {expanded && (
            <TouchableOpacity onPress={handleExpand}>
              <View style={styles.iconCancelBackground}>
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color="black"
                  style={styles.iconCancel}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingLeft: 10,
  },
  searchInput: {
    overflow: "hidden",
    height: 50,
  },
  input: {
    flex: 1,
  },
  iconSearch: {
    paddingRight: 10,
  },
  iconCancelBackground: {
    borderLeftWidth: 1,
    borderColor: "#ccc",
    padding: 12,
  },
  iconCancel: {
    paddingLeft: 5,
  },
});

export default App;
