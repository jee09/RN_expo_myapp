import { RouteProp } from '@react-navigation/native';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Book } from '../pages/Search.page';
import React from 'react';

import { color } from '../../utils/color';

type RootStackParamList = {
  SearchPage: undefined;
  BookDetailPage: { book: Book };
};

type BookDetailPageRouteProp = RouteProp<RootStackParamList, 'BookDetailPage'>;

type Props = {
  route: BookDetailPageRouteProp;
};

export const BookDetailPage: React.FC<Props> = ({ route }) => {
  const { book } = route.params;

  return (
    <View style={styles.container}>
      {book.thumbnail && (
        <Image
          style={{ width: 300, height: 340 }}
          source={{ uri: book.thumbnail }}
        />
      )}
      <Text>{book.title}</Text>
      <Text>{book.authors.join(', ')}</Text>

      <Text>{book.contents}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.SUB_COLOR,
    // alignItems: 'center',
  },
});
