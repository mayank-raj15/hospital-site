import _ from "lodash";
import React, { useState } from "react";

const dayDefault = {
  day: "0",
  dayStartHours: "8",
  dayStartMinutes: "0",
  dayEndHours: "17",
  dayEndMinutes: "0",
  breakStartHours: "13",
  breakStartMinutes: "0",
  breakEndHours: "14",
  breakEndMinutes: "0",
};

const hospitalTimings = {
  startHour: 8,
  endHour: 18,
};

const dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DoctorAvailability = () => {
  const [days, setDays] = useState([dayDefault]);

  const renderDayNameOptions = () => {
    const days = [0, 1, 2, 3, 4, 5, 6];
    return _.map(days, (day) => {
      return (
        <option key={day} value={day.toString()}>
          {dayName[day]}
        </option>
      );
    });
  };

  const renderHoursOptions = () => {
    return _.range(hospitalTimings.startHour, hospitalTimings.endHour, 1).map(
      (hour) => {
        return (
          <option key={hour} value={hour}>
            {hour > 9 ? `${hour}` : `0${hour}`}
          </option>
        );
      }
    );
  };

  const renderMinutesOptions = () => {
    return _.range(0, 60, 15).map((minute) => {
      return (
        <option key={minute} value={minute}>
          {minute > 9 ? `${minute}` : `0${minute}`}
        </option>
      );
    });
  };

  const addNewDay = () => {
    const newArr = [...days, dayDefault];
    setDays(newArr);
  };

  const removeRow = (index) => {
    let newArr = days.filter((item, i) => {
      return index !== i;
    });
    setDays(newArr);
  };

  const updateState = (name, index) => (event) => {
    let newArr = days.map((item, i) => {
      if (index === i) {
        return { ...item, [name]: event.target.value };
      } else {
        return item;
      }
    });
    setDays(newArr);
  };

  const renderRows = () => {
    // const minTime = `${}`
    console.log(days);
    return days.map((dayData, val) => {
      return (
        <div
          className="row align-items-center"
          style={{ border: "2px solid black", padding: "10px 0px" }}
          key={val}
        >
          <div className="row">
            <div className="col-1 text-right">Day:</div>
            <div className="col-2">
              <select
                className="form-select"
                value={dayData.day}
                onChange={updateState("day", val)}
              >
                {renderDayNameOptions()}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-1 text-right">Time:</div>
            <div className="col-2 text-right">
              <select
                className="form-select"
                value={dayData.dayStartHours}
                onChange={updateState("dayStartHours", val)}
              >
                {renderHoursOptions()}
              </select>
            </div>
            <div className="col-1 text-center">:</div>
            <div className="col-2">
              <select
                className="form-select"
                value={dayData.dayStartMinutes}
                onChange={updateState("dayStartMinutes", val)}
              >
                {renderMinutesOptions()}
              </select>
            </div>
            <div className="col-1 text-center"> to </div>
            <div className="col-2">
              <select
                className="form-select"
                value={dayData.dayEndHours}
                onChange={updateState("dayEndHours", val)}
              >
                {renderHoursOptions()}
              </select>
            </div>
            <div className="col-1 text-center">:</div>
            <div className="col-2">
              <select
                className="form-select"
                value={dayData.dayEndMinutes}
                onChange={updateState("dayEndMinutes", val)}
              >
                {renderMinutesOptions()}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-1 text-right">Break:</div>
            <div className="col-2 text-right">
              <select
                className="form-select"
                value={dayData.breakStartHours}
                onChange={updateState("breakStartHours", val)}
              >
                {renderHoursOptions()}
              </select>
            </div>
            <div className="col-1 text-center">:</div>
            <div className="col-2">
              <select
                className="form-select"
                value={dayData.breakStartMinutes}
                onChange={updateState("breakStartMinutes", val)}
              >
                {renderMinutesOptions()}
              </select>
            </div>
            <div className="col-1 text-center"> to </div>
            <div className="col-2">
              <select
                className="form-select"
                value={dayData.breakEndHours}
                onChange={updateState("breakEndHours", val)}
              >
                {renderHoursOptions()}
              </select>
            </div>
            <div className="col-1 text-center">:</div>
            <div className="col-2">
              <select
                className="form-select"
                value={dayData.breakEndMinutes}
                onChange={updateState("breakEndMinutes", val)}
              >
                {renderMinutesOptions()}
              </select>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-1">
              {val > 0 ? (
                <button
                  className="btn btn-primary profile-button"
                  onClick={() => removeRow(val)}
                >
                  <i className="material-icons right">close</i>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="row">
        <h5>Select Days: </h5>
        {renderRows()}
      </div>
      <div className="row text-center">
        <div className="col-6" style={{ marginBottom: "30px" }}>
          <button
            className="btn btn-primary profile-button"
            onClick={() => addNewDay()}
          >
            Add new day <i className="material-icons right">add</i>
          </button>
        </div>

        <div className="col-6" style={{ paddingBottom: "20px" }}>
          <button className="btn btn-primary profile-button" type="submit">
            Confirm <i className="material-icons right">done</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAvailability;
