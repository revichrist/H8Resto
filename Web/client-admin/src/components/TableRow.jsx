import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFoods } from "../store/actions/actionCreator";

export default function TableRow({ food, index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handlerEdit(id) {
    navigate(`/edit-food/${id}`);
  }

  function handlerDelete(id) {
    dispatch(deleteFoods(id))
  }

  return (
    <>
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{food.name}</td>
        <td>{food.description}</td>
        <td>{food.price}</td>
        <td>
          <img
            className="img-thumbnail square-img"
            src={food.imgUrl}
            alt={food.name}
          />
        </td>
        <td>{food.User.username || food.User.email}</td>
        <td>{food.Category.name}</td>
        <td>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => handlerEdit(food.id)}
          ></i>
          <i
            className="fa-regular fa-trash-can icon-red"
            onClick={() => handlerDelete(food.id)}
          ></i>
        </td>
      </tr>
    </>
  );
}
