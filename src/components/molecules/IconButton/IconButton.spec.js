import React from 'react'
import TestRenderer from 'react-test-renderer'
import IconButton from './IconButton'

describe('IconButton', () => {
  it('renders IconButton component', () => {
    const tree = TestRenderer.create(<IconButton icon="plus" />)

    expect(tree).toMatchSnapshot()
  })

  it('renders the correct size class based on the size prop', () => {
    const testRenderer = TestRenderer.create(
      <IconButton icon="plus" size="large" />,
    )
    const testInstance = testRenderer.root

    expect(
      testInstance.findByProps({ className: 'icon-button large' }),
    ).toBeTruthy()
  })

  it('disables the button when the disabled prop is true', () => {
    const testRenderer = TestRenderer.create(
      <IconButton icon="plus" disabled />,
    )
    const testInstance = testRenderer.root

    expect(testInstance.findByProps({ disabled: true })).toBeTruthy()
  })
})
