import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

function Calendar(props) {
  const { date } = props;
  moment.locale('ru');
  // const today = moment(1651517184204);
  // const today = moment(1651197184204);
  const today = moment(date);

  //first day to display
  const monthBeginning = today.clone().startOf('month');
  const dayOfWeekBeg = monthBeginning.clone().day();
  let firstMonday = null;
  dayOfWeekBeg === 1
    ? (firstMonday = monthBeginning)
    : dayOfWeekBeg === 0
    ? (firstMonday = monthBeginning.clone().subtract(6, 'days'))
    : (firstMonday = monthBeginning.clone().subtract(dayOfWeekBeg - 1, 'days'));

  //last day to display
  const monthEnd = today.clone().endOf('month');
  const dayOfWeekEnd = monthEnd.clone().day();
  let lastSunday = null;
  dayOfWeekEnd === 0
    ? (lastSunday = monthEnd)
    : (lastSunday = monthEnd.clone().add(7 - dayOfWeekEnd, 'days'));

  //array of dates
  const numOfDays = lastSunday.diff(firstMonday, 'days') + 1;
  const daysArr = [];
  const daysInWeeks = [];

  for (let i = 0; i < numOfDays; i += 1) {
    daysArr.push(firstMonday.clone().add(i, 'days'));
  }

  for (let i = 0; i < numOfDays; i += 7) {
    daysInWeeks.push(daysArr.slice(i, i + 7));
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{today.format('dddd')}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">
            {today.format('D')}
          </div>
          <div className="ui-datepicker-material-month">
            {today.format('D MMMM').split(' ')[1]}
          </div>
          <div className="ui-datepicker-material-year">
            {today.format('YYYY')}
          </div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{today.format('MMMM')}</span>
          &nbsp;
          <span className="ui-datepicker-year">{today.format('YYYY')}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">
              Пн
            </th>
            <th scope="col" title="Вторник">
              Вт
            </th>
            <th scope="col" title="Среда">
              Ср
            </th>
            <th scope="col" title="Четверг">
              Чт
            </th>
            <th scope="col" title="Пятница">
              Пт
            </th>
            <th scope="col" title="Суббота">
              Сб
            </th>
            <th scope="col" title="Воскресенье">
              Вс
            </th>
          </tr>
        </thead>
        <tbody>
          {daysInWeeks.map((week) => {
            return (
              <tr key={week}>
                {week.map((day) => {
                  return (
                    //looking for the current day to highlight it
                    today.format('D MMM') === day.format('D MMM') ? (
                      <td key={day} className="ui-datepicker-today">
                        {day.date()}
                      </td>
                    ) : //looking for dates outside of this month
                    today.format('M') !== day.format('M') ? (
                      <td key={day} className="ui-datepicker-other-month">
                        {day.date()}
                      </td>
                    ) : (
                      //all remaining dates
                      <td key={day}>{day.date()}</td>
                    )
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
