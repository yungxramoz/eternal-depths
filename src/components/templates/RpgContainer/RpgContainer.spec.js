import { render, screen } from '@testing-library/react'
import React from 'react'
import RpgContainer from './RpgContainer'

describe('RpgContainer', () => {
  it('renders correctly', () => {
    render(<RpgContainer />)
    expect(screen).toMatchSnapshot('RpgContainer')
  })

  it('applies correct classes based on props', () => {
    render(
      <RpgContainer
        framed
        golden
        golden2
        grey
        fullPage
        className="custom-class"
      />,
    )
  })
  it('applies background image based on bgImg prop', () => {
    render(<RpgContainer bgImg="test.png" />)
    expect(screen).toMatchSnapshot('RpgContainer Background Image')
  })
})
