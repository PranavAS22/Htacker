import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert, ScrollView, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

type TrackerData = {
  calories: number | null;
  water: number | null;
  steps: number | null;
};

export default function TrackerScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [caloriesInput, setCaloriesInput] = useState('');
  const [waterInput, setWaterInput] = useState('');
  const [stepsInput, setStepsInput] = useState('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/get-user-id', {
          method: 'GET',
          credentials: 'include', // Important: send cookies
        });

        const data = await response.json();

        if (response.ok && data.userId) {
          setUserId(data.userId);
        } else {
          Alert.alert('Error', 'User not logged in!');
          router.push('/'); // Redirect to login
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        Alert.alert('Error', 'Failed to fetch user ID');
      }
    };

    fetchUserId();
  }, []);

  const handleSaveDay = async () => {
    if (!userId) {
      Alert.alert('Error', 'No user ID found!');
      return;
    }

    const updatedData: TrackerData = {
      calories: caloriesInput ? parseInt(caloriesInput) : null,
      water: waterInput ? parseInt(waterInput) : null,
      steps: stepsInput ? parseInt(stepsInput) : null,
    };

    const missingFields: string[] = [];
    if (updatedData.calories == null) missingFields.push('Calories');
    if (updatedData.water == null) missingFields.push('Water');
    if (updatedData.steps == null) missingFields.push('Steps');

    const proceedSave = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/save-day', {
          method: 'POST',
          credentials: 'include', // Again, include cookies
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...updatedData, userId }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert('Success', 'Day saved successfully!');
          setCaloriesInput('');
          setWaterInput('');
          setStepsInput('');
        } else {
          Alert.alert('Error', data.message || 'Failed to save the day!');
        }
      } catch (error) {
        console.error('Error saving day:', error);
        Alert.alert('Error', 'Failed to save the day!');
      }
    };

    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Fields',
        `You have not entered: ${missingFields.join(', ')}. Continue anyway?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue', onPress: proceedSave },
        ]
      );
    } else {
      proceedSave();
    }
  };

  const handleProfilePress = () => {
    if (userId) {
      router.push({ pathname: '/profilepage', params: { userId } });
    } else {
      Alert.alert('Error', 'No user ID found');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Tracker</Text>
        <Pressable onPress={handleProfilePress}>
          <Image 
            source={require('../assets/images/profile.png')} 
            style={styles.profileIcon} 
          />
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Calories</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter calories"
          placeholderTextColor="#888"
          value={caloriesInput}
          onChangeText={setCaloriesInput}
        />

        <Text style={styles.label}>Water (glasses)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter water intake"
          placeholderTextColor="#888"
          value={waterInput}
          onChangeText={setWaterInput}
        />

        <Text style={styles.label}>Steps</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter steps"
          placeholderTextColor="#888"
          value={stepsInput}
          onChangeText={setStepsInput}
        />
      </View>

      <Pressable style={styles.saveButton} onPress={handleSaveDay}>
        <Text style={styles.saveButtonText}>Save Day</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
