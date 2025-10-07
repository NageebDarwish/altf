import FaqsCustom from "./FaqsCustom";
import { Container } from "@components/common";

const FAQ = () => {
  const faqs1 = [
    {
        header: "How much does it really cost?",
        content:" This is dependent upon a few things, which include your age and health status is very persmal each individual and will typically start from ass as per month But a healthy 22 year old could cout as Intle as th per month. The most important thing to take into consideration is your age. Taking out a policy that lasts 40 years when you're 20, will cost around El/month Whereas, taking out a policy that laste 20 years, when you're 40 will cast you £41/month. Se taking insurance out when you're younger will save you thousands over the course of the policy, Buy young buy long."    },
    {
        header: " What happens to my mortgage if I pass away?",
        content:
            " This is dependent upon a few things, which include your age and health status is very persmal each individual and will typically start from ass as per month But a healthy 22 year old could cout as Intle as th per month. The most important thing to take into consideration is your age. Taking out a policy that lasts 40 years when you're 20, will cost around El/month Whereas, taking out a policy that laste 20 years, when you're 40 will cast you £41/month. Se taking insurance out when you're younger will save you thousands over the course of the policy, Buy young buy long."
    },
    {
        header: " How old do I need to be to qualify for life insurance with request?",
        content:" This is dependent upon a few things, which include your age and health status is very persmal each individual and will typically start from ass as per month But a healthy 22 year old could cout as Intle as th per month. The most important thing to take into consideration is your age. Taking out a policy that lasts 40 years when you're 20, will cost around El/month Whereas, taking out a policy that laste 20 years, when you're 40 will cast you £41/month. Se taking insurance out when you're younger will save you thousands over the course of the policy, Buy young buy long."    },
    {
        header:
            "How much cover do I need?",
        content:" This is dependent upon a few things, which include your age and health status is very persmal each individual and will typically start from ass as per month But a healthy 22 year old could cout as Intle as th per month. The most important thing to take into consideration is your age. Taking out a policy that lasts 40 years when you're 20, will cost around El/month Whereas, taking out a policy that laste 20 years, when you're 40 will cast you £41/month. Se taking insurance out when you're younger will save you thousands over the course of the policy, Buy young buy long."    },
   
];

  return (
    <Container className="py-8 md:py-12">
      <FaqsCustom accordionData={faqs1} />
    </Container>
  );
};

export default FAQ;
