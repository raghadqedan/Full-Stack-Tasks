import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useTasks } from "../contexts/tasksContext";
import { useToast } from "../contexts/ToastContext";

export default function ToDo({ data, handleClickOpen, handleOpenEditDialog }) {
  const { id, title, description, isComplited } = data;
  const { dispatch } = useTasks();
  // const [tasks,dispatch]=useReducer(toDosReducer,[])

  //use the Toast context to show the toast
  const { showToast } = useToast();

  function handleCompleteTask(taskId) {
    // const newTasks = task.map((t) => {
    //   return t.id !== taskId ? t : { ...t, isComplited: !t.isComplited };
    // });
    // setTask(newTasks);
    dispatch({ type: "completed", payload: { taskId: taskId } });

    showToast(
      !isComplited
        ? "Task completed successfully"
        : "Task marked as incomplete ⚠️"
    );
  }
  const iconButtonStyle = {
    backgroundColor: "white",
    borderRadius: "50%",
    margin: "0 5px",
    border: "3px solid",
    padding: "4px",
  };

  //  handle Delete Dialog

  const showDeleteDialog = () => {
    handleClickOpen(data);
  };

  //  -- handle Delete Dialog

  return (
    <>
      <Card
        className="toDoCard"
        variant="outlined"
        sx={{
          marginTop: "20px",
          backgroundColor: "",
          textAlign: "start",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Grid
            container
            spacing={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "start",
                  textDecoration: isComplited ? "line-through" : "none",
                  backgroundColor: "#ffffff",
                  textDecorationColor: "#F82169B6",
                }}
              >
                {title}
              </Typography>
              <Typography variant="h6">{description}</Typography>
            </Grid>
            <Grid size={4}>
              <IconButton
                className={"iconButton"}
                aria-label="completed"
                sx={{
                  ...iconButtonStyle,
                  color: isComplited ? "#ffffff" : "#4CAF50",
                  backgroundColor: isComplited ? "#4CAF50" : "#ffffff",
                  borderColor: "#4CAF50",
                }}
                onClick={() => {
                  handleCompleteTask(id);
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className={"iconButton"}
                aria-label="edit"
                sx={{
                  ...iconButtonStyle,
                  color: "#5E35B1",
                  borderColor: "#5E35B1",
                }}
                onClick={() => {
                  handleOpenEditDialog(data);
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>

              <IconButton
                className={"iconButton"}
                aria-label="delete"
                sx={{
                  ...iconButtonStyle,
                  color: "#E53935",
                  borderColor: "#E53935",
                }}
                onClick={showDeleteDialog}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
