import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboard } from '../../store/leaderboard/leaderboardSlice'
import RpgContainer from '../../components/templates/RpgContainer/RpgContainer'
import GoBackButton from '../../components/organisms/GoBackButton/GoBackButton'
import CharacterAvatar from '../../components/molecules/CharacterAvatar/CharacterAvatar'

import './Leaderboard.css'

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
        <>
          {leaderboard.map((entry, index) => (
            <RpgContainer key={entry.id} golden className="leaderboard-entry">
              <p className="rank">{index + 1}</p>
              <CharacterAvatar look={entry.character.look} />
              <div className="name">
                <p>{entry.player_name}</p>
                <p>{entry.character_name}</p>
              </div>
              <p>{entry.stage}</p>
            </RpgContainer>
          ))}
        </>
      )}
    </RpgContainer>
  )
}

export default Leaderboard
