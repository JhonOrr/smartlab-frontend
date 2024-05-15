import HomeIcon from '@mui/icons-material/Home';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import ScienceIcon from '@mui/icons-material/Science';

export const Options = [
    {
        key : 1,
        title:"Home",
        icon: <HomeIcon/>,
        link: "/dashboard/"
    },
    {
        key :2,
        title:"Mis Equipos",
        icon: <PrecisionManufacturingIcon/>,
        link: "/dashboard/equipos "
    },
    {
        key :3,
        title:"Mis Componentes",
        icon: <PrecisionManufacturingIcon/>,
        link: "/admin/dashboard/componentes "
    },
    {
        key :4,
        title:"Mis Muestras",
        icon: <ScienceIcon/>,
        link: "/admin/dashboard/muestras "
    }
]