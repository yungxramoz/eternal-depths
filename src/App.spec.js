import React from 'react'
import TestRenderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import Home from './views/Home/Home'

describe('App', () => {
  test('renders correctly', () => {
    const tree = TestRenderer.create(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders Home component for root path', async () => {
    const testRenderer = TestRenderer.create(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )
    const testInstance = testRenderer.root
    const homeComponents = await testInstance.findAllByType(Home)
    expect(homeComponents).toHaveLength(1)
  })
})
