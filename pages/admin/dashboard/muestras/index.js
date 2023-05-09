import { BasicTable } from "@/components/BasicTableMuestra";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; 
import CrearEquipo from "@/components/createEquip";
import { getSession } from "next-auth/react";
import CrearMuestra from "@/components/CreateMuestra";


function Test({ data, dataComponentes, dataEquipos, dataLubricantes}) {
  const {data: session, status } = useSession();
  const [muestras, setMuestras] = useState([]);
  // const [componentes, setComponentes] = useState([]);
  const [listaComponentes, setListaComponentes] = useState([]);

  const [open, setOpen] = useState(false);
  let columns = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Fecha Muestreo",
      accessorKey: "fecha_muestreo",
    },
    {
      header: "Fecha Recepcion",
      accessorKey: "fecha_recepcion",
    },
    {
      header: "Fecha Análisis",
      accessorKey: "fecha_analisis",
    },
    {
      header: "Estado",
      accessorKey: "estado",
    },
    {
      header: "Componente",
      accessorKey: "componente",
    },
    {
      header:"Equipo",
      accessorKey: "equipo_name"
    },
    {
      header: "Lubricante",
      accessorKey: "lubricante",
    },

  ];

  const getMuestras = () => {
    setMuestras(data);
  };

  useEffect(() => {
    getMuestras();
    setListaComponentes(dataComponentes)
    console.log(dataEquipos)
  }, []);

  return (
    <div>
      <CrearMuestra
        open={open}
        setOpen={setOpen}
        cliente={session?.session.user.email}
        // equipos = {componentes} 
        // setComponentes = {setComponentes}
        muestras={muestras}
        setMuestras={setMuestras}
        dataEquipos = {dataEquipos}
        dataComponentes = {dataComponentes}
        dataLubricantes = {dataLubricantes}
        />
      <Button variant="contained" onClick={() => setOpen(true)}> 
        Crear Muestra
      </Button>
      <BasicTable 
        columns={columns}
        data={muestras}
        // setEquipos = {setComponentes}
        // dataEquipos = {dataEquipos}
      />
    </div>
  );
}

export default Test;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/cliente/${session?.session.user.email}/muestras`
  );
  const data = await response.json();

  const responseComponentes = await fetch(
    `http://127.0.0.1:8000/api/v1/cliente/${session?.session.user.email}/componentes`
  );
  const dataCliente = await responseComponentes.json();
  const dataComponentes = dataCliente

  const responseEquipos = await fetch(
    `http://127.0.0.1:8000/api/v1/cliente/${session?.session.user.email}/equipos`
  );
  const dataCliente2 = await responseEquipos.json();
  const dataEquipos = dataCliente2

  const responseLubricantes = await fetch(
    `http://127.0.0.1:8000/api/v1/lubricantes`
  );
  const dataCliente3 = await responseLubricantes.json();
  const dataLubricantes = dataCliente3



  return {
    props: {
      data: data,
      dataComponentes : dataComponentes,
      dataEquipos : dataEquipos,
      dataLubricantes: dataLubricantes
    },
  };
}
