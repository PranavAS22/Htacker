import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// ✅ Define the type for one history record
interface DailyRecord {
  dayNumber: number;
  calories: number;
  water: number;
  steps: number;
}

const ViewHistory = () => {
  const [history, setHistory] = useState<DailyRecord[]>([]); // ✅ Tell TS this is an array of DailyRecord
  const userId = '12345'; // Dummy userId

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/daily-records?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data)) {
          setHistory(data); // ✅ Now no error
        } else {
          console.error('Data is not an array', data);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {history.length === 0 ? (
        <Text style={styles.noHistoryText}>No history found.</Text>
      ) : (
        history.map((day, index) => (
          <View key={index} style={styles.recordCard}>
            <Text style={styles.recordTitle}>Day {day.dayNumber}</Text>
            <Text style={styles.recordText}>Calories: {day.calories ?? '-'}</Text>
            <Text style={styles.recordText}>Water (glasses): {day.water ?? '-'}</Text>
            <Text style={styles.recordText}>Steps: {day.steps ?? '-'}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
    flexGrow: 1,
  },
  recordCard: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  recordTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  recordText: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 5,
  },
  noHistoryText: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ViewHistory;
