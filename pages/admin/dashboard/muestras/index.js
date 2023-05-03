import { BasicTable } from "@/components/BasicTable";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Tooltip,
  TextField
} from "@mui/material";

function Test() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    // router.push("muestras/crear-muestra");
    setOpen(true)
  };
  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Nueva Solicitud
      </Button>
      <BasicTable></BasicTable>
      <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form >
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            <TextField
                
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={()=>setOpen(false)}>Cancel</Button>
        <Button color="secondary" variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}

export default Test;
