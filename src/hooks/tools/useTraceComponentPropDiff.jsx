import { useEffect, useRef } from 'react'

// Used to find out what props triggered a change in a component.
// https://stackoverflow.com/a/51082563/5837635
export const useTraceUpdate = (props) => {
  const prev = useRef(props)
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v]
      }
      return ps
    }, {})
    if (Object.keys(changedProps).length > 0) {
      console.log('Changed props:', changedProps)
    }
    prev.current = props
  })
}
