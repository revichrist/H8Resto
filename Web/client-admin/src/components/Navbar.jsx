import { useNavigate } from "react-router-dom";
import { toast } from "../utils/toast";

export default function NavBar() {
  const navigate = useNavigate();

  function handleClick(page) {
    if (page === "/login") {
      localStorage.clear();
      toast("See ya!");
    }

    navigate(page);
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-3">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => handleClick("/")}>
            H8Resto
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  
                  onClick={() => handleClick("/")}
                >
                  Home
                </a>
              </li>

              {localStorage.getItem("role") === "Admin" ? (
                <li className="nav-item">
                  <a
                    className="nav-link"
                    
                    onClick={() => handleClick("/add-admin")}
                  >
                    Add Admin
                  </a>
                </li>
              ) : null}

              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => handleClick("/categories")}
                >
                  Categories
                </a>
              </li>

              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li> */}
            </ul>
          </div>
        </div>

        <div>
          <a
            className="nav-link active text-light"
            aria-current="page"
            onClick={() => handleClick("/login")}
          >
            Logout
          </a>
        </div>
      </nav>
    </>
  );
}
