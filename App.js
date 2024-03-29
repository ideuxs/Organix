import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Importez vos écrans
import LoginScreen from './screens/LoginScreen';
import ForgotPass from './screens/ForgotPass';
import AccueilScreen from './screens/AccueilScreen';
import Register from './screens/Register';
import ScanQr from './screens/ScanQr';
import Profil from './screens/Profil';

const Stack = createStackNavigator();  // Déclarez Stack ici
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false, // Masquer la barre de navigation par défaut
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={TabNav}/>
        <Stack.Screen name="Forgot" component={ForgotPass} />
        <Stack.Screen name="Scan" component={ScanQr} />
        <Stack.Screen name="User" component={Profil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TabNav = () => {
    return <Tab.Navigator>
      <Tab.Screen name = "Accueil" component={AccueilScreen} 
      options={{title:"Accueil",headerShown:false,
      tabBarIcon: ({ focused }) => (
        <Image
          source={require('./images/accueil.png')} // Replace with your photo path
          style={{ width: 30, height: 30 }}/>)}}
      
      />
      <Tab.Screen name = "Scan" component={ScanQr} 
      options={{title:"Scan",headerShown:false, 
      tabBarIcon: ({ focused }) => (
        <Image
          source={require('./images/qr-code.png')} // Replace with your photo path
          style={{ width: 30, height: 30 }}/>) }}
      />
      <Tab.Screen name = "User" component={Profil} 
      options={{title:"Profil", headerShown:false,
      tabBarIcon: ({ focused }) => (
        <Image
          source={require('./images/utilisateur.png')} // Replace with your photo path
          style={{ width: 30, height: 30 }}/>) }}
      />
    </Tab.Navigator>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
