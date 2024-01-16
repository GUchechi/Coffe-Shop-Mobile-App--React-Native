import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import Entypo from 'react-native-vector-icons/Entypo';

interface HeaderBarProps {
  title?: string;
}

const HeadBar: React.FC<HeaderBarProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <GradientBGIcon>
        <Entypo
          name="grid"
          size={25}
          color={COLORS.primaryLightGreyHex}
        />
      </GradientBGIcon>
      <Text style={styles.headerText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

export default HeadBar;

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});
