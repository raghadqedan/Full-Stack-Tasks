import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ToDo from "./ToDo";

export default function SortableToDo({ data, handleClickOpen, handleOpenEditDialog }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ToDo
         key={data.id}
        data={data}
        handleClickOpen={handleClickOpen}
        handleOpenEditDialog={handleOpenEditDialog}
      />
    </div>
  );
}
