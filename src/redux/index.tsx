import {configureStore} from '@reduxjs/toolkit'
import create from './features/create'
import remove from './features/delete'


export const store = configureStore({
    reducer: {
        create,
        remove
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch