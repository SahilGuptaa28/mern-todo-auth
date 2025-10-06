import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTask() {

    const [taskData, setTaskData] = useState();
    const navigate = useNavigate()
    const handleAddTask = async () => {
        let result = await fetch("http://localhost:3200/add-task", {
            method: 'Post',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials:'include'
        })
        result = await result.json()
        if (result.success) {
            navigate('/');
            console.log("new task added")
            console.log(result)
        }else{
            alert("try after sometime");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Task</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600 font-medium">Title</label>
                    <input onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                        type="text"
                        name="title"
                        placeholder="Enter Task title"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600 font-medium">Description</label>
                    <textarea onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                        name="description"
                        placeholder="Enter Task description"
                        className="border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>
                <button onClick={handleAddTask}
                    type="submit"
                    className="bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 hover:cursor-pointer transition-colors"
                >
                    Add New Task
                </button>
            </div>
        </div>
    );
}

export default AddTask;

