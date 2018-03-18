export function insertItem<T>(array: T[], item: T, idx: number): T[] {
  return [
      ...array.slice(0, idx),
      item,
      ...array.slice(idx)
  ]
}

export function removeItem<T>(array: T[], idx: number): T[] {
  return [
      ...array.slice(0, idx),
      ...array.slice(idx + 1)
  ]
}

export function replaceItem<T>(array: T[], item: T, idx: number): T[] {
  return insertItem<T>(removeItem<T>(array, idx), item, idx)
}