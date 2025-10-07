import { Card, CardContent } from "@mui/material";

const ValueCard = ({ title, description, backgroundUrl }) => {
  return (
    <Card
      className="shadow-xl hover:bg-[#FFF9DA] "
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: { xs: "" },
        boxShadow: "none",
        borderRadius: "24px",
        paddingY: "25px",
        border: "1px solid #1CC93233",
        margin: "0 auto",
      }}
    >
      <CardContent
        className="hover:bg-[#FFF9DA]"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "16px",
          paddingX: "35px",
          backgroundColor: "white",
          gap: "10px",
        }}
      >
        {/* Title */}

        <img src={backgroundUrl} alt="" className=" w-1/4" />
        <h1 className=" font-bold text-2xl md:text-4xl font-pally text-heading mt-3">
          {title}
        </h1>
        <h1 className="font-HelveticaNeue text-heading md:text-xl text-md mt-2">
          {" "}
          {description}
        </h1>
      </CardContent>
    </Card>
  );
};

export default ValueCard;
