import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING } from '../theme/theme';

interface GradientBGIconProps {
  children: ReactNode;
}

const GradientBGIcon: React.FC<GradientBGIconProps> = ({ children }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.linearGradientBG}>{children}</LinearGradient>
    </View>
  );
};

export default GradientBGIcon;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
    overflow: 'hidden',
  },
  linearGradientBG: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
