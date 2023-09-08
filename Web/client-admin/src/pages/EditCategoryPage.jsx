import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormCategory from "../components/FormCategory";
import {
  editCategory,
  fetchCategoryDetail,
} from "../store/actions/actionCreator";

export default function EditCategoryPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryDetail } = useSelector((state) => state.category);

  function patchCategory(payload) {
    dispatch(editCategory(payload, id))
      .then(() => {
        navigate("/categories");
      })
      .catch((err) => {});
  }

  useEffect(() => {
    dispatch(fetchCategoryDetail(id));
  }, [id]);

  return (
    <>
      <h1 className="text-center m-3">Edit Category</h1>
      <FormCategory handleSubmit={patchCategory} categoryDetail={categoryDetail}></FormCategory>
    </>
  );
}
