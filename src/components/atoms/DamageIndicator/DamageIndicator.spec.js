import React from 'react'
import { render, act } from '@testing-library/react'
import DamageIndicator from './DamageIndicator'
import ATTACK_RESULT from '../../../constants/attack-result'

describe('DamageIndicator', () => {
  let setMessages
  let messages

  beforeEach(() => {
    setMessages = jest.fn()
    messages = [
      { id: 1, type: ATTACK_RESULT.HIT, damage: 10 },
      { id: 2, type: ATTACK_RESULT.CRITICAL, damage: 20 },
      { id: 3, type: ATTACK_RESULT.EVADED },
      { id: 4, type: ATTACK_RESULT.MISSED },
    ]
  })

  it('renders correctly', () => {
    render(<DamageIndicator messages={messages} setMessages={setMessages} />)
    expect(document.body).toMatchSnapshot('DamageIndicator')
  })

  it('calls setMessages to remove messages after 1 second', async () => {
    jest.useFakeTimers()
    render(<DamageIndicator messages={messages} setMessages={setMessages} />)
    jest.advanceTimersByTime(1000)
    expect(setMessages).toHaveBeenCalledTimes(messages.length)
  })
})
