import { useEffect } from "react";
import FoodCard from "../components/FoodCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoods } from "../stores/actions/actionCreator";
export default function HomePage() {
  const {foods} = useSelector((state) => state.food);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoods())
  }, []);

  const foodCards = foods?.map((food, index) => {
    return <FoodCard foodDetails={food} key={index}></FoodCard>
  })

  return (
    <>
      <h1 className="text-center mt-3">Welcome to Genki Sushi</h1>
      <div className="container mt-5">
      <div className="row justify-content-center"> {foodCards} </div>
        
      </div>
    </>
  );
}
