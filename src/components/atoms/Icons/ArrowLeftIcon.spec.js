import React from 'react'
import TestRenderer from 'react-test-renderer'
import ArrowLeftIcon from './ArrowLeftIcon'

describe('ArrowLeftIcon', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(<ArrowLeftIcon />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
