import React from 'react'
import { Level } from '../../types'

type Props = {
  level: Level
}

const Level = ({ level }: Props) => {
  return level !== undefined ? <p>Level: {level}</p> : null
}

export default Level
