export const X_PADDING = 3
export const Y_PADDING = 10

export const remainingWidth = (width: number): number => {
  return hundredRemains(width)
}

export const remainingHeight = (height: number): number => {
  return hundredRemains(height)
}

const hundredRemains = (subtract: number): number => 100 - subtract

export const toPercentage = (value: number): `${number}%` => {
  return `${value}%`
}

export const startXPos = toPercentage(X_PADDING)
export const startYPos = toPercentage(Y_PADDING)
