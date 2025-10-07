import React from "react";
import UpperCustomCard from "./UpperCustomCard";
import BlogcardsCustom from "./BlogcardsCustom";

const AllResources = () => {
  const cardData = [
    {
      title: "Community",
      description:
        "Join our vibrant community where we answer questions, exchange insights and celebrate progress together.",
      buttonText: "Join Our Community",
      navigateTo: "/newdashboard/home",
      img: "/resource4.png",
    },
    {
      title: "Approach",
      description:
        "Learn Arabic with comprehensible input videos designed to optimize natural language acquisition.",
      buttonText: "View Our Approach",
      navigateTo: "/approach",
      img: "/resource1.png",
    },
    {
      title: "Blog",
      description:
        "Unlock effective tips and resources to learn Arabic easily and naturally.",
      buttonText: "View Our Blog",
      navigateTo: "/dashboard/blog",
      img: "/undraw_blog-post_f68f 1.png",
    },
    {
      title: "FAQs",
      description:
        "Have a question? Find answers for some of our most frequently asked questions..",
      buttonText: "View Our FAQs",
      navigateTo: "/dashboard/faq",
      img: "/resource2.png",
    },
    {
      title: "User Guide",
      description: "Getting started: Your guide to using Arabic All The Time.",
      buttonText: "View Our User Guide",
      navigateTo: "/dashboard/WelcomePopup",
      img: "/resource3.png",
    },
    {
      title: "Contact us",
      description: "Have a question or suggestion? We’d love to hear from you.",
      buttonText: "View Our Contact",
      navigateTo: "/contact",
      img: "/undraw_contact-us_kcoa 1.png",
    },
  ];

  return (
    <>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 mt-14 md:mt-0 px-3 md:px-0 mb-20 md:mb-5">
        {cardData.map((card, index) => (
          <UpperCustomCard
            key={index}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            navigateTo={card.navigateTo}
            img={card.img}
          />
        ))}
      </div>
    </>
  );
};

export default AllResources;
