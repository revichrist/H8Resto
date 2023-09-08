import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchFoods } from "../stores/actions/actionCreator";
import OptionDropdown from "../components/OptionsDropdown";
import FoodCard from "../components/FoodCard";

export default function ProductPage() {
  const { categories } = useSelector((state) => state.category);
  const {foods} = useSelector((state) => state.food);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("");

  function onChangeFilter(event) {
    const { value } = event.target;

    setFilter(value);
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    setFilter(categories[0]?.name);
  }, [categories]);

  useEffect(() => {
    dispatch(fetchFoods(filter))
  }, [filter]);

  const optionsList = categories?.map((el, index) => {
    return <OptionDropdown key={index} category={el}></OptionDropdown>;
  });

  const foodCard = foods?.map((el, index) => {
    return <FoodCard key={index} foodDetails={el}></FoodCard>;
  });

  return (
    <>
      <h1 className="text-center mt-3">Menu</h1>
      <div className="mb-3">
        <label className="form-label">Filter</label>
        <select
          onChange={onChangeFilter}
          value={filter}
          className="form-select"
          aria-label="Default select example"
        >
          {optionsList}
        </select>
      </div>

      <div className="row justify-content-center"> {foodCard?.length === 0 ? <h1>Food Coming Soon, stay tuned</h1> : foodCard} </div>
        
      
    </>
  );
}
