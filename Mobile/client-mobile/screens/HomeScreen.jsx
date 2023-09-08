import { FlatList, StyleSheet } from "react-native";
import { Card } from "../components/Card";
import { gql, useQuery } from "@apollo/client";
import { Loading } from "../components/Loading";
const GET_FOODS = gql`
  query GetFoods {
    getAllFoods {
      id
      name
      price
      imgUrl
    }
  }
`;

export function HomeScreen() {
  const { loading, error, data } = useQuery(GET_FOODS);

  if (loading) return <Loading></Loading>;
  return (
    <>
      <FlatList
        data={data?.getAllFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <Card foodDetail={item} key={item.id}></Card>
          </>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imgStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  cardContainer: {
    marginTop: "15%",
  },
});
