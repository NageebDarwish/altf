import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Container from "../../../components/common/Container";

const StruggleToInspiration = () => {
  const theme = useTheme();
  return (
    <div className="relative">
    <Container>
      <div className="relative ">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "start", md: "start" },
            justifyContent: "between",
            gap: { xs: 3, md: 6 },
            backgroundColor: "white"
          }}
          className=""
        >
      {/* Text Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "45%" },
          textAlign: "left",
        }}
      >
        <Stack direction={"row"} alignItems={"start"} gap={2}>
          {/* <Typography
            variant="h9"
            sx={{
              fontWeight: "bold",
              color: theme.palette.color.customOrange,
              textTransform: "uppercase",
              width: "max-content",
              borderBottom: `1px solid ${theme.palette.color.customOrange}`,
              pb: 0.3,
              fontSize: "12px",
              textWrap: "nowrap",
            }}
          >
           Our Story
          </Typography> */}
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            className="text-lg sm:text-smallscreenheading text-heading font-pally md:text-headingsize text-headingcolor mb-6"
          >
           A life-changing discovery
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            lineHeight: { xs: '24px', sm: '26px', md: '28px' },
          }}
          className="flex flex-col gap-3 sm:gap-4 font-HelveticaNeue text-heading text-base sm:text-lg md:text-xl font-[500]"
        >
       Everything changed during a quiet evening at a coffee shop in Toronto. While casually scrolling through YouTube, looking for videos on learning Spanish, Hasan stumbled upon a video by Spanish After Hours that demonstrated comprehensible input in action. <span> 
       The video wasn’t a grammar lesson or a "repeat after me" exercise, but a slow, engaging demonstration of language in use. The creator, Laura, used clear visuals, gestures, and storytelling to make the Spanish language comprehensible for beginners. There were no translations or explanations—just authentic, meaningful content. </span>  <span>
       In that moment, something clicked. For the first time, Hasan realized he could learn Spanish naturally, the same way he had acquired Arabic. No memorization. No drills. Just immersion in content that felt intuitive and achievable. That single video ignited a spark of hope and possibility, and Hasan’s life would never be the same.  </span>  <span>
       But as Hasan began exploring comprehensible input further, he encountered a familiar problem: resources were scattered, inconsistent, and limited. It wasn’t until months later that Hasan discovered Dreaming Spanish—a platform dedicated to comprehensible input with a vast library of engaging videos. Between March and July of 2024, Hasan logged over 220 hours watching their content. 
          </span> <span>
          The results were astonishing. Without studying grammar or memorizing vocabulary, and during his sixth trip to Mexico, Hasan found himself holding conversations and effectively communicating with people despite his deliberate attempts to delay speaking. It was a transformative experience that showed him how natural and effortless language acquisition could be.
          </span>
        </Typography>

        {/* <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "48px",
            color: "white",
            boxShadow: "none",
            mt: 7,
            wordWrap: "break-word",
            px: 4, 
          
          }}
          className="bg-btnbackground md:text-[14px] text-[8px]  py-4 font-HelveticaNeue hover:bg-hoverbtn"
        >
          Read more about Hassan's inspiring journey in the United States
        </Button> */}
      </Box>

      {/* Image Section */}
      <div className="flex flex-col items-start justify-end z-10">
        <img src="/IMG_0683 1.webp" alt="" className="w-full max-w-md sm:max-w-lg" />
        <div className="flex">
          <img src="/Left.png" alt="" className="w-full flex-1" />
          <div className="relative mt-10 sm:mt-20 lg:block hidden">
            <div className="absolute -top-10 sm:-top-20 -right-12 sm:-right-24">
            <img src="/Background (1).png" alt="" className="w-32 sm:w-auto" />
          </div>
          <img src="/Background.png" alt="" className="w-32 sm:w-auto" />
          </div>
        </div>
        
      </div>
      
    
        </Box>
        
      </div>
    </Container>
    <div className="absolute bottom-0 w-full z-0">
    <img src="/Group 1261153798.png" alt="" className="w-full" />
  </div>
  </div>
  );
};

export default StruggleToInspiration;
