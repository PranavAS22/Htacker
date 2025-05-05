import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const EditProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newProfileImage, setNewProfileImage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/auth/profile', { credentials: 'include' });
        const data = await res.json();
        setProfile(data);
        setNewUsername(data.username);
        setNewProfileImage(data.profileImage);
        console.log('Profile data fetched:', data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        Alert.alert('Error', 'Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const base64 = result.assets[0].base64;
      setNewProfileImage(`data:image/jpeg;base64,${base64}`);
      console.log('Image uploaded successfully');
    } else {
      console.log('Image upload canceled');
    }
  };

  const handleSave = async () => {
    console.log('Saving profile changes...');

    if (!newUsername.trim() || !newProfileImage.trim()) {
      Alert.alert('Error', 'Please fill out both fields!');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: newUsername,
          profileImage: newProfileImage,
        }),
      });

      if (res.ok) {
        console.log('Profile updated successfully');
        router.replace('/profilepage'); // Navigate immediately
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        const errorData = await res.json();
        Alert.alert('Error', errorData.message || 'Failed to update profile.');
        console.log('Error:', errorData.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while saving.');
    }
  };

  if (!profile) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: newProfileImage }}
          style={styles.profileImage}
        />

        <Pressable style={styles.uploadButton} onPress={handleImageUpload}>
          <Text style={styles.uploadButtonText}>Upload New Image</Text>
        </Pressable>

        <TextInput
          style={styles.input}
          placeholder="New Username"
          placeholderTextColor="#888"
          value={newUsername}
          onChangeText={setNewUsername}
        />

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  profileContainer: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginTop: 10,
  },
  uploadButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 15,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default EditProfilePage;
