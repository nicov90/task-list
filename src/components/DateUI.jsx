import React, { useContext } from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import "../css/Date.css";
import { GlobalContext } from "../App";

function DateUI({ id, taskDate }) {
  const { currentDate } = useContext(GlobalContext);
  const [date, setDate] = useState("");
  useEffect(() => {
    try {
      if (id === "currentDate") {
        const updateDate = () => {
          let currentTitleDate = moment().format("MMMM, DD dddd");
          setDate(currentTitleDate);
        };
        updateDate();

        //* Intervalo que verifica la fecha actual a todo momento
        //* y lo mantiene actualizado.
        const intervalCurrentDate = setInterval(updateDate, 1000);

        //* Se detiene el intervalo si el componente se desmonta
        return () => clearInterval(intervalCurrentDate);
      } else if (id === "task-date") {
        if (taskDate === currentDate) {
          setDate("Today");
        } else {
          const dateOptions = {
            month: "short",
            day: "2-digit",
            timeZone: "UTC"
          };
          const formattedDate = new Date(taskDate).toLocaleDateString(
            "en-US",
            dateOptions
          );
          setDate(formattedDate);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, taskDate, currentDate]);

  return (
    <p className="date" id={id}>
      {date}
    </p>
  );
}
export default DateUI;
