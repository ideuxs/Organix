import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Card, List, Divider } from 'react-native-paper';

const AnalyseAgeScreen = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const signalementsRef = ref(db, 'signalements/');
    const usersRef = ref(db, 'users/');

    const fetchStats = async () => {
      onValue(signalementsRef, (snapshot) => {
        const signalements = snapshot.val();
        const ageCounts = { '0-15': 0, '15-30': 0, '30-50': 0, '50-65': 0, '65-100': 0 };

        const userPromises = Object.values(signalements).map((signalement) =>
          new Promise((resolve) => {
            const userId = signalement.userId;
            const userSnapshot = onValue(ref(db, `users/${userId}`), (userSnap) => {
              const user = userSnap.val();
              const age = user.age;
              if (age <= 15) ageCounts['0-15']++;
              else if (age <= 30) ageCounts['15-30']++;
              else if (age <= 50) ageCounts['30-50']++;
              else if (age <= 65) ageCounts['50-65']++;
              else if (age <= 100) ageCounts['65-100']++;
              resolve();
            });
          })
        );

        Promise.all(userPromises).then(() => {
          const sortedStats = Object.entries(ageCounts).sort((a, b) => b[1] - a[1]);
          setStats(sortedStats);
        });
      });
    };

    fetchStats();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {stats.map(([ageRange, count], index) => (
        <Card key={index} style={styles.card}>
          <List.Item
            title={`Tranche d'âge ${ageRange}`}
            description={`${count} signalement(s)`}
            titleStyle={styles.titleStyle}
            descriptionStyle={styles.descriptionStyle}
          />
          <Divider />
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#011e36', // Updated to match the dark blue background from LoginScreen
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#38d2aa', // Using the accent color for cards
    borderRadius: 10, // Rounded corners for the cards
  },
  titleStyle: {
    color: '#ffffff', // White text for better readability
    fontWeight: 'bold', // Bold text for the title
  },
  descriptionStyle: {
    color: '#ffffff', // Ensuring description is also white for consistency
  },
});

export default AnalyseAgeScreen;
