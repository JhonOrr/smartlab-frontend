import { useState, useEffect } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const EditEquip = ({ rowData, onClose, setEquipos}) => {
  const [editedData, setEditedData] = useState({
    marca: rowData.marca,
    modelo: rowData.modelo,
    nombre: rowData.nombre,
  });
  useEffect(() => {
    setEditedData(rowData);
  }, [rowData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    fetch(`http://localhost:8000/api/v1/equipos/${rowData.id}`, {
      method: "PUT",
      body: JSON.stringify(editedData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the data in the table with the updated data from the server
        // ...
        setEquipos(prevState => prevState.map(equipo => {
          if (equipo.id === rowData.id) {
            return data;
          } else {
            return equipo;
          }
        }));
        onClose();
      })
      .catch((error) => {
        console.error("Error updating row:", error);
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle>Edit Row</DialogTitle>
      <DialogContent>
        <TextField
          name="marca"
          label="Marca"
          defaultValue={editedData.marca}
          onChange={handleInputChange}
        />
        <TextField
          name="modelo"
          label="Modelo"
          defaultValue={editedData.modelo}
          onChange={handleInputChange}
        />
        <TextField
          name="nombre"
          label="Nombre"
          defaultValue={editedData.nombre}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEquip