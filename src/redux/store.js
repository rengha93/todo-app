import { configureStore } from "@reduxjs/toolkit";
import taskReducers from './features/taskSlice';

export const store = configureStore({
    reducer: {
        'tasks': taskReducers
    }
})