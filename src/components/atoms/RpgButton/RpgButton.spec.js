import React from 'react'
import TestRenderer from 'react-test-renderer'
import RpgButton from './RpgButton'

describe('RpgButton', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(<RpgButton />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('has correct text', async () => {
    const testRenderer = TestRenderer.create(
      <RpgButton text="Test" onClick={() => {}} />,
    )
    const testInstance = testRenderer.root
    const button = await testInstance.findByType('button')
    expect(button.children).toEqual(['Test'])
  })

  it('calls onClick when clicked', async () => {
    const mockOnClick = jest.fn()
    const testRenderer = TestRenderer.create(
      <RpgButton text="Test" onClick={mockOnClick} />,
    )
    const testInstance = testRenderer.root
    const button = await testInstance.findByType('button')
    button.props.onClick()
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('has golden class when golden prop is true', async () => {
    const testRenderer = TestRenderer.create(
      <RpgButton text="Test" onClick={() => {}} golden />,
    )
    const testInstance = testRenderer.root
    const button = await testInstance.findByType('button')
    expect(button.props.className).toContain('golden')
  })
})
