import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { color } from '../../utils/color';

interface CarouselItemProps {
  title: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ title }) => {
  return (
    <View style={styles.viewchild}>
      <Text>{title}</Text>
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  viewchild: {
    borderTopLeftRadius: 20,
    backgroundColor: color.SUB_COLOR,
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
