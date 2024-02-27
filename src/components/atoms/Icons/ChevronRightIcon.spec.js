import React from 'react'
import TestRenderer from 'react-test-renderer'
import ChevronRightIcon from './ChevronRightIcon'

describe('ChevronRightIcon', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(<ChevronRightIcon />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
