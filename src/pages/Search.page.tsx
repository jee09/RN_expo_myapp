import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';
import { color } from '../../utils/color';
import { kakaoApi } from '../../utils/api';

const windowWidth = Dimensions.get('window').width;

export interface Book {
  authors: string[];
  title: string;
  thumbnail: string;
  contents: string;
  isbn: string;
}

interface ApiResponse {
  documents: Book[];
  meta: {
    is_end: boolean;
  };
}

interface Props {
  apiResponse: ApiResponse;
}

const BookItem: React.FC<{ item: Book; index: number }> = ({ item, index }) => {
  type RootStackParamList = {
    SearchPage: undefined;
    BookDetailPage: { book: Book };
  };

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'SearchPage'>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetailPage', { book: item })}
    >
      <View>
        {index !== 0 && <View style={styles.separator} />}
        <View style={styles.bookContainer}>
          {item.thumbnail ? (
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          ) : (
            <View style={{ ...styles.thumbnail, backgroundColor: 'white' }} />
          )}
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontWeight: 'bold', marginBottom: 10 }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>
            <Text>{item.authors.join(', ')}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SearchPage: React.FC = () => {
  const [searchResult, setSearchResult] = useState<ApiResponse | null>(null);
  const [searchWord, setSearchWord] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (searchWord === '') {
      setSearchResult(null);
      return;
    }
    fetchData(searchWord, page)
      .then((fetchedData) => {
        setSearchResult(fetchedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchWord]);

  const onChangeText = (payload: string) => setText(payload);

  const fetchData = async (
    searchWord: string,
    page: number,
  ): Promise<ApiResponse> => {
    try {
      setIsLoading(true);
      const response = await kakaoApi.get('/search/book', {
        params: {
          query: searchWord,
          size: 50,
          page,
        },
      });

      setIsLoading(false);

      if (!response.data.meta.is_end) {
        setSearchResult((prev) => ({
          ...response.data,
          documents: [...(prev?.documents || []), ...response.data.documents],
        }));
        setPage(page + 1);
      } else {
        setIsEnd(true);
      }

      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      throw error;
    }
  };

  const pressSearch = () => {
    if (text === '') {
      alert('빈 칸은 입력할 수 없습니다.');
      return;
    }
    setSearchWord(text);
    setText('');
    setPage(1);
    setIsEnd(false);
  };

  const handleEnd = () => {
    if (!isEnd) {
      fetchData(searchWord, page);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.textinput}>
          <Ionicons
            name="search"
            size={20}
            color={color.TAB_COLOR}
            style={{ marginRight: 8 }}
          />
          <TextInput
            value={text}
            onSubmitEditing={pressSearch}
            onChangeText={onChangeText}
            ref={inputRef}
            placeholder={'제목으로 검색해주세요.'}
            placeholderTextColor={color.MAIN_COLOR}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>취소</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.result}>
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={color.TAB_COLOR} />
          </View>
        )}
        {searchResult ? (
          searchResult.documents.length > 0 ? (
            <FlatList
              data={searchResult.documents}
              renderItem={({ item, index }) => (
                <BookItem item={item} index={index} />
              )}
              keyExtractor={(item) => item.isbn}
              onEndReached={handleEnd}
              onEndReachedThreshold={0.1}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View
              style={{
                flex: 1,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>검색 결과가 없습니다.</Text>
            </View>
          )
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.SUB_COLOR,
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.1,
    width: windowWidth,
    backgroundColor: color.MAIN_COLOR,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    paddingBottom: 10,
    paddingTop: 15,
  },
  textinput: {
    backgroundColor: color.SUB_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    fontSize: 15,
    width: 260,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  cancel: {
    paddingVertical: 16,
  },
  result: {
    flex: 1,
    width: windowWidth,
    marginTop: 10,
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  thumbnail: { width: 70, height: 90, marginRight: 10 },
  separator: {
    height: 1,
    backgroundColor: color.MAIN_COLOR,
    marginVertical: 5,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
});
