import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem
} from "@mui/material";

const paperStyle = {
  padding: "40px 20px",
  height: "auto",
  width: "800px",
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

const CrearComponente = (props) => {
  const { data: session, status } = useSession();

  const [descripcion, setDescripcion] = useState("");
  const [equipo, setEquipo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://127.0.0.1:8000/api/v1/componentes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descripcion: descripcion,
        equipo: equipo,
      }),
    });
    setDescripcion("");
    setEquipo("");

    props.setOpen(false);
    const response = await fetch(
      `http://127.0.0.1:8000/api/v1/cliente/${session?.session.user.email}/componentes`
    );
    const data = await response.json();

    props.setComponentes(data);
  };

  return (
    <>
      <Dialog open={props.open}  >
        <form onSubmit={handleSubmit}>
          <DialogTitle textAlign="center" sx={{ fontSize: "2rem"}}>
            Crear Componente
          </DialogTitle>

          <DialogContent style={{width:'600px'}}>
            <TextField
              label="Descripcion"
              placeholder="Descripcion"
              type="text"
              variant="outlined"
              style={inputStyle}
              fullWidth
              value={descripcion}
              required
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            />


            <TextField
              fullWidth
              style={inputStyle}
              variant="outlined"
              value={equipo}
              select
              required
              label="Seleccione Equipo"
              onChange={(e)=>setEquipo(e.target.value)}
              
            >
              {props.dataEquipos?.map((equipo) => {
                return (
                  <MenuItem value={equipo.id} key={equipo.id}>
                    {equipo.nombre}
                  </MenuItem>
                );
              })}
            </TextField>



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
              Crear Componente
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CrearComponente;
