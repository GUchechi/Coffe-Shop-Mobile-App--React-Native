import React from 'react';
import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProps {
    id: string;
    index: number;
    type: string;
    roasted: string;
    imagelink_square: ImageProps;
    name: string;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CoffeeCard: React.FC<CoffeeCardProps> = (
    {
        id,
        index,
        type,
        roasted,
        imagelink_square,
        name,
        special_ingredient,
        average_rating,
        price,
        buttonPressHandler,
    }
) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardLinearGradientContainer}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        >
            <ImageBackground source={imagelink_square} style={styles.cardImageBG} resizeMode="cover">
                <View style={styles.cardRatingContainer}>
                    <Entypo name="star" color={COLORS.primaryOrangeHex} size={FONTSIZE.size_16} />
                    <Text style={styles.cardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardSubTitle}>{special_ingredient}</Text>

            <View style={styles.cardFooterRow}>

                {/* Price */}
                <Text style={styles.cardPriceCurrency}>
                    $ <Text style={styles.cardPrice}>{price.price}</Text>
                </Text>

                {/* Button */}
                <TouchableOpacity onPress={() => {
                    buttonPressHandler({
                        id,
                        index,
                        type,
                        roasted,
                        imagelink_square,
                        name,
                        special_ingredient,
                        prices: [{ ...price, quantity: 1 }],

                    });
                }}>
                    <BGIcon color={COLORS.primaryWhiteHex} BGColor={COLORS.primaryOrangeHex} size={FONTSIZE.size_10} />
                </TouchableOpacity>
            </View>
        </LinearGradient >
    );
};


const styles = StyleSheet.create({
    cardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_15,
    },
    cardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    cardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    cardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    cardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
        fontWeight: 'bold',

    },
    cardSubTitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
    },
    cardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    cardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    cardPrice: {
        color: COLORS.primaryWhiteHex,
    },
});

export default CoffeeCard;

