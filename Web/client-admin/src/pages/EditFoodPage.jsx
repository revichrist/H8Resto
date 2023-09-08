import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FormFood from "../components/FormFood";
import { fetchFoodsDetail, editFoods } from "../store/actions/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EditFoodPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { foodDetail } = useSelector((state) => state.food);
  

  function patchFood(payload) {
    dispatch(editFoods(payload, id))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {});
  }

  useEffect(() => {
    dispatch(fetchFoodsDetail(id));
  }, [id]);

  return (
    <>
      <h1 className="text-center m-3">Edit Food</h1>
      <FormFood handleSubmit={patchFood} foodDetail={foodDetail}></FormFood>
    </>
  );
}
