export const X_PADDING = 3
export const Y_PADDING = 10

export const remainingWidth = (width: number): number => {
  return 100 - width
}

export const toPercentage = (value: number): `${number}%` => {
  return `${value}%`
}

export const startXPos = toPercentage(X_PADDING)
export const startYPos = toPercentage(Y_PADDING)
