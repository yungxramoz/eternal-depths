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
  scrollable = false,
}) => {
  const containerClasses = ['rpgui-container container']
  if (framed) containerClasses.push('framed')
  if (golden) containerClasses.push('framed-golden')
  if (golden2) containerClasses.push('framed-golden-2')
  if (grey) containerClasses.push('framed-grey')
  if (fullPage) containerClasses.push('full-page')
  if (scrollable) containerClasses.push('scrollable')
  if (className) containerClasses.push(className)

  let bgImgStyle = {}
  if (bgImg) {
    bgImgStyle = {
      backgroundImage: `url(${bgImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
    }
  }

  return (
    <div className={containerClasses.join(' ')} style={bgImgStyle}>
      {children}
    </div>
  )
}

export default RpgContainer
