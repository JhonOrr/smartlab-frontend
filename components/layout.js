import { useSession } from "next-auth/react";
import Sidebar from "./sidebar";
import styles from "@/styles/dashboard.module.css";
import { useEffect, useState } from "react";

const Layout=({ children }) =>{
  const {data: session, status} = useSession()
  const [name, setName] =useState()
    
  // console.log(session?.session.user.email)

  
  return (
    <div style={{ display: "flex" }}>
      <Sidebar/>
      <main className={styles.dashboardContent}>{children}</main>
    </div>
  );
}


export default Layout;