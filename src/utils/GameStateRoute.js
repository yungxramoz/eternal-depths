import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const GameStateRoute = ({ children }) => {
  const gameState = useSelector((state) => state.game.gameState)
  const location = useLocation()

  const idlePaths = ['/', '/new-character', 'leaderboard']
  const overPaths = ['/game-over']
  const wonPaths = ['/game-won']
  const playingPaths = ['/dungeon']

  const navigateToPath = (path) => {
    return <Navigate to={path} />
  }

  if (gameState === 'idle' && !idlePaths.includes(location.pathname)) {
    return navigateToPath('/')
  }
  if (gameState === 'over' && !overPaths.includes(location.pathname)) {
    return navigateToPath('/game-over')
  }
  if (gameState === 'won' && !wonPaths.includes(location.pathname)) {
    return navigateToPath('/game-won')
  }
  if (gameState === 'playing' && !playingPaths.includes(location.pathname)) {
    return navigateToPath('/dungeon')
  }

  return children
}

export default GameStateRoute
