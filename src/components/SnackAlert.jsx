import React from "react";
import { Alert, Snackbar } from "@mui/material";

function SnackAlert({ severity, message, onClose }) {
  return (
    <Snackbar
      open={true}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackAlert;
