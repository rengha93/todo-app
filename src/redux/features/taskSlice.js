import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const getTaskFromLocalStorage = () => {
    try {
        const taskData = localStorage.getItem('demoTask');
        const parsed = taskData ? JSON.parse(taskData) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
};

const setTaskToLocalStorage = (payload) => {
    localStorage.setItem('demoTask', JSON.stringify(payload))
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: getTaskFromLocalStorage(),
        filter: {
            status: 'all',
            search: ''
        }
    },
    reducers: {
        'addTask': (state, action) => {
            const taskWithId = { ...action.payload, id: nanoid() };
            state.tasks.push(taskWithId);
            setTaskToLocalStorage(state.tasks);
        },
        'deleteTask': (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            setTaskToLocalStorage(state.tasks);
        },
        'toggleComplete': (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                setTaskToLocalStorage(state.tasks);
            }
        },
        'editTask': (state, action) => {
            const { id, newText } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.text = newText;
                setTaskToLocalStorage(state.tasks);
            }
        },
        'setFilterStatus': (state, action) => {
            state.filter.status = action.payload
        },
        'setSearchStatus': (state, action) => {
            state.filter.search = action.payload
        }
    }
})

export const { addTask, deleteTask, toggleComplete, editTask, setFilterStatus, setSearchStatus } = taskSlice.actions;

export default taskSlice.reducer;