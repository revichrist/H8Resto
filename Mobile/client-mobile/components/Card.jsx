import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
export function Card({ foodDetail }) {
  const navigate = useNavigation();
  function onChangeToDetail(id) {
    navigate.navigate("Detail", { id });
  }

  return (
    <>
      <Pressable
        style={styles.card}
        onPress={() => onChangeToDetail(foodDetail.id)}
      >
        <Image source={{ uri: foodDetail.imgUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.foodName}>{foodDetail.name}</Text>
          <Text style={styles.price}>Price: Rp. {foodDetail.price.toLocaleString("id-ID")}</Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: "2%",
    marginVertical: "1.5%",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius:30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 12,
    color: "gray",
  },
});
