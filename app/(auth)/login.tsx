import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, SafeAreaView, Platform } from 'react-native';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const { signIn, signInWithGoogle, signInWithApple, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>CalmPulse</Text>
            <Ionicons name="leaf" size={32} color={COLORS.primary} style={styles.logoIcon} />
          </View>
          <Text style={styles.title}>Welcome to CalmPulse</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              autoComplete="email"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="go"
              onSubmitEditing={() => signIn(email, password)}
              autoComplete="off"
              textContentType="oneTimeCode"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity 
            style={[styles.button, styles.loginButton]}
            onPress={() => signIn(email, password)}
          >
            <Text style={[styles.buttonText, styles.loginButtonText]}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.socialButton]}
              onPress={signInWithGoogle}
            >
              <Ionicons name="logo-google" size={24} color="#000" />
              <Text style={[styles.buttonText, styles.socialButtonText]}>Google</Text>
            </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <TouchableOpacity 
                style={[styles.button, styles.socialButton]}
                onPress={signInWithApple}
              >
                <Ionicons name="logo-apple" size={24} color="#000" />
                <Text style={[styles.buttonText, styles.socialButtonText]}>Apple</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/(auth)/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: SPACING.sm,
  },
  logoIcon: {
    marginLeft: SPACING.xs,
  },
  inputContainer: {
    marginBottom: SPACING.md,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  socialButtonText: {
    color: '#000',
    marginLeft: SPACING.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    color: '#666',
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  form: {
    gap: SPACING.lg,
    width: '100%',
    marginBottom: SPACING.xl,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: SPACING.lg,
    borderRadius: SPACING.md,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    marginTop: SPACING.md,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  footerText: {
    color: '#666',
  },
  footerLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: SPACING.xl,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING.xxxl,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: SPACING.xxl,
  },
  buttonContainer: {
    gap: SPACING.lg,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    borderRadius: SPACING.lg,
    gap: SPACING.md,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleButton: {
    backgroundColor: '#fff',
  },
  appleButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  termsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: SPACING.xxl,
    marginBottom: SPACING.xl,
  },
  termsLink: {
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
});
