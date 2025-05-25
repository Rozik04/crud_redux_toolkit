import {configureStore} from '@reduxjs/toolkit'
import create from './features/create'
import remove from './features/delete'
import save from './features/saved'

export const store = configureStore({
    reducer: {
        create,
        remove,
        save
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch