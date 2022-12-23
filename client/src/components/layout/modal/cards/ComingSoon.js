import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const ComingSoon = (props) => {
  return (
    <Card
      sx={{
        boxSizing: "border-box",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        More Coming Soon...
      </Typography>
    </Card>
  );
};

export default ComingSoon;
