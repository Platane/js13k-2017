export const read = (label: string): any => {
  try {
    return JSON.parse(window.localStorage.getItem(label))
  } catch (err) {
    return null
  }
}

export const write = (label: string, object: any): void => {
  try {
    return localStorage.setItem(label, JSON.stringify(object))
  } catch (err) {
    return
  }
}
