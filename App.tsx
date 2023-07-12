import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MainPage } from './src/pages/Main.page';
import { NotePage } from './src/pages/Note.page';
import { StatsPage } from './src/pages/Stats.page';
import { Book, SearchPage } from './src/pages/Search.page';
import { BookDetailPage } from './src/pages/Search.result.page';

import { color } from './utils/color';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const Tab = createBottomTabNavigator();
type RootStackParamList = {
  MainPage: undefined;
  SearchPage: undefined;
  NotePage: undefined;
  StatsPage: undefined;
  BookDetailPage: { book: Book };
};

const Stack = createStackNavigator<RootStackParamList>();
type IconName = 'book-outline' | 'pencil' | 'stats-chart';

interface TabItem {
  name: string;
  component: React.FC<{}>;
  icon: IconName;
}

const tabs: TabItem[] = [
  {
    name: '서재',
    component: MainPage,
    icon: 'book-outline',
  },
  {
    name: '노트',
    component: NotePage,
    icon: 'pencil',
  },
  {
    name: '통계',
    component: StatsPage,
    icon: 'stats-chart',
  },
];
function LibraryStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="BookDetailPage" component={BookDetailPage} />
    </Stack.Navigator>
  );
}

function NoteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NotePage" component={NotePage} />
    </Stack.Navigator>
  );
}

function StatsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StatsPage" component={StatsPage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: color.MAIN_COLOR }}
        edges={['top']}
      >
        <StatusBar backgroundColor={color.MAIN_COLOR} />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                height: 90,
                backgroundColor: color.TAB_COLOR,
                paddingBottom: 30,
              },
              headerShown: false,
              tabBarActiveTintColor: color.TAB_COLOR_02,
              tabBarInactiveTintColor: color.MAIN_COLOR,
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: '800',
              },
            }}
          >
            <Tab.Screen
              name="서재"
              component={LibraryStack}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="book-outline" size={22} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="노트"
              component={NoteStack}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="pencil" size={22} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="통계"
              component={StatsStack}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="stats-chart" size={22} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
