import React from 'react';
import { View, Text } from 'react-native';
import { useStore } from '../store/store';


const CartScreen = () => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);

  console.log(CartList.length);

  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  );
};

export default CartScreen;
