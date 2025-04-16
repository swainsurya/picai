import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'

const _layout = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#000000",  // Black for active
      tabBarInactiveTintColor: "#888888",  // Gray for inactive
      tabBarStyle: styles.tabBar,
      tabBarShowLabel: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.tabItem}>
              <FontAwesome name="home" size={24} color={color} />
              <View style={[styles.indicator, { backgroundColor: color }]} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="imgcap"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.tabItem}>
              <FontAwesome name="image" size={24} color={color} />
              <View style={[styles.indicator, { backgroundColor: color }]} />
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="accountScreen"
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.tabItem}>
              <FontAwesome name="user" size={24} color={color} />
              <View style={[styles.indicator, { backgroundColor: color }]} />
            </View>
          )
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopWidth: 0,
    backgroundColor: '#FFFFFF',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
    opacity: 0,  // Hidden by default
  },
  // Active indicator will inherit color from parent
})

export default _layout