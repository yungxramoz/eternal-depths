import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import gameReducer from './store/game/gameSlice'

describe('App', () => {
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        game: gameReducer,
      },
    })
  })
  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    )
    expect(document.body).toMatchSnapshot('App')
  })

  it('renders Home component for root path', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    )
    const homeElement = await screen.findByText('Eternal Depths')
    expect(homeElement).toBeInTheDocument()
  })
})
