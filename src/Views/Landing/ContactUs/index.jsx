import { Box } from "@mui/material";
import ContactForm from "./ContactForm";
import { Container } from "@components/common";
import image from "../../../assets/Home/irfan.jpg";
const ContactUs = () => {
  return (
    <div className="">
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <Container className="py-8 md:py-16">
          <ContactForm />
        </Container>
      </Box>
    </div>
  );
};

export default ContactUs;
