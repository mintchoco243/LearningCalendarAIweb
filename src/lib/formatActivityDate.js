const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatActivityDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day}-${monthAbbreviations[Number(month) - 1]}-${year.slice(-2)}`
}
