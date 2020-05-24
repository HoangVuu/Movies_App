import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import CartScreen from '../screens/Cart';
import CartButton from '../components/CartButton';

const Stack = createStackNavigator();

const AppContainer = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => <CartButton />,
        }}
      />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppContainer;
