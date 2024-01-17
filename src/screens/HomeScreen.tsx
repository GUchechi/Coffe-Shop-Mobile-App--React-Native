import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeadBar from '../components/HeadBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CoffeeCard from '../components/CoffeeCard';

// GetCategoriesFromData
const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

// GetCofeeList
const getCofeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState(
    getCofeeList(categoryIndex.category, CoffeeList),
  );

  const tabBarHeight = useBottomTabBarHeight();

  // ScrollView Problem
  const listRef: any = useRef<FlatList>()


  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        {/* App Header */}
        <HeadBar />


        {/* Screen Title */}
        <Text style={styles.screenTitle}>Find the best coffee for you</Text>

        {/* Search Input */}
        <View style={styles.inputContainerComponent}>
          <TouchableOpacity>
            <AntDesign style={styles.inputIcon}
              name="search1" size={FONTSIZE.size_18} color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          </TouchableOpacity>
          <TextInput placeholder="Find Your Coffee" value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
          />
        </View>

        {/* Category Scroller*/}

        <ScrollView contentContainerStyle={styles.categoryScrollViewStyle} horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((data, index) => (
            <View key={index.toString()} style={styles.categoryScrollViewStyleContainer}>
              <TouchableOpacity style={styles.categoryScrollViewItem}
                onPress={() => {
                  listRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({ index: index, category: categories[index] });
                  setSortedCoffee([...getCofeeList(categories[index], CoffeeList)]);
                }}>
                <Text style={[styles.categoryText, categoryIndex.index === index ? { color: COLORS.primaryOrangeHex } : {}]}>{data}</Text>
                {categoryIndex.index === index ? (
                  <View style={styles.activeCategory} />
                ) : (<></>)}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.cofeeBeansTitle}>Coffee</Text>

        {/* Cofee FlatList */}

        <FlatList
          ref={listRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => { }}>
              <CoffeeCard
                id={item.id}
                name={item.name}
                description={item.description}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                ingredients={item.ingredients}
                special_ingredient={item.special_ingredient}
                prices={item.prices[2]}
                average_rating={item.average_rating}
                type={item.type}
                index={item.index}
                buttonPressHandler={() => { }}
              />
            </TouchableOpacity>;
          }}
        />

        <Text style={styles.cofeeBeansTitle}>Coffee Bean</Text>

        {/* Beans FlatList */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[styles.flatListContainer, { marginBottom: tabBarHeight }]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return <TouchableOpacity onPress={() => { }}>
              <CoffeeCard
                id={item.id}
                name={item.name}
                description={item.description}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                ingredients={item.ingredients}
                special_ingredient={item.special_ingredient}
                prices={item.prices[2]}
                average_rating={item.average_rating}
                type={item.type}
                index={item.index}
                buttonPressHandler={() => { }}
              />
            </TouchableOpacity>;
          }}
        />
      </ScrollView>
    </View >
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
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
    fontWeight: 'bold',
  },
  inputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  inputIcon: {
    marginHorizontal: SPACING.space_10,
  },
  textInputContainer: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20 - 5,
    color: COLORS.primaryWhiteHex,
    height: SPACING.space_20 * 2.5,
  },
  categoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryScrollViewStyleContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryScrollViewItem: {
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  cofeeBeansTitle: {
    fontSize: FONTSIZE.size_24,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_16,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
