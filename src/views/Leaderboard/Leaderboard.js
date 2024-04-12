import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboard } from '../../store/leaderboard/leaderboardSlice'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import GoBackButton from '../../components/organisms/GoBackButton/GoBackButton'

const Leaderboard = () => {
  const dispatch = useDispatch()
  const leaderboard = useSelector((state) => state.leaderboard.entries)
  const loading = useSelector((state) => state.leaderboard.loading)

  useEffect(() => {
    dispatch(fetchLeaderboard({ page: 0, pageSize: 100 }))
  }, [dispatch])

  return (
    <RpgContainer fullPage scrollable>
      <GoBackButton className="align-self-start" />
      <h1>Leaderboard</h1>
      {loading === 'loading' && <p>Loading...</p>}
      {loading === 'idle' && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{`${entry.player_name} (${entry.character_name})`}</td>
                <td>{entry.stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </RpgContainer>
  )
}

export default Leaderboard
