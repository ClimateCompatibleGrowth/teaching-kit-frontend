import { NextFont } from '@next/font/dist/types'
import { Montserrat, Ubuntu } from '@next/font/google'

type Font = {
  400: NextFont
}

type FontWithMoreWeights = Font & {
  500: NextFont
}

const normalUbuntu = Ubuntu({
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
  400: normalUbuntu,
}

export const montserrat: FontWithMoreWeights = {
  400: Montserrat400,
  500: Montserrat500,
}
