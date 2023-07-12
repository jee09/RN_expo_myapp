import { RouteProp } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Book } from '../pages/Search.page';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { color } from '../../utils/color';
import { Ionicons } from '@expo/vector-icons';

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
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.wantRead}>
          <Text style={{ fontWeight: '600', color: color.TAB_COLOR_02 }}>
            읽고 싶어요
          </Text>
        </View>
      </View>
      <View style={styles.bookInfo}>
        <View style={{ flexDirection: 'row' }}>
          {book.thumbnail && (
            <Image
              style={{
                width: 120,
                height: 190,
                marginBottom: 10,
                marginRight: 10,
              }}
              source={{ uri: book.thumbnail }}
            />
          )}
          <Text style={{ fontWeight: '700', fontSize: 16 }}>{book.title}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
          <Text>책정보</Text>
        </View>
        <Text>{book.contents}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.MAIN_COLOR,
    paddingVertical: 10,
    // alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    marginTop: 10,
  },
  bookInfo: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  wantRead: {
    alignItems: 'center',
    paddingRight: 25,
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: color.TAB_COLOR,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
  },
});
