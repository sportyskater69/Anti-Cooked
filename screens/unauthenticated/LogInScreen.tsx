import { useFormik } from "formik";
import * as Yup from "yup";

import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { NotoSerif_700Bold, useFonts } from '@expo-google-fonts/noto-serif';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { logIn } from "../../services/authService";
import { ensureUserProfile } from "../../services/userService";

// -------------------- VALIDATION --------------------

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// -------------------- INPUT FIELD --------------------

const InputField = ({ label, isPassword, error, ...props }: any) => {
  const [focused, setFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: focused ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [focused, borderAnim]);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.inputLabel}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={isPassword && !showPwd}
          placeholderTextColor="#f0bd8b80"
          {...props}
        />

        {isPassword && (
          <Pressable
            onPress={() => setShowPwd(!showPwd)}
            style={styles.toggleBtn}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Text style={styles.toggleText}>
              {showPwd ? 'HIDE' : 'SHOW'}
            </Text>
          </Pressable>
        )}

        <Animated.View
          style={[
            styles.bottomBorder,
            { opacity: borderAnim },
          ]}
        />
      </View>

      {!!error && (
        <Text style={{ color: "red", marginTop: 6, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

// -------------------- BUTTON --------------------

const AnimatedGradientButton = ({ label, onPress }: any) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.02,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <LinearGradient
          colors={['#ffcc7a', '#e2b05e']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>{label}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

// -------------------- SCREEN --------------------

export default function LoginScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    NotoSerif_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        const user = await logIn(values.email, values.password);

        console.log("Auth success:", user.uid);

        const profile = await ensureUserProfile(user);

        console.log("Profile result:", profile);

      } catch (error: any) {
        console.log("FULL ERROR:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.headerArea}>
        <Text style={styles.subhead}>WELCOME BACK</Text>
        <Text style={styles.headline}>Anti{'\n'}Cooked</Text>
      </View>

      <View style={styles.formArea}>

        {/* EMAIL */}
        <InputField
          label="Email Address"
          placeholder="scholar@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          error={formik.touched.email && formik.errors.email}
        />

        {/* PASSWORD */}
        <InputField
          label="Password"
          isPassword={true}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          error={formik.touched.password && formik.errors.password}
        />

        <View style={styles.actionsBox}>

          <AnimatedGradientButton
            label={formik.isSubmitting ? "Signing In..." : "Sign In"}
            onPress={formik.handleSubmit}
          />

          <Pressable
            style={styles.secondaryLinkBox}
            onPress={() => navigation.navigate('Signup' as never)}
          >
            <Text style={styles.secondaryLink}>
              Don&apos;t have an account? Sign Up
            </Text>
          </Pressable>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// -------------------- STYLES (UNCHANGED) --------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1007',
    paddingTop: 100,
  },
  headerArea: {
    paddingLeft: 24,
    marginBottom: 64,
  },
  subhead: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#f0bd8b',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 16,
  },
  headline: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 56,
    letterSpacing: -1.12,
    color: '#fcdccd',
    lineHeight: 64,
  },
  formArea: {
    marginLeft: 48,
    marginRight: 32,
  },
  inputWrapper: {
    marginBottom: 32,
  },
  inputLabel: {
    fontFamily: 'Inter_400Regular',
    color: '#f0bd8b',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#443026',
    borderRadius: 8,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#190b04',
    shadowOpacity: 0.4,
    shadowRadius: 48,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10,
  },
  textInput: {
    flex: 1,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#fcdccd',
    height: '100%',
  },
  toggleBtn: {
    paddingLeft: 12,
  },
  toggleText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#f0bd8b',
    letterSpacing: 1,
  },
  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#ffcc7a',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  actionsBox: {
    marginTop: 16,
  },
  buttonContainer: {
    shadowColor: '#190b04',
    shadowOpacity: 0.4,
    shadowRadius: 48,
    shadowOffset: { width: 0, height: 16 },
    elevation: 8,
  },
  gradientButton: {
    height: 64,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#432c00',
    letterSpacing: 0.5,
  },
  secondaryLinkBox: {
    marginTop: 32,
    alignItems: 'center',
  },
  secondaryLink: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#f0bd8b',
  },
});