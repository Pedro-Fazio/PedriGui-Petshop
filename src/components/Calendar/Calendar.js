import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "./Calendar.scss";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef();
  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: "Carregando :)", start: new Date() }
    ]
  };

  componentDidMount() {
    this.calendar = this.calendarComponentRef.current.calendar
    this.calendar.setOption('locale', 'pt-BR')
    this.eventsLen = this.state.calendarEvents.length;
    // console.log(this.calendarComponentRef.current, 'i')
    // console.log(this.calendarComponentRef.current.calendar.events)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.Events !== this.props.Events)
      if (this.props.Events.length > 0) {
        let calendarEvents = this.props.Events.map(e => {
          // console.log(e, 'E')
          return ({
            title: 'Já Reservado',
            start: e.Data,
            url: `./agendamentos/${e._id}`,
            color: '#FDF2BB',
            textColor: '#3333333',
            ...e
          })
        }
        )

        this.setState(
          { calendarEvents }
        )
        this.eventsLen = calendarEvents.length;
      }
  }


  render() {
    // console.log(this.props)
    return (
      <div className="demo-app">
        <div className="demo-app-top">
          <button onClick={this.toggleWeekends}>Agrupar por semanas</button>&nbsp;
          <button onClick={this.gotoPast}>Ir ao passado</button>
          &nbsp; (Clique em um dia para agendar uma consulta)
        </div>
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
      </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  };

  parseDate(date) {
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      hour: date.getHours(),
      min: date.getMinutes()
    }
  }

  handleDateClick = arg => {
    if (this.calendar.state.viewType === "dayGridMonth")
      this.calendar.changeView('timeGridDay', arg.date)
    else if (true) {
      this.props.handleBook(this.parseDate(new Date(arg.date)))
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.slice(0, this.eventsLen).concat({
          // creates a new array
          title: "Reservar",
          start: arg.date,
          allDay: arg.allDay
        })
      });
    }
  };
}
