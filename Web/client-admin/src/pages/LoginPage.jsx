import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/actions/actionCreator";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function onChangeForm(event) {
    const { value, name } = event.target;

    const newForm = { ...form };
    newForm[name] = value;

    setForm(newForm);
  }

  function onSubmit(event) {
    event.preventDefault();

    dispatch(login(form))
      .then(() => {
        navigate("/");
      })
      .catch(err => {})

  }

  return (
    <>
      <h1 className="text-center m-3">Login</h1>
      <div className="container w-75 mt-5 p-3 bg-body-secondary rounded">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={form.email}
              onChange={onChangeForm}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={onChangeForm}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
