import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  let navigate = useNavigate();

  return (
    <div>
      <div className="container mt-4"></div>
      <h1 className="display-4 text-center mb-4">
        <i className="fa-solid fa-code" style={{ paddingTop: "370px" }}></i>404
        Page Not Found
      </h1>
      <div className="button-container">
        <button
          // type="submit"
          onClick={() => {
            navigate("/login");
          }}
          className="home-button "
        >
          Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
