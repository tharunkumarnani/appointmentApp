// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {name: '', date: '', appointmentsList: [], starredClicked: false}

  onAddAppointment = event => {
    event.preventDefault()
    const {name, date} = this.state
    this.setState(prevState => ({
      appointmentsList: [
        ...prevState.appointmentsList,
        {
          id: uuidv4(),
          name,
          date,
          isStarred: false,
        },
      ],
    }))
    this.setState({name: '', date: ''})
  }

  onUpdateName = event => {
    this.setState({name: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  starredUpdate = () => {
    this.setState(prevState => ({starredClicked: !prevState.starredClicked}))
  }

  getStarredDetails = () => {
    const {starredClicked, appointmentsList} = this.state
    if (starredClicked) {
      const filtered = appointmentsList.filter(each => each.isStarred === true)
      return filtered
    }
    return appointmentsList
  }

  onUpdateStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  render() {
    const {name, date, starredClicked} = this.state
    const starredAndAll = this.getStarredDetails()
    const starredBtnClassName = starredClicked ? 'clicked-starred' : ''

    return (
      <div className="bg-cont">
        <div className="card">
          <h1 className="heading">Add Appointment</h1>
          <div className="form-img-cont">
            <img
              className="image"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
            <form className="form-style">
              <label htmlFor="userInput">TITLE</label>
              <input
                type="text"
                id="userInput"
                className="user-input"
                value={name}
                onChange={this.onUpdateName}
              />
              <label htmlFor="dateFormat">Date</label>
              <input
                value={date}
                type="date"
                onChange={this.onChangeDate}
                className="date-style"
              />
              <button
                onClick={this.onAddAppointment}
                type="submit"
                className="submit-btn"
              >
                Add
              </button>
            </form>
          </div>
          <hr />
          <div className="name-starred">
            <h1 className="heading2">Appointments</h1>
            <button
              onClick={this.starredUpdate}
              type="button"
              className={`starred-btn ${starredBtnClassName}`}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-cont">
            {starredAndAll.map(each => (
              <AppointmentItem
                appointmentDetails={each}
                key={each.id}
                onUpdateStarred={this.onUpdateStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
