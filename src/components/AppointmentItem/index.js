// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {onUpdateStarred, appointmentDetails} = props
  const {id, name, date, isStarred} = appointmentDetails
  const starredUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const dateFormat = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickedFavImg = () => {
    onUpdateStarred(id)
  }

  return (
    <li className="appointment-details-cont">
      <div className="name-star-cont">
        <h1 className="appoint-name">{name}</h1>
        <button
          onClick={onClickedFavImg}
          data-testid="star"
          className="star-fav-btn"
        >
          <img alt="star" src={starredUrl} />
        </button>
      </div>
      <p className="date-style">Date: {dateFormat}</p>
    </li>
  )
}

export default AppointmentItem
