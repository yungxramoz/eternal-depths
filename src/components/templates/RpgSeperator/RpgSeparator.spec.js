import React from 'react'
import TestRenderer from 'react-test-renderer'
import RpgSeparator from './RpgSeparator'

describe('RpgSeparator', () => {
  it('renders correctly', () => {
    const tree = TestRenderer.create(<RpgSeparator />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('does not apply golden class when golden prop is false', async () => {
    const testRenderer = TestRenderer.create(<RpgSeparator golden={false} />)
    const testInstance = testRenderer.root
    const hr = await testInstance.findByType('hr')
    expect(hr.props.className).not.toContain('golden')
  })
})
