const removeUnderlines = (arr: string[]) => {
  const arrWithoutUnderlines = arr.map(word =>
    word.replace(/^_/, '').replace(/_/g, ' ')
  )

  return arrWithoutUnderlines
}

export default removeUnderlines
