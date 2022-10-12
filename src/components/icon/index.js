import React from 'react'
import HamburgerIcon from './hamburger'
import MailIcon from './mail'
import PhoneIcon from './phone'
import HouseIcon from './house'
import SleepIcon from './sleep'
import BedIcon from './bed'
import BathIcon from './bath'
import DoorIcon from './door'
import NightIcon from './night'
import NextIcon from './next'
import BeforeIcon from './before'
import PlayIcon from './play'
import ExpandLess from './expand-less'
import ExpandMore from './expand-more'

function Icon (props) {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon/>
    case 'email':
      return <MailIcon fill={props.fill} size={props.size}/>
    case 'phone':
      return <PhoneIcon fill={props.fill} size={props.size}/>
    case 'house':
      return <HouseIcon/>
    case 'sleeps':
      return <SleepIcon />
    case 'bedrooms':
      return <BedIcon />
    case 'bathrooms':
      return <BathIcon />
    case 'half-baths':
      return <DoorIcon />
    case 'min stay':
      return <NightIcon />
    case 'next':
      return <NextIcon />
    case 'before':
      return <BeforeIcon />
    case 'play':
      return <PlayIcon />
    case 'expand-less':
      return <ExpandLess />
    case 'expand-more':
      return <ExpandMore />
    default:
      return <span>Unknown icon: {props.symbol}</span>
  }
}

export default Icon
