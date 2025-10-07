import { Box, Typography, Grid } from "@mui/material";
import SeriesModalCard from "./SeriesModalCard";

const cardsData = [
  {
    title: "Shakira's Life",
    image:
      "https://d36f3pr6g3yfev.cloudfront.net/series-65b432476282744e02bb3a5c-vertical.jpg",
    locked: true,
  },
  {
    title: "Disney Characters",
    image:
      "https://d36f3pr6g3yfev.cloudfront.net/series-658bb47565c10b9fc9877bc5-vertical.jpg",
    locked: false,
  },
  {
    title: "Woolly Friend",
    image:
      "https://d36f3pr6g3yfev.cloudfront.net/series-65545992655900b384ec1c97-vertical.jpg",
    locked: true,
  },
  {
    title: "Fruitful Discoveries",
    image:
      "https://d36f3pr6g3yfev.cloudfront.net/series-654931455ae5b766158dec61-vertical.jpg",
    locked: false,
  },
  {
    title: "Spot the Differences",
    image:
      "	https://d36f3pr6g3yfev.cloudfront.net/series-651b0672fd25c09504171bd2-vertical.jpg",
    locked: false,
  },
  {
    title: "Shel",
    image:
      "	https://d36f3pr6g3yfev.cloudfront.net/series-6516f3e9fd25c09504171bb7-vertical.jpg",
    locked: true,
  },
  {
    title: "Another Card",
    image:
      "https://d36f3pr6g3yfev.cloudfront.net/series-64fef1223d578af923ba2b1e-vertical.jpg",
    locked: false,
  },
];

const SuperBeginnerSeriesInModal = ({ description, videos, allVedio, allseevideo, seriesData, data }) => {
  console.log(videos, "+++++++++++")

  const publicVideos = videos?.filter(video => video.status === "public") || [];


  return (
    <Box sx={{ position: "relative", padding: { xs: "0px", md: "16px" }, width: "100%" }}>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >

        <Typography
          variant="h6"
          sx={{ fontWeight: "semibold", color: "black" }}
        >
          {description}
        </Typography>
      </Box>

      {/* Carousel */}
      {/* Cards Container */}
      <Grid container spacing={2}>
        {publicVideos?.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.id}>
            <SeriesModalCard
              video={video}
              seriesData={seriesData}
              data={data}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SuperBeginnerSeriesInModal;
