export const parseId = (id: string | string[] | undefined): number | null => {
  const parsedId = Number(id)

  if (isNaN(parsedId) || parsedId < 0) {
    return null
  }

  return parsedId
}
