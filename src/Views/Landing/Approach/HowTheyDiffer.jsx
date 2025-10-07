import { Stack, Typography, useTheme } from "@mui/material";

const HowTheyDiffer = () => {
  const theme = useTheme();
  return (
    <Stack gap={3}>
      <Typography
        sx={{
          color: theme.palette.color.customOrange,
          fontSize: "22px",
          fontWeight: 700,
        }}
      >
        Here How They Differ
      </Typography>

      <Stack gap={2}>
        <Stack direction="row" sx={{ gap: 1.3, alignItems: "center" }}>
          <img
            src="/CheckMark.svg"
            style={{ width: "24px", height: "24px", objectFit: "cover" }}
            alt="check-mark"
          />
          <Typography
            sx={{
              color: theme.palette.color.black,
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            Learning
          </Typography>
        </Stack>
        <Typography
          sx={{ fontSize: "14px", color: theme.palette.color.greyText }}
        >
          Traditional language learning often emphasizes memorizing vocabulary,
          grammar rules, and pronunciation through structured drills and
          exercises. While this might prepare you for a test, it rarely leads to
          genuine fluency. Conscious learning requires constant recall,
          translating phrases, and applying rules on the spot, which is slow and
          cumbersome when trying to speak or understand in real-time. You may
          know the grammar rules, but this method doesn’t easily translate into
          the natural flow needed for effortless conversation.
        </Typography>
      </Stack>

      <Stack gap={2}>
        <Stack direction="row" sx={{ gap: 1.3, alignItems: "center" }}>
          <img
            src="/CheckMark.svg"
            style={{ width: "24px", height: "24px", objectFit: "cover" }}
            alt="check-mark"
          />
          <Typography
            sx={{
              color: theme.palette.color.black,
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            Acquisition
          </Typography>
        </Stack>
        <Typography
          sx={{ fontSize: "14px", color: theme.palette.color.greyText }}
        >
          Language acquisition happens subconsciously, much like the way you
          learned your first language. Rather than memorizing rules or
          vocabulary, you absorb language naturally through exposure to
          meaningful content. This approach builds implicit knowledge, allowing
          you to understand and use the language intuitively. Fluency emerges
          organically as your brain absorbs patterns and meanings directly from
          context, leading to a faster and more seamless grasp of the language
          without the need to consciously recall rules or translations. This
          intuitive understanding is what forms the basis of true fluency.
        </Typography>

        <Typography
          sx={{ fontSize: "14px", color: theme.palette.color.greyText }}
        >
          This distinction brings us to our core technique: comprehensible
          input. At Arabic All The Time, we focus entirely on acquisition, not
          learning. Through consistent exposure to comprehensible input—language
          you can understand through context—your brain naturally absorbs
          Arabic. This approach is proven to be faster and more effective than
          traditional language learning.
        </Typography>
      </Stack>
    </Stack>
  );
};

export default HowTheyDiffer;
