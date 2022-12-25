import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";

const RotateScreen = (props) => {
  const { shown } = props;

  if (shown) {
    return (
      <Box
        bgcolor="primary.main"
        sx={{
          boxSizing: "border-box",
          color: "#fff",
          height: "100vh",
          p: 5,
          border: "2px solid #000"
        }}
      >
        <ScreenRotationIcon
          sx={{ height: 100, width: 100, marginTop: "10%", mb: 5 }}
        ></ScreenRotationIcon>
        <Box sx={{ top: "70%" }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Application not supported at this screen size.
          </Typography>
          <Typography>
            Please rotate to landscape mode to continue...
          </Typography>
        </Box>
      </Box>
    );
  }
};

export default RotateScreen;
