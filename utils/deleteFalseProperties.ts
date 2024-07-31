export function deleteFalseProperties(obj: Record<string, any>) {
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && obj[key] !== 0 && !!obj[key] === false) {
      delete obj[key]
    }
  }
  return obj
}
