import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importez vos Ã©crans
import LoginScreen from './screens/LoginScreen';
import ForgotPass from './screens/ForgotPass';
import AccueilScreen from './screens/AccueilScreen';
import Register from './screens/Register';
import ScanQr from './screens/ScanQr';
import Profil from './screens/Profil';
import RechercheScreen from './screens/RechercheScreen';
import RechercheCode from './screens/RechercheCode';
import AccueilAdmin from './screens/AccueilAdmin';
import SignalementAdmin from './screens/SignalementsAdmin';
import AnalyseAdmin from './screens/AnalyseAdmin';
import AnalyseNbMedoc from './screens/AnalyseNbMedocScreen';
import AnalyseAge from './screens/AnalyseAgeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Connexion' }}/>
        <Stack.Screen name="Register" component={Register} options={{ title: 'Inscription' }} />
        <Stack.Screen name="Home" component={TabNav} options={{ title: 'Solutions Organix' }}/>
        <Stack.Screen name="Forgot" component={ForgotPass} options={{ title: 'Mot de passe oublié' }}/>
        <Stack.Screen name="Rechercher" component={RechercheScreen} />
        <Stack.Screen name="Code" component={RechercheCode}/>
        <Stack.Screen name="Scan" component={ScanQr} options={{ title: 'Scanner DataMtrix' }}/>
        <Stack.Screen name="User" component={Profil} />
        <Stack.Screen name="Admin" component={AdminTabNav} options={{ title: 'Solutions Organix' }}/>
        <Stack.Screen name="NbMedoc" component={AnalyseNbMedoc} options={{ title: 'Analyse' }}/>
        <Stack.Screen name="AgeAnalyse" component={AnalyseAge} options={{ title: 'Analyse' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TabNav = () => (
  <Tab.Navigator>
    <Tab.Screen name="Accueil" component={AccueilScreen} 
      options={{
        title:"Accueil",
        headerShown:false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./images/accueil.png')}
            style={{ width: 30, height: 30 }}/>
        )
      }}
    />
    <Tab.Screen name="Rechercher" component={RechercheScreen} 
      options={{
        title:"Signaler",
        headerShown:false, 
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./images/signaler.png')}
            style={{ width: 30, height: 30 }}/>
        )
      }}
    />
    <Tab.Screen name="User" component={Profil} 
      options={{
        title:"Profil", 
        headerShown:false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./images/utilisateur.png')}
            style={{ width: 30, height: 30 }}/>
        )
      }}
    />
  </Tab.Navigator>
);

const AdminTabNav = () => (
  <Tab.Navigator>
    <Tab.Screen name="Accueil" component={AccueilAdmin} 
      options={{
        title:"Accueil",
        headerShown:false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./images/accueil.png')}
            style={{ width: 30, height: 30 }}/>
        )
      }}
    />
    <Tab.Screen name="Analyse" component={AnalyseAdmin}
      options={{
        title:"Analyse",
        headerShown:false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./images/analyse.png')}
            style={{ width: 30, height: 30 }}/>
        )
      }}
    />
    <Tab.Screen name="Signalement" component={SignalementAdmin}
      options={{
        title:"Signalement",
        headerShown:false,
        tabBarIcon: ({ focused }) => (
          <Image
            source={require('./images/signalements.png')}
            style={{ width: 30, height: 30 }}/>
        )
      }}
    />
  </Tab.Navigator>
);
