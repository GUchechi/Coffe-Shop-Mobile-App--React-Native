import React from 'react';
import { View, Text, StatusBar, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/store';
import { COLORS, SPACING } from '../theme/theme';
import HeadBar from '../components/HeadBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';


const CartScreen = ({ navigation }: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  const buttonHandler = () => {
    navigation.navigate('Payment');
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View style={[styles.scrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.itemContainer}>
            <HeadBar title="Cart" />

            {CartList.length === 0 ? (
              <EmptyListAnimation title={'Cart is Empty!!!'} />
            ) : (
              <View style={styles.listItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity onPress={() => { }} key={data.id}>
                    <CartItem
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      roasted={data.roasted}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={() => { }}
                      decrementCartItemQuantityHandler={() => { }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length !== 0 && (
            <PaymentFooter
              buttonPressHandler={() => {
                buttonHandler();
              }}
              price={{ price: CartPrice, currency: '$' }}
              buttonTitle="Pay"
            />
          )}
        </View>
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
  scrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default CartScreen;
