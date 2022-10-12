
import React, { useState } from 'react'
import Calendar from 'react-calendar'
import calendarStyles from 'react-calendar/dist/Calendar.css'
console.log(calendarStyles)
import styles from './calendar.module.css'
import { isWithinInterval, isSameDay } from 'date-fns'
import DropdownMenu from './dropdown-menu'
import Picture from './picture'
const classNames = require('classnames');
const moment = require('moment');

const arriveDepartPlaceholder = (text) => (
    <div>
        <div className={styles.arriveDepartText}>{text}</div>
        <div className={styles.selectBelow}>Select Below</div>
    </div>
)

const CalendarComponent = ({ ratesData, sectionData, ...props }) => {

    const [arrivalDate, setArrivalDate] = useState(null)
    const [departureDate, setDepartureDate] = useState(null)
    const [value, setValue] = useState([arrivalDate, departureDate])
    const [activeStartDate, setActiveStartDate] = useState(arrivalDate)
    const [numGuests, setNumGuests] = useState(null)
    const [guestsExpanded, setGuestsExpanded] = useState(false)
    const [displayPopup, setDisplayPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const [statusMessage, setStatusMessage] = useState('')

    const popupInfo = 'We are now redirecting you to our partners on a 3rd party site. Please click the link to complete your booking.'

    function tileDisabled({ date, view }) {
        if (view === 'month') {
            return checkDisabled(date)
        }
    }

    function onChange(nextValue) {
        if (nextValue == null) {
            setValue(nextValue)
            setArrivalDate(nextValue)
            setDepartureDate(nextValue)
            setActiveStartDate(nextValue)
            setStatusMessage('')
        } else {
            if (nextValue.length == 2) {
                if (!validateAvailability(nextValue)) {
                    setArrivalDate(null)
                    setDepartureDate(null)
                    setValue(null)
                    setStatusMessage('Sorry, the selected dates are currently unavailable.')
                } else if (!validateMinStay(nextValue)) {
                    setArrivalDate(null)
                    setDepartureDate(null)
                    setValue(null)
                    setStatusMessage('The required minimum stay is 3 nights.')
                } else {
                    setArrivalDate(nextValue[0])
                    setDepartureDate(nextValue[1])
                    setValue(nextValue)
                    setStatusMessage('')
                }
            } else {
                setArrivalDate(nextValue[0])
                setDepartureDate(null)
                setValue(nextValue)
                setStatusMessage('')
            }
        }
    }

    const validateAvailability = (nextValue) => {
        if (nextValue[0] == null || nextValue[1] == null) {
            return false
        }
        var arrivalMoment = moment(nextValue[0]);
        var departureMoment = moment(nextValue[1]);
        while (!arrivalMoment.isSame(departureMoment, 'day')) {
            if (checkDisabled(arrivalMoment)) {
                return false;
            }
            arrivalMoment.add(1, 'day');
        }
        return true;
    }

    const checkDisabled = (date) => {
        var _date = moment(date).format('MM-DD-YYYY')
        if (ratesData[_date] == null) {
            return true;
        }
        return (!ratesData[_date].available)
    }

    const validateMinStay = (nextValue) => {
        if (nextValue[0] == null || nextValue[1] == null) {
            return false
        }
        var arrivalMoment = moment(nextValue[0]);
        var departureMoment = moment(nextValue[1]);
        if (Math.round(moment.duration(departureMoment.diff(arrivalMoment)).as('days')) < 3) {
            return false
        }
        return true;
    }

    const checkSelected = (date) => {
        if (arrivalDate == null) {
            return false
        }
        if (departureDate == null) {
            return isSameDay(arrivalDate, date)
        }
        return isWithinInterval(date, { start: arrivalDate, end: departureDate })
    }

    function tileClassName({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            return classNames(styles.tile,
                { [styles.active]: checkSelected(date) },
                { [styles.today]: isSameDay(date, new Date()) })
        }
    }

    const handleActiveStartDateChange = ({ activeStartDate, view }) => {
    }

    const formatDate = (date) => {
        if (date == null) {
            return 'null'
        }
        const arr = date.toString().split(' ')
        return arr[0] + ', ' + arr[1] + ' ' + arr[2] + ', ' + arr[3]
    }

    const dropdownHandleOnClick = (newNumGuests) => {
        setNumGuests(newNumGuests)
        setGuestsExpanded(false)
    }

    const handleExpandClick = (newValue) => {
        setGuestsExpanded(newValue)
    }

    const placeholderText = "How many guests?"
    const guestOptions = []
    for (var i = 1; i < 27; i++) {
        guestOptions.push(i.toString())
    }

    const tileContent = ({ date, view }) => {
        const _date = moment(date.toString()).format('MM-DD-YYYY')
        if (view === 'month') {
            if (ratesData[_date] != null && ratesData[_date].available == 1) {
                return <div className={styles.tilePrice}>${ratesData[_date].price}</div>
            }
        }
    }

    const handleBookNowClick = () => {
        if (arrivalDate == null || departureDate == null || numGuests == null) {
            setStatusMessage('Please fill out arrival/departure dates and group size.')
            return
        }
        if (numGuests <= 8) {
            setPopupMessage('For groups sizes of 8 or less, use code SMALL_PARTY to receive your 5% discount.');
        } else if (numGuests > 20) {
            setPopupMessage('Group Sizes of 20+ must select the additional Casita option (+$500 fee) upon booking.');
        }
        setDisplayPopup(true)
    }

    const doNothing = () => {
        // console.log('do nothing')
    }


    return (
        <div className={styles.background}>
            <div className={styles.sidePicture}>
                <Picture fluid={sectionData.images[0].asset.fluid} sizes={'50vw'} objectFit={'cover'} />
            </div>
            <div className={styles.wrapper}>
                <div className={styles.title}>{'Book Your Stay'}</div>
                <br />
                <div className={styles.arriveDepartBar}>
                    <button className={styles.arriveDepartBox} onClick={() => onChange(null)}>
                        {arrivalDate != null && formatDate(arrivalDate)}
                        {arrivalDate != null || arriveDepartPlaceholder('Arrive')}
                    </button>
                    <div className={styles.to}>to</div>
                    <button
                        className={classNames(styles.arriveDepartBox, { [styles.disabled]: arrivalDate == null })} disabled={arrivalDate == null}
                        onClick={() => onChange(arrivalDate)}>
                        {departureDate != null && formatDate(departureDate)}
                        {departureDate != null || arriveDepartPlaceholder('Depart')}
                    </button>
                </div>

                <div className={styles.calendarWrapper}>
                    <Calendar
                        className={styles.calendar}
                        onChange={onChange}
                        view={'month'}
                        minDate={new Date()}
                        tileClassName={tileClassName}
                        tileContent={tileContent}
                        value={value}
                        tileDisabled={tileDisabled}
                        selectRange={true}
                        returnValue={'range'}
                        allowPartialRange={true}
                        activeStartDate={activeStartDate}
                        showNeighboringMonth={false}
                        onActiveStartDateChange={handleActiveStartDateChange}
                    />
                </div>
                <div className={styles.guestsBar}>
                    <DropdownMenu handleOptionClick={dropdownHandleOnClick}
                        selected={numGuests}
                        placeholderText={placeholderText}
                        options={guestOptions}
                        expanded={guestsExpanded}
                        handleExpandClick={handleExpandClick} />
                </div>
                <div className={styles.statusBar}>
                    {statusMessage}
                </div>
                <button className={styles.bookButton} onClick={() => handleBookNowClick()}>
                    {sectionData.links[0].text}
                </button>
            </div>
            <div className={styles.sidePicture}>
                <Picture fluid={sectionData.images[1].asset.fluid} sizes={'50vw'} objectFit={'cover'} />
            </div>
            <div className={classNames(styles.popupContainer, { [styles.display]: displayPopup })} onClick={() => setDisplayPopup(!displayPopup)}>
                <div className={styles.popup} onClick={() => doNothing()}>
                    <span>{popupInfo}</span>
                    <br />
                    <span>{popupMessage}</span>
                    <br />
                    <a className={styles.link} href={`${sectionData.links[0].dest}&adults=${numGuests}&arrivalDate=${moment(arrivalDate).format('DD/MM/YYYY')}&departureDate=${moment(departureDate).format('DD/MM/YYYY')}`}>
                        Click here to complete your booking!
                </a>
                </div>
            </div>

        </div>
    )
}



export default CalendarComponent

