import { Box, useTheme, Typography, Stack, IconButton } from "@mui/material";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const ContactInformation = () => {
  const theme = useTheme();
  return (
    <div className="font-helvetica">
      <Box
        flex={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
          py: 10,
          pl: 5,
          backgroundColor: theme.palette.color.candyOrange,
          color: "black",
          borderRadius: "10px",
        }}
      >
        <Stack gap={0.2}>
          <p className="text-largeLight">Contact Information</p>
          <p className="text-description">Feel free to contact with us.</p>
        </Stack>

        <Stack sx={{ direction: "column", gap: 2 }}>
          <Box flex={1} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <PhoneInTalkIcon size={24} color={"black"} />
            <p className="text-description">+1012 3456 789</p>
          </Box>
          <Box flex={1} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <EmailIcon size={24} color={"black"} />
            <p className="">demo@gmail.com</p>
          </Box>
          <Box flex={1} sx={{ display: "flex", alignItems: "start", gap: 2 }}>
            <LocationOnIcon size={24} color={"black"} />
            <Typography
              component={"flexbox"}
              sx={{
                display: "flex",
                flexDirection: "column",
                color: "black",
                fontWeight: 500,
                fontSize: "16px",
              }}
            >
              <span>132 Dartmouth Street Boston </span>
              <span>Massachusetts 02156 United States</span>
            </Typography>
          </Box>
        </Stack>

        <Stack direction={"row"} sx={{ alignItems: "center", gap: 3 }}>
          <IconButton
            sx={{
              backgroundColor: theme.palette.color.customOrange,
              color: theme.palette.color.customWhite,
            }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: theme.palette.color.customOrange,
              color: theme.palette.color.customWhite,
            }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: theme.palette.color.customOrange,
              color: theme.palette.color.customWhite,
            }}
          >
            <SportsEsportsIcon />
          </IconButton>
        </Stack>
      </Box>
    </div>
  );
};

export default ContactInformation;
