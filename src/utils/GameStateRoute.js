import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { IDLE, OVER, PLAYING, WON } from '../constants/game-state'

const GameStateRoute = () => {
  const gameState = useSelector((state) => state.game.gameState)
  const location = useLocation()

  const idlePaths = ['/', '/new-character', 'leaderboard']
  const overPaths = ['/game-over']
  const wonPaths = ['/game-won']
  const playingPaths = ['/dungeon']

  const navigateToPath = (path) => {
    return <Navigate to={path} />
  }

  if (gameState === IDLE && !idlePaths.includes(location.pathname)) {
    return navigateToPath('/')
  }
  if (gameState === OVER && !overPaths.includes(location.pathname)) {
    return navigateToPath('/game-over')
  }
  if (gameState === WON && !wonPaths.includes(location.pathname)) {
    return navigateToPath('/game-won')
  }
  if (gameState === PLAYING && !playingPaths.includes(location.pathname)) {
    return navigateToPath('/dungeon')
  }

  return <Outlet />
}

export default GameStateRoute
