import { Box, Skeleton } from "@mui/material";
import React from "react";

const SkeletonComp = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Thumbnail */}
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", borderRadius: 2 }}
        height={200}
      />
      {/* Title */}
      <Skeleton variant="text" sx={{ mt: 1, width: "80%" }} />
      {/* Description */}
      <Skeleton variant="text" sx={{ width: "60%" }} />
      {/* Meta row */}
      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={50} height={24} sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  );
};

export default SkeletonComp;
