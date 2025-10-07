import { useState, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const accordionData = [
  {
    header: "What is Arabic All The Time?",
    content:
      "Arabic All The Time is an immersive language acquisition platform where you acquire Arabic naturally, just like you learned your first language. By watching a library of engaging, context-rich videos, you absorb Arabic intuitively—without studying grammar rules, memorizing vocabulary lists, or completing traditional exercises.",
  },
  {
    header: "What is comprehensible input?",
    content:
      "Comprehensible input is language that is slightly above your current level of understanding but still clear enough to grasp through context. It’s the foundation of natural language acquisition, allowing you to absorb new vocabulary, grammar, and expressions intuitively—without conscious effort. As you engage with comprehensible input over time, you’ll notice your understanding deepening and your ability to use the language improving naturally, just as you did with your first language.",
  },
  {
    header: "How does Arabic All The Time work?",
    content:
      "Arabic All The Time uses the comprehensible input approach, allowing you to absorb the language naturally by watching engaging, context-rich videos. With consistent exposure, you acquire vocabulary, grammar, and pronunciation intuitively—without studying rules or memorizing lists.",
  },
  {
    header: "Will I learn Modern Standard Arabic or a dialect?",
    content:
      "Our primary focus is on Modern Standard Arabic (MSA), as it is widely understood across the Arab world and serves as a versatile foundation for communication. With MSA, you’ll be able to connect with nearly half a billion speakers, understand most media, and navigate professional settings. While learning a dialect can be useful for specific regions, MSA provides the best starting point.",
  },
  {
    header: "How long will it take me to become fluent?",
    content:
      "Fluency depends on the number of hours of comprehensible input you accumulate:",
    membershipPlans: [
      "20 Hours: You’ll start feeling more comfortable with the language.",
      "200 Hours: You’ll follow focused, slow-paced content with ease.",
      "1,000 Hours: You’ll understand most native media and can start speaking.",
      "Consistency and dedication are key—daily exposure accelerates progress.",
    ],
  },
  {
    header: "How will I know if I’m making progress?",
    content:
      "Progress happens gradually and may feel subtle at first. You’ll start recognizing familiar words and phrases more frequently, following longer conversations, and grasping complex ideas with less effort. Over time, Arabic will feel more intuitive, and you’ll find yourself understanding content that once seemed challenging. Check our Approach page for more details.",
  },
];

const FaqsCustom = () => {
  const [expandedPanels, setExpandedPanels] = useState(
    Array(accordionData.length).fill(false)
  );
  const contentRefs = useRef([]);

  const handlePanelChange = (panelIndex) => {
    const newExpandedPanels = [...expandedPanels];
    newExpandedPanels[panelIndex] = !newExpandedPanels[panelIndex];
    setExpandedPanels(newExpandedPanels);
  };

  return (
    <section className="bg-white">
      <div className="flex items-center justify-between pb-4">
        <div></div>
        <h1 className="text-2xl md:text-4xl font-pally text-heading text-headingcolor font-bold md:text-center text-left mb-6">
          Frequently asked questions
        </h1>
        <div>
          <img src="/undraw_questions_g2px 1.png" alt="" />
        </div>
      </div>

      {/* Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accordionData.map((accordion, index) => (
          <div key={index} className="w-full">
            <div className="bg-white rounded-[20px] border shadow-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-start gap-4 p-4 text-left"
                onClick={() => handlePanelChange(index)}
              >
                {expandedPanels[index] ? (
                  <FaMinus className="text-orange-500" />
                ) : (
                  <FaPlus className="text-orange-500" />
                )}
                <span className="text-md font-HelveticaNeue sm:text-xl font-[500] text-heading">
                  {accordion.header}
                </span>
              </button>
              <div
                ref={(el) => (contentRefs.current[index] = el)}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  height: expandedPanels[index]
                    ? `${contentRefs.current[index]?.scrollHeight}px`
                    : 0,
                  opacity: expandedPanels[index] ? 1 : 0,
                }}
              >
                <div className="px-4 pb-4 text-heading font-HelveticaNeue text-md">
                  <p>{accordion.content}</p>
                </div>
                {/*  
               <div className="px-4 pb-4 text-heading font-HelveticaNeue text-md">
                    {accordion?.membershipPlans?.map((plan, index) => (
                      <p key={index}>{plan}</p>
                    ))}
                  </div>
                  */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqsCustom;
