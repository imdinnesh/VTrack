
import React from 'react';

//Navigation
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

//screens
import OpeningScreen from './screens/OpeningScreen';
import Onboarding1 from './screens/Onboarding1';
import Onboarding2 from './screens/Onboarding2';
import Onboarding3 from './screens/Onboarding3';
import GetStarted from './screens/GetStarted';





const Stack = createNativeStackNavigator()

function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='OpeningScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='OpeningScreen' component={OpeningScreen}/>
        <Stack.Screen name='Onboarding1'component={Onboarding1}/>
        <Stack.Screen name='Onboarding2'component={Onboarding2}/>
        <Stack.Screen name='Onboarding3'component={Onboarding3}/>
        <Stack.Screen name='GetStarted'component={GetStarted}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;