import React from 'react'
import { LevelName } from '../../types'

type Props = {
  level: LevelName
}

const Level = ({ level }: Props) => {
  return level !== undefined ? <p>Level: {level}</p> : null
}

export default Level
