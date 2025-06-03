import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

type IconName = keyof typeof Ionicons.glyphMap;

interface FooterMenuItem {
  readonly icon: IconName;
  readonly label: string;
  readonly onPress: () => void;
  readonly isActive?: boolean;
}

interface FooterMenuProps {
  items: readonly FooterMenuItem[];
}

const FooterMenu: React.FC<FooterMenuProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={item.onPress}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={item.isActive ? '#007AFF' : '#8E8E93'}
          />
          <Text
            style={[
              styles.label,
              { color: item.isActive ? '#007AFF' : '#8E8E93' }
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingBottom: 25, // Extra padding for bottom safe area
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  menuItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default FooterMenu; 