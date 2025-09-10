import type { Activity } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activiteId', payload: { id: Activity['id'] } } |
    { type: 'remove-item', payload: { id: Activity['id'] } } |
    { type: 'clean-items' }

export type ActivityState = {
    activities: Activity[]
    activeId: Activity['id']
}

const localStorageActivities = (): Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}


export const InitialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState,
    actions: ActivityActions
) => {
    if (actions.type === 'save-activity') {
        let updateActivities: Activity[] = []
        if (state.activeId) {
            updateActivities = state.activities.map(activity => activity.id === state.activeId ? actions.payload.newActivity : activity)
        } else {
            updateActivities = [...state.activities, actions.payload.newActivity]
        }

        return {
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    if (actions.type === 'set-activiteId') {
        return {
            ...state,
            activeId: actions.payload.id
        }
    }

    if (actions.type === 'remove-item') {
        return {
            ...state,
            activities: state.activities.filter(act => act.id !== actions.payload.id)
        }
    }

    if (actions.type === 'clean-items') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}