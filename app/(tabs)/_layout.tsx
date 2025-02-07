import { Tabs } from 'expo-router';
import { CustomTabBar } from '../../components/CustomTabBar';
import { COLORS } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home'
        }}
      />
      <Tabs.Screen
        name="breathing"
        options={{
          title: 'Breathe'
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile'
        }}
      />
    </Tabs>
  );
}

