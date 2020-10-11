import { mapping, light } from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';

import Details from './Details';
import Gallery from './Gallery';

const Stack = createStackNavigator();

const App = () => (
  <ApplicationProvider mapping={mapping} theme={light}>
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApplicationProvider>
);

export default App;
