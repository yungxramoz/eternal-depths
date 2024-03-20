import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import GAME_STATE from '../constants/game-state'
import ROUTE from '../constants/routes'

const GameStateRoute = () => {
  const gameState = useSelector((state) => state.game.gameState)
  const location = useLocation()

  const idlePaths = [ROUTE.HOME, ROUTE.NEW_CHARACTER, ROUTE.LEADERBOARD]
  const overPaths = [ROUTE.GAME_OVER]
  const wonPaths = [ROUTE.GAME_WON]
  const playingPaths = [ROUTE.DUNGEON]

  const navigateToPath = (path) => {
    return <Navigate to={path} />
  }

  if (gameState === GAME_STATE.IDLE && !idlePaths.includes(location.pathname)) {
    return navigateToPath(ROUTE.HOME)
  }
  if (gameState === GAME_STATE.OVER && !overPaths.includes(location.pathname)) {
    return navigateToPath(ROUTE.GAME_OVER)
  }
  if (gameState === GAME_STATE.WON && !wonPaths.includes(location.pathname)) {
    return navigateToPath(ROUTE.GAME_WON)
  }
  if (
    gameState === GAME_STATE.PLAYING &&
    !playingPaths.includes(location.pathname)
  ) {
    return navigateToPath(ROUTE.DUNGEON)
  }

  return <Outlet />
}

export default GameStateRoute
