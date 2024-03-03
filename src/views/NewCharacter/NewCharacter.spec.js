import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import store from '../../store/store'
import NewCharacter from './NewCharacter'

jest.mock('../../components/organisms/CharacterChooser/CharacterChooser')

describe('NewCharacter', () => {
  it('renders correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <NewCharacter />
        </Provider>
      </Router>,
    )
    expect(screen).toMatchSnapshot('NewCharacter')
  })
})
