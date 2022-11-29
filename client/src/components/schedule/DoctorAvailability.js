import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FormError from "./FormError";
import { submitScheduleDoctor, fetchSchedule } from "../../actions";

const dayDefault = {
  day: "0",
  dayStartHours: "8",
  dayStartMinutes: "0",
  dayEndHours: "17",
  dayEndMinutes: "0",
  breakStartHours: "N/A",
  breakStartMinutes: "N/A",
  breakEndHours: "N/A",
  breakEndMinutes: "N/A",
  availableTimeSlots: [],
  bookedTimeSlots: [],
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

const DoctorAvailability = ({
  auth,
  scheduleList,
  schedule,
  fetchSchedule,
  submitScheduleDoctor,
}) => {
  const [days, setDays] = useState([dayDefault]);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (auth) {
      fetchSchedule({ email: auth.email });
    }
  }, []);

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
    checkErrors(newArr);
  };

  const removeRow = (index) => {
    let newArr = days.filter((item, i) => {
      return index !== i;
    });
    setDays(newArr);
    checkErrors(newArr);
  };

  const getTimeDifference = (sh, sm, eh, em) => {
    let dh = eh - sh,
      dm = em - sm;
    if (dm < 0) {
      dm += 60;
      dh -= 1;
    }

    return dh * 60 + dm;
  };

  const checkErrors = (newArr) => {
    const err = [];
    const foundDays = new Set();
    for (let i = 0; i < newArr.length; i++) {
      if (foundDays.has(newArr[i].day)) {
        err.push("Different days with same names");
        break;
      }
      foundDays.add(newArr[i].day);
    }

    for (let i = 0; i < newArr.length; i++) {
      const td = getTimeDifference(
        newArr[i].dayStartHours,
        newArr[i].dayStartMinutes,
        newArr[i].dayEndHours,
        newArr[i].dayEndMinutes
      );

      if (td < 30) {
        err.push(
          "End time should be at least 30 minutes ahead of the start time"
        );
        break;
      }
    }

    for (let i = 0; i < newArr.length; i++) {
      let countNA = 0;
      if (newArr[i].breakStartHours === "N/A") countNA++;
      if (newArr[i].breakEndHours === "N/A") countNA++;
      if (newArr[i].breakStartMinutes === "N/A") countNA++;
      if (newArr[i].breakEndMinutes === "N/A") countNA++;

      if (countNA > 0 && countNA < 4) {
        err.push("Time fields for break must all be N/A or none.");
        break;
      }
    }

    console.log(newArr);

    for (let i = 0; i < newArr.length; i++) {
      const td = getTimeDifference(
        newArr[i].breakStartHours,
        newArr[i].breakStartMinutes,
        newArr[i].breakEndHours,
        newArr[i].breakEndMinutes
      );

      console.log(td);

      if (td < 15) {
        err.push(
          "For a break, end time should be at least 15 minutes ahead of the start time"
        );
        break;
      }
    }

    for (let i = 0; i < newArr.length; i++) {
      const tdStart = getTimeDifference(
        newArr[i].dayStartHours,
        newArr[i].dayStartMinutes,
        newArr[i].breakStartHours,
        newArr[i].breakStartMinutes
      );

      const tdEnd = getTimeDifference(
        newArr[i].breakEndHours,
        newArr[i].breakEndMinutes,
        newArr[i].dayEndHours,
        newArr[i].dayEndMinutes
      );

      console.log(tdStart, tdEnd);

      if (tdStart < 0 || tdEnd < 0) {
        err.push(
          "Time period of break must lie within the time period of the visit"
        );
        break;
      }
    }

    setErrors(err);
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
    checkErrors(newArr);
  };

  const renderRows = () => {
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
                <option key="N/A" value="N/A">
                  N/A
                </option>
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
                <option key="N/A" value="N/A">
                  N/A
                </option>
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
                <option key="N/A" value="N/A">
                  N/A
                </option>
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
                <option key="N/A" value="N/A">
                  N/A
                </option>
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

  const getTimeSlots = (sh, sm, eh, em) => {
    sh = parseInt(sh);
    sm = parseInt(sm);
    eh = parseInt(eh);
    em = parseInt(em);
    let arr = [];
    console.log(sh, sm, eh, em);
    let h1 = sh,
      m1 = sm;
    let h2 = sh,
      m2 = sm;
    if (sm === 45) {
      h2++;
      m2 = 0;
    } else {
      m2 += 15;
    }

    while (h2 <= eh) {
      let hs, ms, he, me;
      hs = h1 > 9 ? `${h1}` : `0${h1}`;
      he = h2 > 9 ? `${h2}` : `0${h2}`;
      ms = m1 > 0 ? `${m1}` : `0${m1}`;
      me = m2 > 0 ? `${m2}` : `0${m2}`;

      arr.push(`${hs}:${ms} - ${he}:${me}`);

      if (h2 === eh && m2 === em) {
        break;
      }
      h1 += Math.floor((m1 + 15) / 60);
      m1 = (m1 + 15) % 60;
      h2 += Math.floor((m2 + 15) / 60);
      m2 = (m2 + 15) % 60;
    }

    return arr;
  };

  const submitSchedule = () => {
    let newArr = days;

    if (errors.length) {
      return;
    }

    for (let i = 0; i < days.length; i++) {
      let day = days[i];

      const curDay = new Date();
      const curWeekDay = curDay.getDay();
      const firstDay = curDay.setDate(curDay.getDate() - curWeekDay);
      const requiredDay = curDay.setDate(
        curDay.getDate() + parseInt(newArr[i].day)
      );
      newArr[i].date = new Date(requiredDay);

      if (day.breakStartHours === "N/A") {
        newArr[i].availableTimeSlots = getTimeSlots(
          day.dayStartHours,
          day.dayStartMinutes,
          day.dayEndHours,
          day.dayEndMinutes
        );
      } else {
        newArr[i].availableTimeSlots = [
          ...getTimeSlots(
            day.dayStartHours,
            day.dayStartMinutes,
            day.breakStartHours,
            day.breakStartMinutes
          ),
          ...getTimeSlots(
            day.breakEndHours,
            day.breakEndMinutes,
            day.dayEndHours,
            day.dayEndMinutes
          ),
        ];
      }
    }

    setDays(newArr);

    submitScheduleDoctor({ days: newArr });
  };

  if (schedule) {
    return (
      <div className="row text-center">
        <div className="col">
          <h4>
            <b>Schedule already set</b>
          </h4>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="row">
          <h5>Select Days: </h5>
          {renderRows()}
          <FormError errors={errors} />
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
            <form onSubmit={() => submitSchedule()}>
              <button
                className="btn btn-primary profile-button"
                type="submit"
                disabled={errors.length}
              >
                Confirm <i className="material-icons right">done</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps({ auth, scheduleList, schedule }) {
  return { auth, scheduleList, schedule };
}

export default connect(mapStateToProps, {
  fetchSchedule,
  submitScheduleDoctor,
})(DoctorAvailability);
