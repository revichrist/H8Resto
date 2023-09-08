import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../store/actions/actionCreator";

export default function CategoryRow({ category, index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handlerEdit(id) {
    navigate(`/edit-category/${id}`)
  }

  function handlerDelete(id) {
    dispatch(deleteCategory(id))
  }

  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{category.name}</td>
        <td>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => handlerEdit(category.id)}
          ></i>
          <i
            className="fa-regular fa-trash-can icon-red"
            onClick={() => handlerDelete(category.id)}
          ></i>
        </td>
      </tr>
    </>
  );
}
