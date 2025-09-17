import { v4 as uuidv4 } from "uuid";
export function toDosReducer(currentToDoTasks, action) {
  //this reducer function contains all the ToDos logic addTask deleteTask updateTask

  switch (action.type) {
    case "added": {
      const newTask = {
        id: uuidv4(),
        title: action.payload.title,
        description: "",
        isComplited: false,
        priority: action.payload.priority,
      };
      const updatedTasks = [...currentToDoTasks, newTask];
      return updatedTasks;
    }
    case "deleted": {
      const newTasks = currentToDoTasks.filter((t) => {
        return t.id !== action.payload.id;
      });
      return newTasks;
    }

    case "updated": {
      return currentToDoTasks.map((t) => {
        return t.id === action.payload.id
          ? {
              ...t,
              title: action.payload.UpdatedToDo.title,
              description: action.payload.UpdatedToDo.description,
              priority: action.payload.UpdatedToDo.priority,
            }
          : t;
      });
    }
    case "completed": {
      return currentToDoTasks.map((t) => {
        return t.id !== action.payload.taskId
          ? t
          : { ...t, isComplited: !t.isComplited };
      });
    }
    case "get": {
      return JSON.parse(localStorage.getItem("todotasks")) || [];
    }
    case "set": {
      localStorage.setItem("todotasks", JSON.stringify(currentToDoTasks));
      return currentToDoTasks;
    }
    case "setTasks": {
  localStorage.setItem("todotasks", JSON.stringify(action.payload));
  return action.payload;
}

    default: {
      return currentToDoTasks;
    }
  }
}
