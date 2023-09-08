import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../store/actions/actionCreator";
import { useLocation } from "react-router-dom";
export default function FormFood({ handleSubmit, foodDetail }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const { categories } = useSelector((state) => state.category);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    imgUrl: "",
    categoryId: 0,
  });

  const [ingredients, setIngredients] = useState([""]);

  function onChangeForm(event) {
    const { value, name } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function onAddIngredient() {
    const newIngredients = [...ingredients, ""];

    setIngredients(newIngredients);
  }

  function onDeleteIngredients(id) {
    const newIngredients = [...ingredients];
    newIngredients.splice(id, 1);

    setIngredients(newIngredients);
  }

  function onChangeIngredients(event) {
    const { name, value } = event.target;
    const targetIndex = name[name.length - 1];
    const newIngredients = [...ingredients];

    newIngredients[targetIndex] = value;

    setIngredients(newIngredients);
  }

  function submitted(event) {
    event.preventDefault();

    handleSubmit(form, ingredients);
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    setForm({
      name: foodDetail?.name || "",
      description: foodDetail?.description || "",
      price: foodDetail?.price || 0,
      imgUrl: foodDetail?.imgUrl || "",
      categoryId: foodDetail?.categoryId || 0,
    });
  }, [foodDetail]);

  const listCategories = categories?.map((category) => {
    return (
      <option value={category.id} key={category.id}>
        {category.name}
      </option>
    );
  });

  const listIngredients = ingredients?.map((el, index) => {
    return (
      <div key={index} className="my-3">
        <input
          type="text"
          className="form-control w-75 d-inline-block"
          name={"ingredients-" + index}
          value={el}
          onChange={onChangeIngredients}
          placeholder="Enter food's ingredient"
        />

        {ingredients.length === 1 ? null : (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger mx-3"
            onClick={() => onDeleteIngredients(index)}
          >
            Remove
          </button>
        )}
      </div>
    );
  });

  return (
    <>
      <div className="container w-75 mt-5 p-3 bg-body-secondary rounded">
        <form onSubmit={submitted}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              name={"name"}
              value={form.name}
              onChange={onChangeForm}
              placeholder="Enter your food's name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows="3"
              name={"description"}
              value={form.description}
              onChange={onChangeForm}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Price</label>
            <input
              type="number"
              className="form-control"
              name={"price"}
              value={form.price}
              onChange={onChangeForm}
              placeholder="Enter your food's price"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">ImageUrl</label>
            <input
              type="text"
              className="form-control"
              name={"imgUrl"}
              value={form.imgUrl}
              onChange={onChangeForm}
              placeholder="Enter your food's image url"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select
              className="form-select"
              name={"categoryId"}
              value={form.categoryId}
              onChange={onChangeForm}
              aria-label="Default select example"
            >
              <option value={0} disabled>
                Select category
              </option>
              {listCategories}
            </select>
          </div>

          {location.pathname === "/add-food" ? (
            <div className="mb-3">
              <label className="form-label fw-semibold">Ingredients</label>
              {listIngredients}
              <button
                type="button"
                className="btn btn-sm btn-outline-primary"
                onClick={onAddIngredient}
              >
                Add More
              </button>
            </div>
          ) : null}

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
