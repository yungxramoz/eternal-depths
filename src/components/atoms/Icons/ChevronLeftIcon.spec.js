import React from 'react'
import TestRenderer from 'react-test-renderer'
import ChevronLeftIcon from './ChevronLeftIcon'

describe('ChevronLeftIcon', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(<ChevronLeftIcon />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
