import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function List() {
  const [taskData, setTaskData] = useState([]);
  const [selectedTask,setSelectedTask] = useState([])

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch("http://localhost:3200/tasks",{
        credentials: 'include' // ✅ send cookies with the request
    });
    list = await list.json();
    if (list.success) {
      setTaskData(list.result);
    }
  };

  const deleteTask =async (id)=>{
     let item = await fetch("http://localhost:3200/delete/"+id,{
        method:'delete',
        credentials:'include'
     });
    item = await item.json();
    if (item.success) {
      getListData();
    }
  }

  const selectAll = (e)=>{
    console.log(e.target.checked)
    if(e.target.checked){
        let items = taskData.map((item)=>item._id)
        setSelectedTask(items)
    }else{
        setSelectedTask([])
    }
  }

  const selectSingleItem =(id)=>{
    if(selectedTask.includes(id)){
        let items = selectedTask.filter((item)=>item!=id);
        setSelectedTask(items);
    }else{
        setSelectedTask([id,...selectedTask]) 
    }
  }

  const deleteMultiple = async()=>{
 let item = await fetch("http://localhost:3200/delete-multiple/",{
        method:'delete',
        body:JSON.stringify(selectedTask),
        headers:{
          'content-type':'application/json'
        },
        credentials:'include'
     });
    item = await item.json();
    if (item.success) {
      getListData();
    }else{
      alert("try after sometime")
    }
  }



  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        TODO List
      </h1>
       <button onClick={deleteMultiple}
                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 mb-4 hover:cursor-pointer rounded-md text-sm transition">
                      Delete
                    </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-black text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left"> <input className='hover:cursor-pointer' onChange={selectAll} type="checkbox" /> </th>
              <th className="border border-gray-300 px-4 py-2 text-left">S.no</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-14 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {taskData &&
              taskData.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                     <td className="border border-gray-300 px-4 py-2">
                    <input className='hover:cursor-pointer'  onChange={()=>selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox" />
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-medium text-gray-700">
                    {item.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-600">
                    {item.description}
                  </td>
                  <td className=" flex border border-gray-300 px-4 py-2 space-x-2">
                    <button onClick={()=>deleteTask(item._id)}
                     className="bg-red-500 hover:bg-red-600  hover:cursor-pointer  text-white px-3 py-1 rounded-md text-sm transition">
                      Delete
                    </button>
                    <Link to={"update/"+item._id} className="bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded-md text-sm transition">
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;

