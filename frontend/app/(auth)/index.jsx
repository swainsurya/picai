import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('window');

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('@/assets/images/login_img.png')}
              resizeMode="contain"
            />
          </View>

          {/* Form */}
          <Formik
            initialValues={{ fullName: '', email: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              console.log('Signup Form Data:', values);
              // Add your backend integration logic here
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                <Text style={styles.title}>Create Account</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor="#A0A4A8"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#A0A4A8"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#A0A4A8"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TouchableOpacity
                  style={[styles.button, isLoading && { opacity: 0.6 }]}
                  onPress={()=>setIsLoading(true)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>


                <View style={styles.loginLinkContainer}>
                  <Text style={styles.loginText}>Already have an account? </Text>
                  <Text style={styles.loginLink}>Login</Text>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>

      <Text style={styles.versionText}>Version 1.0</Text>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.25,
  },
  formContainer: {
    width: width * 0.9,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#111827',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    color: '#111827',
  },
  button: {
    backgroundColor: '#6366F1',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#6B7280',
    fontSize: 14,
  },
  loginLink: {
    color: '#6366F1',
    fontWeight: '600',
    fontSize: 14,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginBottom: 6,
    marginTop: -8,
  },
  versionText: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 12,
    color: '#9CA3AF',
  },
});
