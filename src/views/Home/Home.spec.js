import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    expect(document.body).toMatchSnapshot('Home')
  })
})
