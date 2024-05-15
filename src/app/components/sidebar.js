"use client";

import Link from "next/link";
import Styles from "../styles/sidebar.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Options } from "../data/options";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Typography } from "@mui/material";

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const isSidebar = !pathname.startsWith("/login")
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };
  
  if (isSidebar){
    return (
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
            <li className={Styles.row}>
              <div className={Styles.icon}>
                <AccountCircleIcon />
              </div>
              <div className={Styles.title}>
                <Typography variant="body1">
                {`Bienvenido, ${session?.user.nombres}`}
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
                      <Typography variant="body1">{val.title}</Typography>
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
                <Typography variant="body1">Cerrar Sesión</Typography>
              </div>
            </li>
          </div>
        </ul>
      </div>
    )
  } else {
    return <></>;
  }

}
