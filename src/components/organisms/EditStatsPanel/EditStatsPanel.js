import React, {useState} from 'react'
import IconButton from '../../molecules/IconButton/IconButton'
import RpgContainer from '../../templates/RpgContainer/RpgContainer'
import RpgSeparator from '../../templates/RpgSeperator/RpgSeparator'
import './EditStatsPanel.css'

const EditStatsPanel = ({ localStats, initialPoints, assignedPoints, setAssignedPoints }) => {
  const [points, setPoints] = useState(initialPoints)

  const updateStats = (stat, value) => {
    if (value < 0 && assignedPoints[stat] === 0) return
    if (value > 0 && points === 0) return
    setAssignedPoints({
      ...assignedPoints,
      [stat]: assignedPoints[stat] + value,
    })
    setPoints(points - value)
  }

  const isMinusDisabled = (stat) => {
    return assignedPoints[stat] === 0
  }

  const isPlusDisabled = () => {
    return points === 0
  }

  return (
    <RpgContainer golden className="attribute-container">
      <h2>Attributes</h2>
      <p>Available points: {points}</p>
      <RpgSeparator golden={false} />
      {Object.keys(localStats).map((stat) => (
        <div className="attribute" key={stat}>
          <p>{stat.charAt(0).toUpperCase() + stat.slice(1)}</p>
          <div className="attr-controller">
            <IconButton
              icon="minus"
              size="medium"
              onClick={() => updateStats(stat, -1)}
              disabled={isMinusDisabled(stat)}
            />
            <p>{localStats[stat] + assignedPoints[stat]}</p>
            <IconButton
              icon="plus"
              size="medium"
              onClick={() => updateStats(stat, 1)}
              disabled={isPlusDisabled()}
            />
          </div>
        </div>
      ))}
    </RpgContainer>
  )
}

export default EditStatsPanel