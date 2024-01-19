import { View, StatusBar, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';


const DetailsScreen = ({ navigation, route }: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];

  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);

  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );

  // Toggle Favorite
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };


  // BackHandler
  const backHandler = () => {
    navigation.pop();
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <ImageBackgroundInfo
          EnableBackHandler={true}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          type={ItemOfIndex.type}
          id={ItemOfIndex.id}
          favourite={ItemOfIndex.favourite}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          BackHandler={backHandler}
          ToggleFavourite={ToggleFavourite}
        />

        {/* Footer Info Area */}
        <View style={styles.footerInfoArea}>
          <Text style={styles.infoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.descriptionText}>{ItemOfIndex.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={() => setFullDesc(prev => !prev)}>
              <Text numberOfLines={3} style={styles.descriptionText}>{ItemOfIndex.description}</Text>
            </TouchableWithoutFeedback>
          )}

          {/* Size Section */}
          <Text style={styles.infoTitle}>Size</Text>
          <View style={styles.sizeOuterContainer}>
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.sizeBox,
                  {
                    borderColor:
                      data.size === price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        ItemOfIndex.type === 'Bean'
                          ? FONTSIZE.size_14
                          : FONTSIZE.size_16,
                      color:
                        data.size === price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.secondaryLightGreyHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  footerInfoArea: {
    padding: SPACING.space_20,
  },
  infoTitle: {
    fontFamily: 'FONTFAMILY.poppins_semibold',
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
    marginBottom: SPACING.space_10,
    fontWeight: 'bold',
  },
  descriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  sizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  sizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },
});

export default DetailsScreen;
