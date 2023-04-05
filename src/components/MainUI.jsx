import React from "react";

function MainUI({ children }){
  return(
    <section className="tasklist-container">
       { children }
    </section>
  );
}

export { MainUI };