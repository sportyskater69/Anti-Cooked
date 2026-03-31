import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up Screen coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1007',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fcdccd',
    fontFamily: 'Inter_400Regular',
  },
});
