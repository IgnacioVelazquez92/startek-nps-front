import React from "react";

const NotFound = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center">
            <h1 className="display-4">Error 404</h1>
            <p className="lead">La página que estás buscando no se encontró.</p>
            <a href="/" className="btn btn-danger">
              Volver a la página de inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
