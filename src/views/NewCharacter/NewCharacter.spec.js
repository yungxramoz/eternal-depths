import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import gameSlice from '../../store/game/gameSlice'
import NewCharacter from './NewCharacter'

jest.mock(
  '../../components/organisms/CharacterChooser/CharacterChooser',
  () => {
    return ({ onCharacterChange }) => (
      <button onClick={() => onCharacterChange(1)}>Change character</button>
    )
  },
)

const preloadedState = {
  game: {
    character: {
      current: {
        characterLook: 1,
        name: '',
        stats: {
          health: 1,
          strength: 1,
          agility: 1,
          precision: 1,
        },
      },
      availableAttributePoints: 2,
    },
  },
}

describe('NewCharacter', () => {
  let store
  beforeEach(() => {
    store = configureStore({
      reducer: {
        game: gameSlice,
      },
      preloadedState,
    })
  })
  it('renders correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <NewCharacter />
        </Provider>
      </Router>,
    )
    expect(document.body).toMatchSnapshot('NewCharacter')
  })
  it('updates localName when the input changes', () => {
    render(
      <Router>
        <Provider store={store}>
          <NewCharacter />
        </Provider>
      </Router>,
    )
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Test Name' },
    })
    expect(screen.getByPlaceholderText('Name').value).toBe('Test Name')
  })

  it('updates characterLook when CharacterChooser changes', () => {
    render(
      <Router>
        <Provider store={store}>
          <NewCharacter />
        </Provider>
      </Router>,
    )
    fireEvent.click(screen.getByText('Change character'))
  })

  it('dispatches actions when "Create" button is clicked', () => {
    store = configureStore({
      reducer: {
        game: gameSlice,
      },
      preloadedState: {
        game: {
          ...preloadedState.game,
          character: {
            ...preloadedState.game.character,
            availableAttributePoints: 0,
          },
        },
      },
    })
    store.dispatch = jest.fn()
    render(
      <Router>
        <Provider store={store}>
          <NewCharacter />
        </Provider>
      </Router>,
    )
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Test Name' },
    })
    fireEvent.click(screen.getByText('Change character'))

    fireEvent.click(screen.getByText('Create'))

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/characterSetName' }),
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/characterSetLook' }),
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/characterAssignAttributePoint' }),
    )
    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'game/gameStart' }),
    )
  })
})
