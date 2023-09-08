import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/actions/actionCreator";
import { useNavigate } from "react-router-dom";

export default function FormAdmin() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function submitted(event) {
    event.preventDefault();
      dispatch(addUser(form))
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        
      })
  }

  function changeForm(event) {
    const { name, value } = event.target;

    const newForm = { ...form };
    newForm[name] = value;

    setForm(newForm);
  }

  return (
    <>
      <div className="container w-75 mt-5 p-3 bg-body-secondary rounded">
        <form onSubmit={submitted}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={changeForm}
              value={form.username}
              placeholder="Enter new admin's username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              onChange={changeForm}
              value={form.email}
              placeholder="Enter new admin's email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={changeForm}
              value={form.password}
              placeholder="Enter new admin's password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              onChange={changeForm}
              value={form.phoneNumber}
              placeholder="Enter new admin's phone number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              onChange={changeForm}
              value={form.address}
              placeholder="Enter new admin's address"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </>
  );
}
