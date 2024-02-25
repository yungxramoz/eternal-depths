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
  bgImg,
}) => {
  const containerClasses = ['rpgui-container']
  if (framed) containerClasses.push('framed')
  if (golden) containerClasses.push('framed-golden')
  if (golden2) containerClasses.push('framed-golden-2')
  if (grey) containerClasses.push('framed-grey')
  if (fullPage) containerClasses.push('full-page')
  if (className) containerClasses.push(className)

  let bgImgStyle = {}
  if (bgImg) {
    bgImgStyle = {
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }
  }

  return (
    <div className={containerClasses.join(' ')} style={bgImgStyle}>
      {children}
    </div>
  )
}

export default RpgContainer
