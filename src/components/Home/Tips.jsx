// import React from "react";
// import("./Tips");

// const Tips = () => {
//   const tips = [
//     {
//       tipo: "success",
//       title: "Speech encuesta",
//       tip: "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
//       speech:
//         ".. si no te quedo ninguna otra duda o consulta te recuerdo que al mail xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar que tanto recomiendas el servicio de acuerdo a mi atención, me ayuda tu respuesta para seguir mejorando.",
//     },
//   ];

//   return (
//     <>
//       <h3 className="my-3 text-center">Tips para mejorar la eficacia NPS</h3>
//       <div className="container d-lg-flex gap-3">
//         {tips.map((tip) => {
//           return (
//             <div className={`d-flex p-5 border rounded-5 bg-${tip.tipo}`}>
//               <div className=" col-4 bs-success-bg-subtle">
//                 <h2 className="h5 p-2 text-light">{tip.title}</h2>

//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   data-bs-toggle="modal"
//                   data-bs-target="#exampleModal"
//                 >
//                   Launch demo modal
//                 </button>

//                 <div
//                   className="modal fade"
//                   id="exampleModal"
//                   tabIndex="-1"
//                   aria-labelledby="exampleModalLabel"
//                   aria-hidden="true"
//                 >
//                   <div className="modal-dialog">
//                     <div className="modal-content">
//                       <div className="modal-header">
//                         <h1 className="modal-title fs-5" id="exampleModalLabel">
//                           Modal title
//                         </h1>
//                         <button
//                           type="button"
//                           className="btn-close"
//                           data-bs-dismiss="modal"
//                           aria-label="Close"
//                         ></button>
//                       </div>
//                       <div className="modal-body">{tip.tip}</div>
//                       <div className="modal-footer">
//                         <audio src=""></audio>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Tips;

import React from "react";

const Tips = () => {
  const tips = [
    {
      tipo: "success",
      title: "Speech encuesta",
      tip: "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },

    {
      tipo: "success",
      title: "Speech encuesta",
      tip: "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },

    {
      tipo: "danger",
      title: "Speech encuesta",
      tip: "Te recomendamos utilizar la información que tengas para adaptar tu speech con cada cliente, teniendo de base algún genérico",
      speech:
        ".. si no te quedó ninguna otra duda o consulta, te recuerdo que al correo xxx@mail.com en 24 horas tendrás disponible una breve encuesta donde podrás calificar qué tanto recomiendas el servicio de acuerdo a mi atención. Tu respuesta me ayuda a seguir mejorando.",
    },
    // Puedes agregar más tips y speechs aquí
  ];

  return (
    <>
      <h3 className="my-3 text-center">En construcción</h3>
      <div className="container d-lg-flex gap-3">
        {tips.map((tip, index) => (
          <div key={index} className={`p-5 border rounded-5 bg-${tip.tipo}`}>
            <div className=" d-flex align-items-center">
              <h2 className="h5 p-2 text-light">{tip.title}</h2>

              <button
                type="button"
                className="btn btn-light"
                data-bs-toggle={`modal-${index}`}
                data-bs-target={`#exampleModal-${index}`}
              >
                Ver más
              </button>

              <div
                className="modal fade"
                id={`exampleModal-${index}`}
                tabIndex="-1"
                aria-labelledby={`exampleModalLabel-${index}`}
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5"
                        id={`exampleModalLabel-${index}`}
                      >
                        {tip.title}
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss={`modal-${index}`}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">{tip.tip}</div>
                    {/* Puedes agregar el reproductor de audio aquí */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tips;
