import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTask() {

    const [taskData, setTaskData] = useState();
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(()=>{
   getTask(id);
    },[])

    const getTask = async(id) =>{
  let task = await fetch("http://localhost:3200/task/"+id,{
    credentials:'include'
  });
  task = await task.json();
  if(task.result){
    setTaskData(task.result)
  }
    }

    const UpdateTask = async() =>{
        let task =  await fetch("http://localhost:3200/update-task",{
            method:'Put',
            body:JSON.stringify(taskData),
            headers:{
                'content-type':'application/json'
            },
            credentials:'include'
        })
        task = await task.json();
        if(task){
        navigate('/');
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Task</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600 font-medium">Title</label>
                    <input value={taskData ?.title} 
                     onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                        type="text"
                        name="title"
                        placeholder="Enter Task title"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600 font-medium">Description</label>
                    <textarea value={taskData ?.description}
                    onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                        name="description"
                        placeholder="Enter Task description"
                        className="border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-gray-800"
                    />
                </div>
                <button onClick={UpdateTask}
                    type="submit"
                    className="bg-black text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 hover:cursor-pointer transition-colors"
                >
                    Update Task
                </button>
            </div>
        </div>
    );
}

export default UpdateTask;

