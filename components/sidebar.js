import Link from "next/link";
import Styles from "../styles/Sidebar.module.css";
import { Options } from "./Options";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Typography } from "@mui/material";

function Sidebar(props) {

  const { data: session, status } = useSession();
  const router = useRouter();


  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };
  
    return(
    <div className={Styles.sidebar}>
      <ul
        className={Styles.sidebarList}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          <li>
            <div className={Styles.icon}>
              <AccountCircleIcon />
            </div>
            <div className={Styles.title}>
              <Typography variant='h6'>
                Bienvenido, {session?.session.user.name}
              </Typography>
            </div>
          </li>
        </div>
        <div>
          {Options.map((val) => {
            return (
              <Link href={val.link} key={val.key}>
                <li className={Styles.row}>
                  <div className={Styles.icon}>{val.icon}</div>
                  <div className={Styles.title}>
                    <Typography variant="body1">
                      {val.title}
                    </Typography>
                  </div>
                </li>
              </Link>
            );
          })}
        </div>
        <div>
          <li className={Styles.row} onClick={handleLogout}>
            <div className={Styles.icon}>
              <ExitToAppIcon />
            </div>
            <div className={Styles.title}>
              Cerrar Sesión
            </div>
          </li>
        </div>
      </ul>
    </div>
    );
}

export default Sidebar;
