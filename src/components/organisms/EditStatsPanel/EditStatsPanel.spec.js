import React from 'react'
import TestRenderer from 'react-test-renderer'
import EditStatsPanel from './EditStatsPanel'

describe('EditStatsPanel', () => {
  const localStats = { strength: 0, agility: 0 }
  const initialPoints = 10
  const assignedPoints = { strength: 0, agility: 0 }
  const setAssignedPoints = jest.fn()

  it('renders EditStatsPanel component', () => {
    const testRenderer = TestRenderer.create(
      <EditStatsPanel
        localStats={localStats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />
    )
    const testInstance = testRenderer.root

    expect(testInstance.findByType('h2').children).toEqual(['Attributes'])
  })

  it('renders the correct number of available points', () => {
    const testRenderer = TestRenderer.create(
      <EditStatsPanel
        localStats={localStats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />
    )
    const testInstance = testRenderer.root

    expect(testInstance.findAllByType('p')[0].children).toEqual(['Available points: ', '10'])
  })

  it('renders the correct number of attributes', () => {
    const tree = TestRenderer.create(
      <EditStatsPanel
        localStats={localStats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />
    )

    expect(tree).toMatchSnapshot()
  })

  it('renders the correct attribute names', () => {
    const testRenderer = TestRenderer.create(
      <EditStatsPanel
        localStats={localStats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />
    )
    const testInstance = testRenderer.root

    expect(testInstance.findAllByProps({ className: 'attribute' })[0].children[0].children).toEqual(['Strength'])
    expect(testInstance.findAllByProps({ className: 'attribute' })[1].children[0].children).toEqual(['Agility'])
  })
})