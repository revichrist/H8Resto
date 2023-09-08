import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFoods
} from "../store/actions/actionCreator";
export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { foods, foodsLoading: loading } = useSelector((state) => state.food);
  
  function onClickAdd() {
    navigate("/add-food");
  }

  useEffect(() => {
    dispatch(fetchFoods());
  }, []);

  const listFoods = foods?.map((food, index) => {
    return <TableRow food={food} index={index} key={index}></TableRow>;
  });

  const loadingSpinner = () => {
    return (
      <>
        <tr>
          <td colSpan={8} className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      <h1 className="text-center m-3">Home</h1>

      <button
        onClick={onClickAdd}
        type="button"
        className="btn btn-primary float-end mb-3"
      >
        <i className="fa-solid fa-plus"></i> Add Food
      </button>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            loadingSpinner()
          ) : !foods.length ? (
            <tr>
              <td colSpan={8} className="text-center">
                No data
              </td>
            </tr>
          ) : (
            listFoods
          )}
        </tbody>
      </table>
    </>
  );
}
