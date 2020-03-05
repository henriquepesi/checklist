import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './pages/Main';
import List from './pages/List';

const Stack = createStackNavigator();

export default function Routes({route}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: '',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          shadowStyle: 'none',
          headerStyle: {backgroundColor: '#04D361'},
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen
          name="List"
          component={List}
          options={({route}) => ({title: route.params.list})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
