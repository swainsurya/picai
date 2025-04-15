import { Link } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Login = () => {
  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.innerContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require('@/assets/images/login_img.png')}
            />
          </View>

          {/* Login Form */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Login</Text>

            <TextInput
              style={styles.inputBox}
              placeholder="Email ID"
              placeholderTextColor="#999"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
            />

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity>
                <Link href={"/"} style={styles.signupLink}> Sign up</Link>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Text style={styles.versionText}>Version 1.0</Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#F4F6F8',
    },
    innerContainer: {
      alignItems: 'center',
      padding: 20,
    },
    logoContainer: {
      width: '100%',
      height: height * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: '80%',
      height: '100%',
    },
    loginContainer: {
      width: '100%',
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 20,
      elevation: 5,
      shadowColor: '#00000022',
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    loginTitle: {
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 20,
      color: '#1C1C1E',
      alignSelf: 'center',
    },
    inputBox: {
      width: '100%',
      padding: 12,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: '#D1D5DB',
      marginBottom: 15,
      fontSize: 16,
      color: '#1C1C1E',
      backgroundColor: '#F9FAFB',
    },
    forgotBtn: {
      alignSelf: 'flex-end',
      marginBottom: 15,
    },
    forgotText: {
      color: '#5568FE',
      fontWeight: '500',
    },
    loginButton: {
      backgroundColor: '#5568FE',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 5,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
    },
    signupText: {
      fontSize: 14,
      color: '#1C1C1E',
    },
    signupLink: {
      fontSize: 14,
      color: '#5568FE',
      fontWeight: '600',
    },
    versionText: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        color: '#A0A4A8',
        fontSize: 14,
      }
      
  });
  