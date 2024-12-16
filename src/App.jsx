import { useState, useEffect } from "react";
import Navbar from "./Comopnents/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todosstrinfy = localStorage.getItem("todos")
    if(todosstrinfy){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const SavetoLS = () => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }
  
const handleEdit = (e,id) => {
  let t  =  todos.filter(item=>item.id===id)
  setTodo(t[0].todo)
  let newTodos = todos.filter(item=>{
    return item.id !== id
  }) 
  setTodos(newTodos)
  SavetoLS()
}
const handleDelete = ( e , id) => {
  let newTodos = todos.filter(item=>{
    return item.id !== id
  })
if (confirm("Are you sure you want to delete this todo?") == true) {
 setTodos(newTodos)
} else {
 setTodos(todos) 
}
SavetoLS()
}
const toggleFinished = (e) => {
  setshowFinished(!showFinished)
}

 const handleAdd = () => {
  setTodos([...todos , {id: uuidv4() ,todo , isCompleted:false}])
  setTodo("")
  SavetoLS()
 }
 const handleChange = (e) => {
   setTodo(e.target.value)
 }
 const handleOnChange = (e) => {
  let id = e.target.name
  let index = todos.findIndex(item=>{
    return item.id == id;
  })
  let newTodos = [...todos]
  newTodos[index].isCompleted =!newTodos[index].isCompleted
  setTodos(newTodos)
  SavetoLS()
 }

 
 
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5  bg-violet-100 min-h-[80vh] md:w-[45%]">
        <h1 className="text-2xl mx-auto flex justify-center font-bold">
          iTask - Manage your todos at one place
        </h1>
        <div className="my-5 ">
          <h2 className="font-bold text-xl">Add a Todo</h2>
          <div className="flex my-3">
            <input onChange={handleChange} value={todo} className="w-full rounded-full h-8 px-4" type="text" />
            <button onClick={handleAdd}  disabled={todo.length <=3} className="rounded-full disabled:bg-violet-500 bg-violet-800 text-white h-8 mx-2 px-4 py-1 font-bold hover:bg-violet-400">Save</button>
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox"  checked={showFinished} onClick={toggleFinished} className="my-4 mx-1"/>
          <button onClick={toggleFinished} className="text-black h-8 py-1 ">{showFinished?"Show Finished":"Show all todos"}</button>
        </div>
          <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
          <h2 className="font-bold text-xl">Your Todos</h2>
          {todos.length === 0 && <div className="m-5">No todos to display</div> }
           {todos.map(item=>{       
             return (showFinished || item.isCompleted) && <div className="flex justify-between my-2" key={item.id}>
            <div className="flex " > 
              <input name={item.id} onChange={handleOnChange} className="mx-1" type="checkbox"  checked={item.isCompleted}/>
              <p className={item.isCompleted?"line-through" : ""}>{item.todo}</p>
            </div>
              <div >
                <button onClick={(e)=>handleEdit(e, item.id)} className="rounded-lg  bg-violet-800 text-white h-7 mx-1 px-2 py-1 font-bold hover:bg-violet-400"><FaEdit/></button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className="rounded-lg  bg-violet-800 text-white h-7  px-2 py-1 font-bold hover:bg-violet-400" ><AiFillDelete /></button>
              </div>
          </div>
          })}


      </div>
    </>
  );
}

export default App;
