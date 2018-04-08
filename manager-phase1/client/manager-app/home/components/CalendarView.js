import React from 'react'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
)

const EventLight = ({event}) => {
  return (
    <span>
      <p>{event.title}</p>
    </span>
  )
}
const Event = ({event}) => {
  return (
    <span>
      <p>{event.title}</p>
      <p>{event.customer}</p>
      {event.startTime} -
      {event.finishTime}
    </span>
  )
}
const eventProps = (a, b, c, d) => {

  return {className: a.customer}
}

const allDay = (a, b, c, d) => {
  return false
}
export default (props) => {
  return (
    <div className="box calendar">
      <BigCalendar
        views={['month', 'week', 'day']}
        events={props.events}
        defaultDate={new Date()}
        components={{
            event: Event,
            month: {
             event: EventLight
            }
          }}
        eventPropGetter={eventProps}
        messages={{allDay: 'Sleep Over'}}
      />
    </div>

  )
}