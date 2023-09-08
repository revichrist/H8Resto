import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { Loading } from "../components/Loading";

const GET_FOODS_DETAIL = gql`
  query GetFoodDetail($id: Int!) {
    getOneFood(id: $id) {
      name
      description
      price
      imgUrl
      Category {
        name
      }
      Ingredients {
        name
      }
      User {
        username
        email
      }
    }
  }
`;

export function DetailScreen({ route }) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_FOODS_DETAIL, {
    variables: {
      id: +id,
    },
  });

  if (loading) return <Loading></Loading>;
  return (
    <>
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: data?.getOneFood?.imgUrl }}
          style={styles.image}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{data?.getOneFood?.name}</Text>
          <Text style={styles.category}>
            {data?.getOneFood?.Category?.name} • Rp. {data?.getOneFood?.price.toLocaleString("id-ID")}
          </Text>
          <Text style={styles.description}>
            {data?.getOneFood?.description}
          </Text>
          <Text style={styles.recipeInventor}>
            Created by: {data?.getOneFood?.User?.username || data?.getOneFood?.User?.email}
          </Text>
          <Text style={styles.ingredients}>Ingredients:</Text>
          {data?.getOneFood?.Ingredients.map((el, index) => {
            return <Text key={index}>{el.name}</Text>;
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover"
  },
  contentContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    fontSize: 15,
    color: "#888",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
  },
  recipeInventor: {
    fontSize: 16,
    marginBottom: 10,
  },
  ingredients: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ingredientsList: {
    fontSize: 16,
  },
});
