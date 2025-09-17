import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useState, useMemo } from "react";
import { useTasks } from "../contexts/tasksContext";
import ToDo from "./ToDo";
import SortableToDo from "./SortableToDo";

//select MUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

// Dialogs MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useToast } from "../contexts/ToastContext";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";


export default function ToDoList() {
const sensors = useSensors(
  useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
);




  //handel the Toast
  const { showToast } = useToast();
  const [filter, setFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("None");
  const [taskPriority, setTaskPriority] = useState("None");

  const [dialogToDo, setDialogToDo] = useState(null);

  const { tasks, dispatch } = useTasks();
  // const [task,dispatch]=useReducer(toDosReducer,[])
  const [openDeleteDialog, setopenDeleteDialog] = useState(false);

  const [UpdatedToDo, setUpdatedToDo] = useState({
    title: "",
    description: "",
    priority: "None",
  });
  const [openEditDialog, setopenEditDialog] = useState(false);

  const [input, setInput] = useState("");
  const handleFilter = (event, newValue) => {
    if (newValue != null) setFilter(newValue);
  };

  const filteredTasks = useMemo(() => {
    console.log(tasks);
    const filteredTasks = tasks.filter((t) => {
      let statusMatch;
      if (filter === "completed") statusMatch = t.isComplited === true;
      else if (filter === "pending") statusMatch = t.isComplited === false;
      else statusMatch = true;

      let priorityMatch =
        priorityFilter !== "None" ? t.priority === priorityFilter : true;
      return statusMatch && priorityMatch;
    });
    return [...filteredTasks].sort((a, b) => {
      const priorities = { High: 3, Medium: 2, Low: 1, None: 0 };
      return priorities[b.priority] - priorities[a.priority];
    });
  }, [tasks, filter, priorityFilter]);

  const tasksList = filteredTasks.map((t) => {
    console.log(t);
    return (
      <SortableToDo
        key={t.id}
        data={t}
        handleClickOpen={handleClickOpen}
        handleOpenEditDialog={handleOpenEditDialog}
      />
    );
  });

function handleDragEnd(event) {
  const { active, over } = event;
  if (active.id !== over.id) {
    const oldIndex = tasks.findIndex(t => t.id === active.id);
    const newIndex = tasks.findIndex(t => t.id === over.id);
    if(tasks[oldIndex].priority<=tasks[newIndex].priority){
     const newTasks = arrayMove(tasks, oldIndex, newIndex);
     dispatch({ type: "setTasks", payload: newTasks });
    }else{
      showToast("⚠️ You can only reorder tasks with the same or higher priority!",false)
    }
 
    
  }
}





  function handleAddTask() {
    dispatch({
      type: "added",
      payload: { title: input, priority: taskPriority },
    });
    setInput("");
    showToast("Task added successfully");
  }
  function handleUpdateTask(event) {
    event.preventDefault();
    dispatch({ type: "updated", payload: { id: dialogToDo.id, UpdatedToDo } });
    handleCloseEditDialog();
    showToast("Task updated successfully");
  }
  function handleDeleteTaskconfirm() {
    handleClose();
    dispatch({ type: "deleted", payload: { id: dialogToDo.id } });
    showToast("Task deleted successfully");
  }

  //  handle Delete Dialog

  function handleClickOpen(data) {
    setDialogToDo(data);
    setopenDeleteDialog(true);
  }

  const handleClose = () => {
    setopenDeleteDialog(false);
  };

  //  handle priorty
  function handleChangeFilterPriority(event) {
    setPriorityFilter(event.target.value);
  }
  function handleTaskPriority(event) {
    setTaskPriority(event.target.value);
  }

  //  handle Edit Dialog
  function handleOpenEditDialog(data) {
    setDialogToDo(data);
    setUpdatedToDo({
      title: data.title,
      description: data.description,
      priority: data.priority,
    });
    setopenEditDialog(true);
  }
  function handleCloseEditDialog() {
    setopenEditDialog(false);
  }

  return (
    <>
      <Container maxWidth="sm" style={{ marginTop: "40px" }}>
        <Card
          variant="outlined"
          style={{ minHeight: "600px", height: "80vh", overflowY: "auto" }}
        >
          <CardContent>
            <Typography
              variant="h3"
              style={{
                borderRadius: "10px",
                background: "linear-gradient(90deg, #AB47BC, #E91E63)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              To Do List
            </Typography>
            <Divider variant="middle" />
            {/*Start  Filtter Button */}
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilter}
              aria-label="text alignment"
              style={{ marginTop: "30px" }}
              color="primary"
            >
              <ToggleButton
                className="toggleButton"
                value="all"
                aria-label="all task"
                onClick={() => {
                  setFilter("all");
                }}
              >
                All
              </ToggleButton>
              <ToggleButton
                className="toggleButton"
                value="completed"
                aria-label="completed task"
                onClick={() => {
                  setFilter("completed");
                }}
              >
                Completed
              </ToggleButton>
              <ToggleButton
                className="toggleButton"
                value="pending"
                aria-label="pending task"
                onClick={() => {
                  setFilter("pending");
                }}
              >
                Pending
              </ToggleButton>

              <FormControl
                size="small"
                style={{ marginLeft: "20px", marginTop: "5px", minWidth: 100 }}
              >
                <InputLabel id="demo-simple-select-label" style={{}}>
                  Priority
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={priorityFilter}
                  label="priority"
                  onChange={handleChangeFilterPriority}
                  autoWidth
                >
                  <MenuItem value={"None"}>All</MenuItem>
                  <MenuItem value={"High"}>Hight</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"Low"}>Low</MenuItem>
                </Select>
              </FormControl>
            </ToggleButtonGroup>

            {/* End  Filtter Button */}
            {/* All To Do  */}

            {tasksList.length > 0 ? (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
  <SortableContext items={filteredTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
    {tasksList}
  </SortableContext>
  </DndContext>
            ) : (
              <Typography
                variant="h6"
                align="center"
                sx={{ color: "gray", marginTop: "15px" }}
              >
                {filter === "completed"
                  ? "No Completed tasks found 🚀"
                  : filter === "pending"
                  ? "No pending tasks found 🚀"
                  : "No tasks found 🚀"}
              </Typography>
            )}
            {/* All To Do  */}

            {/* AddTask +Add button  */}
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid size={6.5}>
                <TextField
                  id="taskTitle"
                  label="What do you need to do today?"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={input}
                  onChange={(event) => {
                    setInput(event.target.value);
                  }}
                />
              </Grid>
              <Grid size={2.5}>
                <FormControl size="large" style={{ minWidth: "50px" }}>
                  <InputLabel id="demo-simple-select-label" style={{}}>
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={taskPriority}
                    label="priority"
                    onChange={handleTaskPriority}
                    autoWidth
                  >
                    <MenuItem value={"None"}>None</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"Low"}>Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={3}>
                <Button
                  className="AddButton"
                  variant="contained"
                  size="medium"
                  style={{
                    width: "100%",
                    height: "100%",
                    fontSize: "16px",
                    marginLeft: "5px",
                    background: "linear-gradient(#AB47BC, #E91E63)",
                    fontWeight: "600",
                    borderRadius: "10px",
                  }}
                  onClick={handleAddTask}
                  disabled={input.length <= 0}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>

            {/* AddTask +Add button  */}
          </CardContent>
        </Card>
      </Container>

      {/* Delete Dialog */}
      <Dialog
        onClose={handleClose}
        open={openDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this task? This action cannot be
            undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteTaskconfirm}>Delete </Button>
          <Button onClick={handleClose} autoFocus>
            cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* --Delete Dialog */}

      {/* Edit dialog  */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdateTask} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Task Title"
              type="text"
              fullWidth
              variant="standard"
              value={UpdatedToDo.title}
              onChange={(e) =>
                setUpdatedToDo({ ...UpdatedToDo, title: e.target.value })
              }
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="description"
              fullWidth
              variant="standard"
              value={UpdatedToDo.description}
              onChange={(e) =>
                setUpdatedToDo({ ...UpdatedToDo, description: e.target.value })
              }
            />

            <FormControl
              size="small"
              style={{ minWidth: "50px", marginTop: "15px" }}
            >
              <InputLabel id="demo-simple-select-label" style={{}}>
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={UpdatedToDo.priority}
                label="priority"
                onChange={(event) => {
                  setUpdatedToDo({
                    ...UpdatedToDo,
                    priority: event.target.value,
                  });
                }}
                autoWidth
              >
                <MenuItem value={"None"}>None</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* -- Edit dialog  */}
    </>
  );
}
