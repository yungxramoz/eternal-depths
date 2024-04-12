import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY,
)

const leaderboardTable = 'leaderboard'

export async function createLeaderboardEntry(playerName, stage, character) {
  const { data, error } = await supabase.from(leaderboardTable).insert([
    {
      character_name: character.name,
      player_name: playerName,
      stage,
      character,
    },
  ])
  if (error) throw error
  return data
}

export async function getLeaderboard(currentPage, pageSize) {
  const { data, error } = await supabase
    .from(leaderboardTable)
    .select()
    .range(currentPage * pageSize, (currentPage + 1) * pageSize - 1)
    .order('stage', { ascending: false })
  if (error) throw error
  return data
}
