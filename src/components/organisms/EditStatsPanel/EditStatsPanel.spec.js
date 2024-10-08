import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import EditStatsPanel from './EditStatsPanel'

describe('EditStatsPanel', () => {
  const stats = { strength: 0, agility: 0 }
  const initialPoints = 10
  const assignedPoints = { strength: 0, agility: 0 }
  const setAssignedPoints = jest.fn()

  beforeEach(() => {
    setAssignedPoints.mockClear()
  })

  it('renders EditStatsPanel component', () => {
    render(
      <EditStatsPanel
        stats={stats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />,
    )
    expect(document.body).toMatchSnapshot('EditStatsPanel')
  })

  it('renders the correct number of available points', () => {
    render(
      <EditStatsPanel
        stats={stats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />,
    )
    expect(screen.getByText('Available points: 10')).toBeTruthy()
  })

  it('renders the correct number of attributes', () => {
    render(
      <EditStatsPanel
        stats={stats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />,
    )

    expect(document.body).toMatchSnapshot('EditStatsPanel with 2 attributes')
  })

  it('calls setAssignedPoints when "+" button is clicked', () => {
    render(
      <EditStatsPanel
        stats={stats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />,
    )
    fireEvent.click(screen.getAllByRole('button')[1])
    expect(setAssignedPoints).toHaveBeenCalled()
  })

  it('does not call setAssignedPoints when "+" button is clicked and no points are available', () => {
    render(
      <EditStatsPanel
        stats={stats}
        initialPoints={0}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />,
    )
    fireEvent.click(screen.getAllByRole('button')[1])
    expect(setAssignedPoints).not.toHaveBeenCalled()
  })

  it('calls setAssignedPoints when "-" button is clicked', () => {
    render(
      <EditStatsPanel
        stats={stats}
        initialPoints={initialPoints}
        assignedPoints={{ strength: 1, agility: 0 }}
        setAssignedPoints={setAssignedPoints}
      />,
    )
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setAssignedPoints).toHaveBeenCalled()
  })

  it('does not call setAssignedPoints when "-" button is clicked and no points are assigned', () => {
    render(
      <EditStatsPanel
        stats={stats}
        initialPoints={initialPoints}
        assignedPoints={assignedPoints}
        setAssignedPoints={setAssignedPoints}
      />,
    )
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setAssignedPoints).not.toHaveBeenCalled()
  })
})
