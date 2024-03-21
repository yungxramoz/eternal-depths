import React from 'react'
import { render } from '@testing-library/react'
import LightProgressBar from './LightProgressBar'

describe('LightProgressBar', () => {
  it('renders correctly HP bar', () => {
    render(<LightProgressBar current={50} max={100} type="hp" />)
    expect(document.body).toMatchSnapshot('LightProgressBar Hp')
  })

  it('renders correctly XP bar', () => {
    render(<LightProgressBar current={50} max={100} type="xp" />)
    expect(document.body).toMatchSnapshot('LightProgressBar Xp')
  })
})
