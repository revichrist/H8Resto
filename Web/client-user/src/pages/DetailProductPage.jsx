import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFoodDetail } from "../stores/actions/actionCreator";

export default function DetailProductPage() {
  const { id } = useParams();
  const { foodDetail } = useSelector((state) => state.food);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoodDetail(id))
  }, [])

  return (
    <>
      <h1 className="text-center mt-3">Details</h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <img className="card-img-top" src={foodDetail.imgUrl} alt="" />
              <div className="card-body">
                <h3 className="card-title">{foodDetail.name}</h3>
                <p className="card-text">{foodDetail.description}</p>
                <p className="card-text">Price: Rp. {foodDetail.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
