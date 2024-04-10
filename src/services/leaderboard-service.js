import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ccsgujvmudczzpadmxmh.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjc2d1anZtdWRjenpwYWRteG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyNzE1NTYsImV4cCI6MjAyNzg0NzU1Nn0.3Ndzp5_siyjaHJn0igKn7z7MW5znFAtQ6zKGIcrBYOY'
const supabase = createClient(supabaseUrl, supabaseKey)

const leaderboardTable = 'leaderboard'

export async function createLeaderboardEntry(
  characterName,
  playerName,
  stage,
  character,
) {
  const { data, error } = await supabase.from(leaderboardTable).insert([
    {
      character_name: characterName,
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
