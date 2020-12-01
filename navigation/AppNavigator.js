import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// import components
import HomeScreen from '../screens/Home'
import BanksScreen from '../screens/Banks'

// Stack and Tab to add Components
// const Tab = createBottomTabNavigator()
const Tab = createMaterialBottomTabNavigator()

function AppNavigator () {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        activeColor="#ffffff"
        inactiveColor="#555"
        barStyle={{ backgroundColor: '#000' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === 'Home') {
              iconName = focused ? 'home-circle' : 'home-outline' 
            } else if (route.name === 'Banks') {
              iconName = focused ? 'bank' : 'bank-outline'
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons name={iconName} size={24} color={color} />
          },
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} options={{ title: 'Bienvenido' }} />
        <Tab.Screen name='Banks' component={BanksScreen} options={{ title: 'Bancos' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator