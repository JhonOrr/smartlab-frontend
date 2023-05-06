import { BasicTable } from "@/components/BasicTable";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CrearEquipo from "@/components/createEquip";
import { getSession } from "next-auth/react";

function Test({ data }) {
  const { data: session, status } = useSession();
  const [equipos, setEquipos] = useState([]);
  const [open, setOpen] = useState(false);
  let columns = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Marca",
      accessorKey: "marca",
    },
    {
      header: "Modelo",
      accessorKey: "modelo",
    },
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
  ];

  const getEquipos = () => {
    let equipoMarca = [];
    data?.Equipos.map((d) => {
      equipoMarca.push(d.marca);
    });
    setEquipos(data?.Equipos);
  };

  useEffect(() => {
    getEquipos();
  }, []);

  return (
    <div>
      <CrearEquipo
        open={open}
        setOpen={setOpen}
        cliente={session?.session.user.email}
        equipos = {equipos} 
        setEquipos = {setEquipos}       
        />
      <Button variant="contained" onClick={() => setOpen(true)}> 
        Nuevo Equipo
      </Button>
      <BasicTable columns={columns} data={equipos} setEquipos = {setEquipos}/>
    </div>
  );
}

export default Test;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/cliente/${session?.session.user.email}/equipos`
  );
  const data = await response.json();

  return {
    props: {
      data: data,
    },
  };
}
