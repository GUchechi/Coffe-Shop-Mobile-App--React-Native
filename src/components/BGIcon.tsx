import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BORDERRADIUS, SPACING } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface BGIconProps {
    color: string,
    size: number,
    BGColor: string
}

const BGIcon: React.FC<BGIconProps> = ({ color, size, BGColor }) => {
    return (
        <View style={[styles.iconBG, { backgroundColor: BGColor }]}>
            <Ionicons name="add" color={color} size={size} />
        </View>
    );
};

const styles = StyleSheet.create({
    iconBG: {
        height: SPACING.space_30,
        width: SPACING.space_30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDERRADIUS.radius_8,
    },
});


export default BGIcon;
