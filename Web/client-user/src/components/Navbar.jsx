import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate()

  function onChangePage(page){
    navigate(page)
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => onChangePage('/')}>
            <img
              src="https://pbs.twimg.com/profile_images/1300954522/genki_logo_highRES_2_400x400.jpg"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
            <span style={{ marginLeft: "10px" }}>Genki Sushi</span>
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
                <a className="nav-link" aria-current="page" onClick={() => onChangePage('/')}>
                  Home
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" onClick={() => onChangePage('/product')}>
                  Products
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" onClick={() => onChangePage('/maintenance')}>
                  Our Offers
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" onClick={() => onChangePage('/maintenance')}>
                  Our Menu
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" onClick={() => onChangePage('/maintenance')}>
                  Our Service
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" onClick={() => onChangePage('/maintenance')}>
                  Our Stores
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" onClick={() => onChangePage('/maintenance')}>
                  About us
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
