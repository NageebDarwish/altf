import { Box, Stack, Typography, useTheme } from "@mui/material";
import Container from "../../../components/common/Container";

const StoryCard = ({
  title,
  descriptions,
  flexDirection = "row",
  bgColor = "white",
  image,
  ok,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <div className="relative">
        <Box
          sx={{
            display: "flex",
            textAlign: "start",
            flexDirection: { xs: "column", md: flexDirection },
            alignItems: "stretch",
            justifyContent: "center",
            gap: { xs: 3, md: 4 },
            borderRadius: 2,
          }}
          className="w-full"
        >
        {/* Image Section */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: "100%",
              height: "auto",
              // objectFit: "cover",
              flexGrow: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            textAlign: "start",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={"start"}
            gap={2}
          >
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
              lineHeight={{ xs: "32px", sm: "40px", md: "48px" }}
              className="text-lg sm:text-textsmallheading md:text-[44px] font-pally font-bold text-heading mb-6"
            >
              {title}
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            sx={{
              lineHeight: { xs: "24px", sm: "26px", md: "28px" },
            }}
            className="flex flex-col font-HelveticaNeue gap-3 sm:gap-4 text-heading text-base sm:text-lg md:text-xl font-[500]"
          >
            {descriptions.map((description, index) => (
              <span key={index}>{description}</span>
            ))}
          </Typography>
        </Box>
        </Box>
        {ok === "yes" && (
          <div className="absolute w-full -bottom-5">
            <img src="/Group 1261153798 (1).png" alt="" className="w-full" />
          </div>
        )}
      </div>
    </Container>
  );
};

export default StoryCard;
