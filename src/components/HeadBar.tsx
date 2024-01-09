import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface HeaderBarProps {
  title?: string;
}

const HeadBar: React.FC<HeaderBarProps> = () => {
  return (
    <View>
      <Text>HeadBar</Text>
    </View>
  );
};

export default HeadBar;

const styles = StyleSheet.create({});
