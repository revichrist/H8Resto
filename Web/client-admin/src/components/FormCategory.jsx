import { useEffect, useState } from "react";

export default function FormCategory({ handleSubmit, categoryDetail }) {
  const [categoryName, setCategoryName] = useState("");

  function onChangeCategory(event) {
    const { value } = event.target;
    
    setCategoryName(value)
  }

  function submitted(event) {
    event.preventDefault();

    handleSubmit(categoryName)
  }

  useEffect(() => {
    setCategoryName(categoryDetail?.name || "")
  }, [categoryDetail])

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
              value={categoryName}
              onChange={onChangeCategory}
              placeholder="Enter your new category name"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
