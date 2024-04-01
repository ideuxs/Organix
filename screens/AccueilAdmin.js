import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Image } from 'react-native';

const AccueilAdmin = () => {
  return (
   <View>
        <Text>Bonjour Admin</Text>
   </View>
  )
}

export default AccueilAdmin;
