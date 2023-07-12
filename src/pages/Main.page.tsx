import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { color } from '../../utils/color';
import CarouselItem from '../components/CarouselItem';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

type RootStackParamList = {
  SearchPage: undefined;
};

export const MainPage: React.FC = () => {
  const carouselItems = ['읽고 싶어요', '읽고 있어요', '다 읽었어요'];

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'SearchPage'>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SearchPage')}>
        <View style={styles.textinput}>
          <Ionicons
            name="search"
            size={20}
            color={color.TAB_COLOR}
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="책 검색해서 추가하기"
            placeholderTextColor={color.MAIN_COLOR}
            onFocus={() => navigation.navigate('SearchPage')}
          />
        </View>
      </TouchableOpacity>
      <Carousel
        layout="default"
        data={carouselItems}
        sliderWidth={windowWidth}
        itemWidth={300}
        renderItem={({ item }: { item: string }) => (
          <CarouselItem title={item} />
        )}
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 15,
    width: 300,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
