import { NextFont } from "next/dist/compiled/@next/font"
import { Montserrat, Ubuntu } from "next/font/google"

type UbuntuFont = {
  400: NextFont
  500: NextFont
  700: NextFont
}

type MontserratFont = {
  300: NextFont
  400: NextFont
  500: NextFont
  600: NextFont
  700: NextFont
}

const Ubuntu400 = Ubuntu({
  subsets: ['latin'],
  style: ['normal'],
  weight: '400',
})

const Ubuntu500 = Ubuntu({
  subsets: ['latin'],
  style: ['normal'],
  weight: '500',
})

const Ubuntu700 = Ubuntu({
  subsets: ['latin'],
  style: ['normal'],
  weight: '700',
})

const Montserrat300 = Montserrat({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['300'],
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

const Montserrat600 = Montserrat({
  subsets: ['latin'],
  style: ['normal'],
  weight: '600',
})

const Montserrat700 = Montserrat({
  subsets: ['latin'],
  style: ['normal'],
  weight: '700',
})

export const ubuntu: UbuntuFont = {
  400: Ubuntu400,
  500: Ubuntu500,
  700: Ubuntu700,
}

export const montserrat: MontserratFont = {
  300: Montserrat300,
  400: Montserrat400,
  500: Montserrat500,
  600: Montserrat600,
  700: Montserrat700,
}
