import { useNavigate } from "react-router-dom";

export default function FoodCard({ foodDetails }) {
  const navigate = useNavigate();

  function onClickCard(id) {
    navigate(`/product/${id}`);
  }

  return (
    <>
      <div
        className="card m-3 "
        style={{ width: "18rem" }}
        onClick={() => onClickCard(foodDetails.id)}
      >
        <img className="card-image" src={foodDetails.imgUrl} alt="img" />
        <div className="card-body">
          <h5 className="card-title">{foodDetails.name}</h5>
        </div>
      </div>
    </>
  );
}
