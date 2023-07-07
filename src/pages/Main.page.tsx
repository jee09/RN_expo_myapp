import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { Ionicons } from '@expo/vector-icons';
import { color } from '../../utils/color';

const windowWidth = Dimensions.get('window').width;

interface CarouselItemProps {
  title: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ title }) => (
  <View style={styles.viewchild}>
    <Text>{title}</Text>
  </View>
);

export const MainPage: React.FC = () => {
  const carouselItems = ['View1', 'View2', 'View3'];

  return (
    <View style={styles.container}>
      <View style={styles.textinput}>
        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={{ marginRight: 8 }}
        />
        <TextInput placeholder="책 이름을 검색해보세요" />
      </View>
      <Carousel
        layout="default"
        data={carouselItems}
        sliderWidth={windowWidth}
        itemWidth={300}
        renderItem={({ item }) => <CarouselItem title={item} />}
        enableSnap={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    backgroundColor: color.SUB_COLOR,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 15,
    width: 280,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewchild: {
    borderTopLeftRadius: 20,
    backgroundColor: color.SUB_COLOR,
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
