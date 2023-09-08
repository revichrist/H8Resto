import { useDispatch } from "react-redux";
import FormFood from "../components/FormFood";
import { addFoods } from "../store/actions/actionCreator";
import { useNavigate } from "react-router-dom";

export default function AddFoodPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAdd(payload, payload2) {
    dispatch(addFoods(payload, payload2))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {});
  }

  return (
    <>
      <h1 className="text-center m-3">Add Food</h1>
      <FormFood handleSubmit={handleAdd}></FormFood>
    </>
  );
}
