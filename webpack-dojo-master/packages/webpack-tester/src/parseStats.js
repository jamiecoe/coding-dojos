const parseStats = stats => {
  const info = stats.toJson('normal')

  if (stats.hasErrors()) {
    return Promise.reject(new Error(info.errors[0]))
  }

  return info
}

module.exports = parseStats
