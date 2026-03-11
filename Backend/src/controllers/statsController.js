import stats from "../data/statsData.js"

export const getStats = (req, res) => {
  res.json(stats)
}