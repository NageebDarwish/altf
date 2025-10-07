import { useTheme } from "@emotion/react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Stack,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const ProgressCard = ({ id, title, points }) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
          backgroundColor: theme.palette.color.offwhite,
          boxShadow: "none",
        }}
      >
        {/* Number Overlay */}
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Box sx={{ width: "80px", height: "80px" }}>
            <img src="/Progress.svg" style={{ width: "100%  " }} alt="icon" />
          </Box>

          <Box
            sx={{
              backgroundColor: "#F5F5F5",
              color: "rgba(255, 115, 0, 0.2)",
              padding: "10px 15px",
              fontSize: "1.25rem",
              fontWeight: "bold",
              borderRadius: "0 0 20px 0",
            }}
          >
            {id}
          </Box>
        </Stack>

        <CardContent sx={{ pt: 5 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#000", mb: 2 }}
          >
            {title}
          </Typography>
          <List>
            {points.map((point, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", alignItems: "flex-start", pl: 0 }}
              >
                {/* Dot Icon */}
                <CircleIcon sx={{ fontSize: "8px", mr: 1, mt: 0.5 }} />
                <Typography variant="body2" sx={{ color: "#555" }}>
                  {point}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProgressCard;
