import React from 'react'
import './RpgContainer.css'

const RpgContainer = ({
  framed = true,
  golden,
  golden2,
  grey,
  fullPage,
  children,
  className,
}) => {
  const containerClasses = ['rpgui-container']
  if (framed) containerClasses.push('framed')
  if (golden) containerClasses.push('framed-golden')
  if (golden2) containerClasses.push('framed-golden-2')
  if (grey) containerClasses.push('framed-grey')
  if (fullPage) containerClasses.push('full-page')
  if (className) containerClasses.push(className)

  return <div className={containerClasses.join(' ')}>{children}</div>
}

export default RpgContainer
