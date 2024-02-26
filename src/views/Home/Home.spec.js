import React from 'react'
import TestRenderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

describe('Home', () => {
  test('renders correctly', () => {
    const tree = TestRenderer.create(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('contains correct elements and text', async () => {
    const testRenderer = TestRenderer.create(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    const testInstance = testRenderer.root
    const h1 = await testInstance.findByType('h1')
    expect(h1.children).toEqual(['Eternal Depths'])
    const buttons = await testInstance.findByProps({ className: 'button-menu' })
    expect(buttons.children[0].props.to).toEqual('/new-character')
    expect(buttons.children[0].props.children.props.text).toEqual(
      'New Character',
    )
    expect(buttons.children[1].props.to).toEqual('/leaderboard')
    expect(buttons.children[1].props.children.props.text).toEqual('Leaderboard')
  })
})
