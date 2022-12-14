import { NextFont } from '@next/font/dist/types'
import { Montserrat, Ubuntu } from '@next/font/google'

type Font = {
  normal: NextFont;
  thin?: NextFont;
}

const normalUbuntu = Ubuntu({
  subsets: ['latin'],
  style: ['normal'],
  weight: '500',
})

const normalMontserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal'],
  weight: '400',
})

const thinMontserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal'],
  weight: '200',
})

export const ubuntu: Font = {
  normal: normalUbuntu,
}

export const montserrat: Font = {
  normal: normalMontserrat,
  thin: thinMontserrat
}