"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const paperStyle = {
  padding: "40px 20px",
  height: "auto",
  width: "auto",
  margin: " 25px auto",
};
const buttonStyle = { margin: "10px 0", width: "40%" };
const containerStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
};
const inputStyle = { margin: "10px auto" };

export default function CrearEquipo(props){

  const { data: session, status } = useSession();

  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/laboratorio/v1/equipos/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
      },
      body: JSON.stringify({
        nombreEquipo: nombre,
        marcaEquipo: marca,
        modeloEquipo: modelo,
      }),
    });
    setNombre('')
    setMarca('')
    setModelo('')
    props.setOpen(false);


    const fetchEquipos = async () => {
      const response = await fetch(
        "http://localhost:8080/laboratorio/v1/equipos/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
      return await response.json();
    }

    fetchEquipos().then((h) => props.setEquipos(h?.data))
  }
  
  return (
    <>
      <Dialog open={props.open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle textAlign="center" sx={{fontSize:'2rem'}}>
            Crear Equipo
          </DialogTitle>

          <DialogContent>
            <TextField
              label="Nombre"
              placeholder="Nombre"
              type="text"
              variant="outlined"
              style={inputStyle}
              fullWidth
              value={nombre}
              required
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
            <TextField
              label="Marca"
              placeholder="Marca"
              type="text"
              variant="outlined"
              style={inputStyle}
              value={marca}
              onChange={(e) => {
                setMarca(e.target.value);
              }}
              fullWidth
              required
            />
            <TextField
              label="Modelo"
              placeholder="Modelo"
              variant="outlined"
              style={inputStyle}
              type="text"
              value={modelo}
              fullWidth
              onChange={(e) => {
                setModelo(e.target.value);
              }}
              required
            />
          </DialogContent>
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
              onClick={() => props.setOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" style={buttonStyle} type="submit">
              Crear equipo
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
