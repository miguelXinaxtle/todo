import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector } from "react-redux";

// Lista de campos para los grids en home e historico
const columns = [
  { field: "id", headerName: "numero", hide: true },
  { field: "name", headerName: "Tarea", flex: 1 },
  { field: "time", headerName: "Total", width: 90 },
  { field: "useTime", headerName: "Restante", width: 110 },
  { field: "type", headerName: "Tipo", width: 90 },
];

export default function GridTodo({ onSelectionChange }) {
  // Utilizando el useSelector obtenemos las modificaciones al state
  const todos = useSelector((state) => state.todo);
  return (
    <div
      style={{
        height: 400,
        width: "100%",
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <DataGrid
        rows={todos.todoList}
        columns={columns}
        pageSize={5}
        showToolbar
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
}
