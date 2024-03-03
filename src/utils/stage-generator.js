export const generateStage = (encounter) => {
  const stages = encounter.stages
  const randomIndex = Math.floor(Math.random() * stages.length)
  return stages[randomIndex]
}
