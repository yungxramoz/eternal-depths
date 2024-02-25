import React from 'react'
import './RpgSeparator.css'

const RpgSeparator = ({ golden = true }) => {
  const separatorClasses = ['separator']
  if (golden) separatorClasses.push('golden')
  return <hr className={separatorClasses.join(' ')} />
}

export default RpgSeparator
