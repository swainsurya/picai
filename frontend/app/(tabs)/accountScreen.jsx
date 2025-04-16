import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

const AccountScreen = () => {
  // Sample user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    membership: 'Premium',
    credits: 85,
    joined: 'January 2023',
  };

  const stats = [
    { label: 'Images Generated', value: 127, icon: 'image' },
    { label: 'Downloads', value: 89, icon: 'download' },
    { label: 'Favorites', value: 42, icon: 'heart' },
  ];

  const menuItems = [
    { label: 'Subscription', icon: 'credit-card' },
    { label: 'Purchase Credits', icon: 'zap' },
    { label: 'History', icon: 'clock' },
    { label: 'Help & Support', icon: 'help-circle' },
    { label: 'Log Out', icon: 'log-out', color: '#ff6b6b' },
  ];

  return (
    <LinearGradient colors={['#f8f9fa', '#e9ecef']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.membershipBadge}>
            <Icon name="award" size={16} color="#f8f9fa" />
            <Text style={styles.membershipText}>{user.membership}</Text>
          </View>
        </View>

        {/* Credits Card */}
        <View style={styles.creditsCard}>
          <View style={styles.creditsInfo}>
            <Text style={styles.creditsLabel}>Available Credits</Text>
            <Text style={styles.creditsValue}>{user.credits}</Text>
          </View>
          <TouchableOpacity style={styles.addCreditsButton}>
            <Text style={styles.addCreditsText}>Add Credits</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Icon name={stat.icon} size={20} color="#4361ee" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={item.color || '#495057'} 
                />
              </View>
              <Text style={[styles.menuText, item.color && { color: item.color }]}>
                {item.label}
              </Text>
              <Icon name="chevron-right" size={20} color="#adb5bd" />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <Text style={styles.versionText}>AI Art Studio v1.2.0</Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 15,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4361ee',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  membershipText: {
    color: '#f8f9fa',
    fontSize: 14,
    fontWeight: '600',
  },
  creditsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  creditsInfo: {
    gap: 5,
  },
  creditsLabel: {
    fontSize: 14,
    color: '#6c757d',
  },
  creditsValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212529',
  },
  addCreditsButton: {
    backgroundColor: '#4361ee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  addCreditsText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flex: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statIconContainer: {
    backgroundColor: '#edf2ff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIconContainer: {
    width: 30,
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#495057',
  },
  versionText: {
    textAlign: 'center',
    color: '#adb5bd',
    marginTop: 25,
    fontSize: 12,
  },
});

export default AccountScreen;