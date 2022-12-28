import { NextFont } from '@next/font/dist/types'
import { Montserrat, Ubuntu } from '@next/font/google'

type Font = {
  500: NextFont
}

type FontWithMoreWeights = Font & {
  400: NextFont
}

const Ubuntu500 = Ubuntu({
  subsets: ['latin'],
  style: ['normal'],
  weight: '500',
})

const Montserrat400 = Montserrat({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['400'],
})

const Montserrat500 = Montserrat({
  subsets: ['latin'],
  style: ['normal'],
  weight: '500',
})

export const ubuntu: Font = {
  500: Ubuntu500,
}

export const montserrat: FontWithMoreWeights = {
  400: Montserrat400,
  500: Montserrat500,
}
