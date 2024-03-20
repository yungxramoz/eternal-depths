import { render } from '@testing-library/react'
import React from 'react'
import CharacterHeader from './CharacterHeader'

jest.mock('../../molecules/CharacterAvatar/CharacterAvatar', () => {
  return ({ look }) => <div>CharacterAvatar, look: {look}</div>
})

describe('CharacterHeader', () => {
  const character = {
    look: 'test-look',
    hp: 50,
    level: 1,
    xp: 10,
  }
  const maxHp = 100
  const maxXp = 20

  it('renders correctly', () => {
    render(
      <CharacterHeader character={character} maxHp={maxHp} maxXp={maxXp} />,
    )
    expect(document.body).toMatchSnapshot()
  })
})
