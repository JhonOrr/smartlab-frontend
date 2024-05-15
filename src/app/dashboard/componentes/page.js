import { BasicTable } from "@/components/BasicTableComponente";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CrearComponente from "@/components/CreateComponent";

export default function Componentes() {
  const { data: session, status } = useSession();
  const [componentes, setComponentes] = useState([]);
  const [listaEquipos, setListaEquipos] = useState([]);

  const [open, setOpen] = useState(false);
  let columns = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Descripcion",
      accessorKey: "descripcion",
    },
    {
      header: "Equipo",
      accessorKey: "equipo_name",
    },
  ];

  const getComponentes = () => {
    setComponentes(data);
  };

  useEffect(() => {
    getComponentes();
    setListaEquipos(dataEquipos);
    console.log(dataEquipos);
  }, []);

  return (
    <div>
      <CrearComponente
        open={open}
        setOpen={setOpen}
        cliente={session?.session.user.email}
        equipos={componentes}
        setComponentes={setComponentes}
        dataEquipos={dataEquipos}
      />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Nuevo Componente
      </Button>
      <BasicTable
        columns={columns}
        data={componentes}
        setEquipos={setComponentes}
        dataEquipos={dataEquipos}
      />
    </div>
  );
}
