import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { MainPage } from './src/pages/Main.page';
import { NotePage } from './src/pages/Note.page';
import { StatsPage } from './src/pages/Stats.page';

import { color } from './utils/color';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

type IconName = 'book-outline' | 'pencil' | 'stats-chart';

interface TabItem {
  name: string;
  component: React.ComponentType;
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
              tabBarActiveTintColor: color.MAIN_COLOR,
              tabBarInactiveTintColor: color.TAB_COLOR_02,
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: '800',
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab.Screen
                key={index}
                name={tab.name}
                component={tab.component}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Ionicons name={tab.icon} size={22} color={color} />
                  ),
                }}
              />
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
