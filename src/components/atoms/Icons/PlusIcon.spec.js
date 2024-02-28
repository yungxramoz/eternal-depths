import React from 'react'
import TestRenderer from 'react-test-renderer'
import PlusIcon from './PlusIcon'

describe('PlusIcon', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(<PlusIcon />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
