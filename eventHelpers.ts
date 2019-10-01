import React from 'react'

export const preventingDefault = <E extends React.SyntheticEvent<any>, R>(
  eventHandler: (event: E) => R
) => (event: E): R => {
  event.preventDefault()
  return eventHandler(event)
}

export const withTargetValue = <E extends React.ChangeEvent<{ value: string }>, R>(
  eventHandler: (eventValue: string) => R
) => (event: E): R => {
  return eventHandler(event.target.value)
}

