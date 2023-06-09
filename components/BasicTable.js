import MaterialReactTable from "material-react-table";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import EditEquip from "./EditEquip";
import { useSession } from "next-auth/react";

export const BasicTable = (props) => {
  const buttonStyle = { margin: "10px 0", width: "40%" };

  const { data: session, status } = useSession();
  const [selectedRow, SetSelectedRow] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [equipoId, setEquipoId] = useState('')

  const handleEditClick = (rowData) => {
    SetSelectedRow(rowData);
  };

  const handleDeleteClick = async (rowData) => {
    setDeleteOpen(true);
    setEquipoId(rowData)
  };

  const handleDelete = async () => {
   
    await fetch(`http://localhost:8000/api/v1/equipos/${equipoId.id}`, {
      method: "DELETE",
    });
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/cliente/${session?.session.user.email}/equipos`
    );
    const data = await response.json();
    let equipoMarca = [];
    data?.Equipos.map((d) => {
      equipoMarca.push(d.marca);
    });
    props.setEquipos(data?.Equipos);
    setDeleteOpen(false);
  };

  const handleDialogClose = () => {
    SetSelectedRow(null);
  };

  const columns = [
    ...props.columns,
    {
      header: "Actions",
      id: "actions",
      Cell: ({ row }) => (
        <div>
          <IconButton onClick={() => handleEditClick(row.original)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(row.original)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
      <MaterialReactTable columns={columns} data={props.data} />
      {selectedRow && (
        <EditEquip
          rowData={selectedRow}
          onClose={handleDialogClose}
          setEquipos={props.setEquipos}
        />
      )}
      <Dialog open={deleteOpen}>
        <DialogTitle textAlign="center" sx={{ fontSize: "2rem" }}>
          Seguro que desea eliminar este equipo?
        </DialogTitle>
        <DialogActions
          sx={{
            p: "1.25rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            style={buttonStyle}
            onClick={() => setDeleteOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" style={buttonStyle} type="submit" color='error' onClick={handleDelete}>
            Si
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
