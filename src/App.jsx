import React from "react";

function AmountOfTasks(props){
  return (
    <div>
      You have {props.tasks.length} todos
    </div>
  )
}

function DisplayTasks(props){
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
    {props.tasks.map((task) => (
      <li key={task.id}>
        {task.value}
        <button onClick={() => props.removeTask(task.id)}>Remove</button>
      </li>
    ))}
  </ul>
  )
}

function NewTask(props){
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      props.addTask(event.target.elements.inputTask.value);
      event.target.reset();
    }}>
        <input type="text" id="inputTask"/>
        <button type="submit">Add task</button>
    </form>
  )
}


function App() {
  const allTasks = JSON.parse(window.localStorage.getItem("tasks")) ?? [];
  const [tasks, setTasks] = React.useState(allTasks); //useState([])

  function addTask(task) {
    setTasks((tasks) => [...tasks, {id:tasks.length, value:task}]);
  }
  function removeTask(task) {
    setTasks(tasks.filter((_,i) => i !== task));
  }

  React.useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <AmountOfTasks tasks={tasks}/>
      <DisplayTasks tasks={tasks} removeTask={removeTask} />
      <NewTask tasks={tasks} setTasks={setTasks} addTask={addTask} />
    </div>
  );
}

export default App
