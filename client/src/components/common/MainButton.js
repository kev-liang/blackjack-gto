import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

const MainButton = (props) => {
  const { label, handleClick, disabled, height = 50, width = 110, sx } = props;
  const [buttonStyles, setButtonStyles] = useState();

  useEffect(() => {
    const defaultStyles = {
      height,
      width
    };
    if (!disabled) {
      setButtonStyles(defaultStyles);
    } else {
      setButtonStyles({
        ...defaultStyles,
        backgroundColor: "#aaa",
        pointerEvents: "none"
      });
    }
  }, [disabled, height, width]);

  return (
    <Button
      onClick={() => handleClick(label)}
      variant="contained"
      className={`card-action-button ${
        disabled ? "card-action-button-disabled" : ""
      }`}
      sx={{ ...buttonStyles, ...sx }}
    >
      {label}
    </Button>
  );
};

export default MainButton;
