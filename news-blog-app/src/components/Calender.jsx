import React from "react";
import "./calender.css";
import { useState } from "react";

const Calender = () => {
  const daysofweek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date();
  const [currmonth, setcurrmonth] = useState(currentDate.getMonth());
  const [curryear, setcurryear] = useState(currentDate.getFullYear());

  const totaldays = new Date(curryear, currmonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(curryear, currmonth, 1).getDay();

  const navPrevMonth = () => {
    setcurrmonth((prevmonth) => (prevmonth === 0 ? 11 : prevmonth - 1));
    setcurryear((prevyear) => (currmonth === 0 ? prevyear - 1 : prevyear));
  };

  const navNextMonth = () => {
    setcurrmonth((prevmonth) => (prevmonth === 11 ? 0 : prevmonth + 1));
    setcurryear((prevyear) => (currmonth === 11 ? prevyear + 1 : prevyear));
  };
  return (
    <div className="calender">
      <div className="nav-date">
        <h2 className="month">{months[currmonth]}</h2>
        <h2 className="year">{curryear}</h2>

        <div className="buttons">
          <i className="bx bx-chevron-left" onClick={navPrevMonth}></i>
          <i className="bx bx-chevron-right" onClick={navNextMonth}></i>
        </div>
      </div>

      <div className="weekdays">
        {daysofweek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>

      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((day, index) => (
          <span key={index}></span>
        ))}

        {[...Array(totaldays).keys()].map((day, index) => (
          <span
            key={index}
            className={
              day + 1 === currentDate.getDate() &&
              currmonth === currentDate.getMonth() &&
              curryear === currentDate.getFullYear()
                ? "curr-day"
                : ""
            }
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calender;
