import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const BASE_UNIT = 8;

const slides = [
  {
    title: "Secured, forever.",
    description:
      "Secured Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
    img:
      "https://raw.githubusercontent.com/react-ui-kit/dribbble2react/master/vpn-app/assets/images/welcome.png",
  },
  {
    title: "Encrypted, forever.",
    description:
      "Encrypted Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
    img:
      "https://raw.githubusercontent.com/react-ui-kit/dribbble2react/master/vpn-app/assets/images/encrypted.png",
  },
  {
    title: "Privacy, forever.",
    description:
      "Privacy Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.",
    img:
      "https://raw.githubusercontent.com/react-ui-kit/dribbble2react/master/vpn-app/assets/images/privacy.png",
  },
];

const Dots = ({ scrollX }) => {
  const dotPosition = Animated.divide(scrollX, width);

  return (
    <View style={styles.dotWrapper}>
      {slides.map((item, index) => {
        const opacity = dotPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return <Animated.View key={`dot-${index}`} style={[styles.dot, { opacity }]} />;
      })}
    </View>
  );
};

const SlideTexts = ({ slideIndex }) => {
  const slide = slides[slideIndex];

  return (
    <>
      <Animated.Text style={styles.title}>{slide && slide.title}</Animated.Text>
      <Animated.Text style={styles.description}>{slide && slide.description}</Animated.Text>
    </>
  );
};

const SlideImages = ({ scrollX }) => {
  return (
    <View style={{ flex: 2 }}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={BASE_UNIT * 2}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}>
        {slides.map((item, index) => (
          <View key={`img-${index}`} style={styles.slideWrapper}>
            <Image source={{ uri: item.img }} resizeMode="contain" style={styles.slideImage} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Vpn = () => {
  const scrollX = new Animated.Value(0);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      setSlideIndex(Math.floor(value / width));
    });
  });

  return (
    <View style={styles.container}>
      <SlideImages scrollX={scrollX} />
      <View style={styles.bottomWrapper}>
        <SlideTexts slideIndex={slideIndex} />
        <Dots scrollX={scrollX} />
        <Animated.View style={styles.buttonWrapper}>
          <TouchableOpacity activeOpacity={0.75} style={styles.buttonContainer} onPress={() => {}}>
            <Text style={styles.buttonTitle}>GET STARTED</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
  slideWrapper: {
    width,
    alignItems: "center",
  },
  slideImage: {
    width: width / 1.5,
    height: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: BASE_UNIT * 3,
    fontWeight: "bold",
  },
  description: {
    textAlign: "justify",
    fontSize: BASE_UNIT * 2,
    marginHorizontal: BASE_UNIT * 3,
    marginVertical: BASE_UNIT * 2,
  },
  bottomWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonTitle: {
    color: "#FFFFFF",
    marginHorizontal: BASE_UNIT * 6,
    marginVertical: BASE_UNIT,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#00A9FC",
    borderRadius: BASE_UNIT * 2,
  },
  buttonWrapper: {
    alignItems: "center",
    margin: BASE_UNIT * 3,
  },
  dotWrapper: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: BASE_UNIT,
  },
  dot: {
    flex: 0,
    width: BASE_UNIT,
    height: BASE_UNIT,
    margin: BASE_UNIT / 2,
    borderRadius: BASE_UNIT,
    backgroundColor: "gray",
  },
});

export default Vpn;
