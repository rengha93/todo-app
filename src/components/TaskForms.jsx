
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from '../redux/features/taskSlice';
import { nanoid } from "nanoid";

export default function TaskForms() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text.trim() === '') return;

        dispatch(addTask({
            id: nanoid(),
            text: text,
            complete: false
        }))

        setText('')
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4 items-stretch">
            <input
                type="text"
                value={text}
                placeholder="Add a new task"
                onChange={(e) => setText(e.target.value)}
                className="w-full sm:flex-1 p-2 border rounded-md" />

            <button type="submit" className="bg-blue-500 text-white px-2 sm:px-6 py-2 rounded hover:bg-blue-700">Add Task</button>
        </form>
    )
}
