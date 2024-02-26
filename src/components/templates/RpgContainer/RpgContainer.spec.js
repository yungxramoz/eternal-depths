import React from 'react'
import TestRenderer from 'react-test-renderer'
import RpgContainer from './RpgContainer'

describe('RpgContainer', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(<RpgContainer />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('applies correct classes based on props', async () => {
    const testRenderer = TestRenderer.create(
      <RpgContainer
        framed
        golden
        golden2
        grey
        fullPage
        className="custom-class"
      />,
    )
    const testInstance = testRenderer.root
    const div = await testInstance.findByType('div')
    expect(div.props.className).toEqual(
      'rpgui-container framed framed-golden framed-golden-2 framed-grey full-page custom-class',
    )
  })
  it('applies background image based on bgImg prop', async () => {
    const testRenderer = TestRenderer.create(<RpgContainer bgImg="test.png" />)
    const testInstance = testRenderer.root
    const div = await testInstance.findByType('div')
    expect(div.props.style).toEqual({
      backgroundImage:
        'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(test.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    })
  })
})
