import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3000/auth/profile', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  if (!profile) return <View style={styles.loading}><Text style={styles.loadingText}>Loading profile...</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: profile.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.email}>{profile.email}</Text>

        <Pressable onPress={() => router.push('/EditProfile')} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>

        {/* View History Button */}
        <Pressable onPress={() => router.push('/history')} style={styles.editButton}>
          <Text style={styles.editButtonText}>View History</Text>
        </Pressable>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  editButtonText: {
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

export default ProfilePage;
