import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  mocha: '#2C2521',
  oatMilk: '#EAE0D5',
  caramel: '#C99F7A',
};

const TABS = ['home', 'hitlist', 'focus', 'profile'] as const;
type TabType = typeof TABS[number];

export interface FloatingNavBarProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

const PADDING = 8;
const BUBBLE_SIZE = 56;
const CONTAINER_WIDTH = 280;
const TAB_WIDTH = 64;

export default function FloatingNavBar({ activeTab, onTabPress }: FloatingNavBarProps) {
  const activeIndex = TABS.indexOf(activeTab);

  const getBubbleX = (index: number) => {
    const innerWidth = CONTAINER_WIDTH - PADDING * 2;
    const gap = (innerWidth - TAB_WIDTH * TABS.length) / (TABS.length - 1);
    const tabLeft = index * (TAB_WIDTH + gap);
    const bubbleOffset = (TAB_WIDTH - BUBBLE_SIZE) / 2;
    return PADDING + tabLeft + bubbleOffset;
  };

  const bubbleX = useRef(new Animated.Value(getBubbleX(activeIndex))).current;
  const iconAnims = useRef(TABS.map((_, i) => new Animated.Value(i === activeIndex ? 1 : 0))).current;

  useEffect(() => {
    Animated.spring(bubbleX, {
      toValue: getBubbleX(activeIndex),
      useNativeDriver: true,
      damping: 18,
      stiffness: 200,
      mass: 0.8,
    }).start();

    const colorAnimations = TABS.map((_, index) => {
      return Animated.timing(iconAnims[index], {
        toValue: index === activeIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: true, // We are animating opacity, so native driver is supported!
      });
    });

    Animated.parallel(colorAnimations).start();
  }, [activeIndex]);

  const getIconName = (tab: TabType): keyof typeof MaterialCommunityIcons.glyphMap => {
    switch (tab) {
      case 'home':
        return 'home-outline';
      case 'hitlist':
        return 'check-all';
      case 'focus':
        return 'target';
      case 'profile':
        return 'account-circle-outline';
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bubble,
          {
            transform: [{ translateX: bubbleX }],
          },
        ]}
      />
      {TABS.map((tab, index) => {
        return (
          <TouchableOpacity
            key={tab}
            style={styles.tabSlot}
            activeOpacity={1}
            onPress={() => onTabPress(tab)}
          >
            <View style={styles.iconContainer}>
              {/* Inactive Icon (Light) */}
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    opacity: iconAnims[index].interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={getIconName(tab)}
                  size={24}
                  color="rgba(234,224,213,0.6)"
                />
              </Animated.View>
              {/* Active Icon (Dark) */}
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    opacity: iconAnims[index],
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={getIconName(tab)}
                  size={24}
                  color={COLORS.mocha}
                />
              </Animated.View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    width: CONTAINER_WIDTH,
    backgroundColor: COLORS.mocha,
    borderRadius: 24,
    paddingHorizontal: PADDING,
    paddingVertical: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 16,
    shadowColor: '#190b04',
    shadowOpacity: 0.4,
    shadowRadius: 48,
    shadowOffset: { width: 0, height: 16 },
  },
  bubble: {
    position: 'absolute',
    left: 0,
    top: PADDING,
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: 9999,
    backgroundColor: COLORS.caramel,
  },
  tabSlot: {
    width: TAB_WIDTH,
    height: BUBBLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
});
