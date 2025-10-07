import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import TeamCards from "../../components/Content/TeamCards";
import Container from "../../../../components/common/Container";

const MeetOurTeam = () => {
  const teamMembers = [
    {
      name: "Hassan",
      role: "Founder",
      description:
        "Aya Creates Entertaining, Playful, And Fun Videos Tailored For Superbeginner And Beginner Levels. Her Engaging And Approachable Style Makes Starting Your Arabic Journey Both Enjoyable And Effortless.",
      image: "/menteam1.png",
    },
    {
      name: "AYA",
      role: "Guide",
      description:
        "The Visionary Behind Arabic All The Time, Hasan's Personal Journey With Comprehensible Input Inspired Him To Create A Platform That Makes Learning Arabic As Natural And Enjoyable As Watching A Favorite Show.",
      image: "/teamgirl1.png",
    },
    {
      name: "BATOUL",
      role: "Language Guide",
      description:
        "Aya Creates Entertaining, Playful, And Fun Videos Tailored For Superbeginner And Beginner Levels. Her Engaging And Approachable Style Makes Starting Your Arabic Journey Both Enjoyable And Effortless.",
      image: "/teamgirl2.png",
    },
  
  ];

  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: '#FFEBDB' ,
      }}
    >
      <Container className="py-8 md:py-12">
      {/* Title Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            width: "max-content",
            pb: 1.4,
            borderBottom: `3px solid ${theme.palette.color?.customPurple || "#6A1B9A"}`, // Fallback to purple
            color: "black",
          }}
        >
          Meet Our Team
        </Typography>
        <Typography
          sx={{
            color: "grey",
            margin: "0",
            fontSize: "15px",
          }}
        >
          Our team brings Arabic learning to life, making it feel as enjoyable
          as tuning into a captivating show:
        </Typography>
      </Box>

      {/* Content Section */}
      <Box>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCards
              key={member.name}
              image={member.image}
              name={member.name}
              role={member.role}
              description={member.description}
            />
          ))}
        </div>
      </Box>
      </Container>
    </Box>
  );
};

export default MeetOurTeam;
