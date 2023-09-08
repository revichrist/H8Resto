import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CategoryRow from "../components/CategoryRow";
import { fetchCategories } from "../store/actions/actionCreator";

export default function CategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  function onClickAdd() {
    navigate("/add-category");
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const listCategories = categories?.map((category, index) => {
    return (
      <CategoryRow category={category} index={index} key={index}></CategoryRow>
    );
  });

  return (
    <>
      <h1 className="text-center m-3">Category</h1>
      <button
        onClick={onClickAdd}
        type="button"
        className="btn btn-primary float-end mb-3"
      >
        <i className="fa-solid fa-plus"></i> Add Category
      </button>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>{listCategories}</tbody>
      </table>
    </>
  );
}
