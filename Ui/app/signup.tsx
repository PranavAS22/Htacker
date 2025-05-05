import React, { useState } from 'react';
import { View, Image, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { defaultImageBase64 } from '../assets/images/defaultImage';

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'Failed to sign up. Please try again.';
  };

  const handleSignUp = async () => {
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profileImage: defaultImageBase64,
        }),        
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setError('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.replace('/');
      }, 1000); // Redirect after 1 second
      
    } catch (error) {
      console.error('Registration error:', error);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/login.svg')} 
        style={styles.image} 
        accessibilityIgnoresInvertColors
      />

      <Text style={styles.title}>Create Account</Text>

      {error ? <Text style={[styles.errorText, error === 'Account created successfully! Redirecting...' && styles.successText]}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="User Name"
        placeholderTextColor="#aaa"
        value={formData.name}
        onChangeText={(text) => handleChange('name', text)}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        value={formData.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password (min 6 characters)"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => handleChange('password', text)}
        autoCapitalize="none"
      />

      <Pressable 
        style={({ pressed }) => [
          styles.button,
          (loading || pressed) && styles.disabledButton
        ]} 
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </Pressable>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Link href="/" style={styles.loginLink}>
          <Text style={styles.loginLinkText}>Login</Text>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginVertical: 8,
    color: '#fff',
    backgroundColor: '#1a1a1a',
  },
  button: {
    width: '100%',
    backgroundColor: '#0066ff',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#aaa',
  },
  loginLink: {
    marginLeft: 4,
  },
  loginLinkText: {
    color: '#0066ff',
    fontWeight: '500',
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  successText: {
    color: '#00cc66',
  },
});

export default SignUpScreen;
