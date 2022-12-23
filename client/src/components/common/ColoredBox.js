import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ColoredBox = (props) => {
  const { text, backgroundColor, color } = props;

  return (
    <Box
      key={`inner-${text}-${backgroundColor}`}
      className="key-text"
      sx={{
        height: 30,
        width: 30,
        m: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor,
        color,
        position: "relative"
      }}
    >
      <Typography sx={{ lineHeight: "30px" }}>{text}</Typography>
    </Box>
  );
};

export default ColoredBox;
