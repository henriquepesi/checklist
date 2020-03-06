import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import List from './pages/List';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerShown={false}
        headerBackground
        screenOptions={{
          headerTintColor: '#4BD0A5',
          headerTitleAlign: 'center',
          shadowStyle: '50',
          headerStyle: {
            backgroundColor: 'transparent',
            height: 60,
            elevation: 0,
          },
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="List"
          component={List}
          headerShown={true}
          options={({route}) => ({title: route.params.list})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
