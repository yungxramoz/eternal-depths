import React from 'react'
import TestRenderer from 'react-test-renderer'
import MinusIcon from './MinusIcon'

describe('MinusIcon', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(<MinusIcon />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
