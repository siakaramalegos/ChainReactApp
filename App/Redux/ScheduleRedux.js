import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  trackCurrentTime: null,
  startCurrentTime: null,
  updateCurrentTime: ['time'],
  lockCurrentTime: ['time'],
  unlockCurrentTime: null,
  setSelectedEvent: ['event'],
  clearSelectedEvent: null
})

export const ScheduleTypes = Types
export default Creators

/* ------------- Initial State ------------- */
let initialTime = new Date()
if (DebugConfig.hotwireDate) {
  initialTime.setFullYear(2017)
  initialTime.setMonth(6)
  initialTime.setDate(17)
}

export const INITIAL_STATE = Immutable({
  currentTime: initialTime,
  ignoreUpdates: false,
  selectedTalk: null,
  selectedBreak: null
})

/* ------------- Reducers ------------- */

export const updateCurrentTime = (state, { time }) => {
  return (state.ignoreUpdates) ? state : state.merge({ currentTime: time })
}

export const setSelectedEvent = (state, { event }) => {
  return state.merge({ selectedEvent: event })
}

export const clearSelectedEvent = (state) => {
  return state.merge({ selectedEvent: null })
}

// Used for Debugging
export const lockCurrentTime = (state, { time }) => {
  return state.merge({ currentTime: time, ignoreUpdates: true })
}
export const unlockCurrentTime = (state) => {
  return state.merge({ ignoreUpdates: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CURRENT_TIME]: updateCurrentTime,
  [Types.LOCK_CURRENT_TIME]: lockCurrentTime,
  [Types.UNLOCK_CURRENT_TIME]: unlockCurrentTime,
  [Types.SET_SELECTED_EVENT]: setSelectedEvent,
  [Types.CLEAR_SELECTED_EVENT]: clearSelectedEvent
})
