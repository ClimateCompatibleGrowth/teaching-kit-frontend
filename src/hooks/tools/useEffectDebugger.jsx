import { useEffect, useRef } from 'react'

const usePrevious = (value, initialValue) => {
  const ref = useRef(initialValue)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// Use this hook by simply replacing the 'useEffect' you want to debug with this call.
// The dependency which is triggering the useEffect callback will be logged, with its
// previous and new values.
const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
  const previousDeps = usePrevious(dependencies, [])

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index
      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency,
        },
      }
    }

    return accum
  }, {})

  if (Object.keys(changedDeps).length) {
    console.log('[use-effect-debugger] ', changedDeps)
  }

  useEffect(effectHook, [...dependencies, effectHook])
}

export default useEffectDebugger
