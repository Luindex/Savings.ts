import { useEffect, useMemo, useReducer } from 'react'
import { ActivityList } from './Components/ActivityList'
import { Form } from './Components/Form'
import { SavingsTracker } from './Components/SavingsTracker'
import { activityReducer, InitialState } from './reducers/activity-reducers'


function App() {

  const [state, dispach] = useReducer(activityReducer, InitialState)

  useEffect(() =>
    localStorage.setItem('activities', JSON.stringify(state.activities)),
    [state.activities])

  const canRestarApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>
      <header className=" bg-blue-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-between">
          <h1 className=" text-center text-lg font-bold text-white uppercase">Savings.TS</h1>
          <button
            disabled={!canRestarApp()}
            onClick={() => dispach({ type: 'clean-items' })}
            className=" bg-neutral-500 hover:bg-neutral-600 p-2 font-bold uppercase text-white cursor-pointer transition-all rounded-lg text-sm disabled:opacity-10">Restart App</button>
        </div>
      </header>

      <section className=" bg-blue-500 py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form
            dispacht={dispach}
            state={state}
          />
        </div>
      </section>

      <section className=" bg-blue-600 py-10">
        <div className=" max-w-4xl mx-auto">
          <SavingsTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className=" p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispacht={dispach}
        />
      </section>
    </>
  )
}

export default App
