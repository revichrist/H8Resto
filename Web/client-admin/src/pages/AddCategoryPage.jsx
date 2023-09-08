import FormCategory from "../components/FormCategory";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../store/actions/actionCreator";
("../store/actions/actionCreator");

export default function AddCategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAdd(payload) {
    dispatch(addCategory(payload))
      .then(() => {
        navigate("/categories");
      })
      .catch((err) => {});
  }

  return (
    <>
      <h1 className="text-center m-3">Add Category</h1>
      <FormCategory handleSubmit={handleAdd}></FormCategory>
    </>
  );
}
