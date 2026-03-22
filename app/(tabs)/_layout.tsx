import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { View } from 'react-native';
import { COLORS, FONTS } from '@/src/lib/constants';

function TabBarIcon({
  name,
  color,
  focused,
}: {
  name: React.ComponentProps<typeof Feather>['name'];
  color: string;
  focused: boolean;
}) {
  return (
    <View
      style={{
        width: 48,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: focused ? 'rgba(209, 250, 229, 0.6)' : 'transparent',
      }}
    >
      <Feather name={name} size={20} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.green800,
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: 'rgba(0,0,0,0.06)',
          borderTopWidth: 1,
          paddingHorizontal: 8,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.semiBold,
          fontSize: 10,
          letterSpacing: 0.3,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="book-open" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="bar-chart-2" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="settings" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
