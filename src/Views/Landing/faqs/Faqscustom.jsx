import React, { useState, useRef } from "react";
import { RiSubtractFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { Container } from "@components/common";

const FaqsCustom = ({ accordionData = [] }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedPanels, setExpandedPanels] = useState(
    Array(accordionData.length).fill(false)
  );
  const contentRefs = useRef([]);

  const handlePanelChange = (panelIndex) => {
    const newExpandedPanels = [...expandedPanels];
    newExpandedPanels[panelIndex] = !newExpandedPanels[panelIndex];
    setExpandedPanels(newExpandedPanels);
  };

  const sections = accordionData.reduce((acc, curr, index) => {
    if (curr.heading) {
      acc.push({
        heading: curr.heading,
        bgColor: curr.bgColor,
        items: [],
      });
    }
    acc[acc.length - 1].items.push({ ...curr, index });

    return acc;
  }, []);

  return (
    <section>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} style={{ backgroundColor: section.bgColor }} className="py-8 md:py-16">
            <div className="rounded-lg">
            {section.heading && (
              <div className="mb-6 md:mb-8">
                <h1 className="text-xl md:text-[32px] text-heading font-pally font-bold">
                  {section.heading}
                </h1>
              </div>
            )}
            <div className="space-y-4 md:space-y-6">
              {section.items.map((accordion, index) => (
                <div
                  key={accordion.index}
                  className="text-[#0C3373] bg-white rounded-[20px] border-2 overflow-hidden"
                >
                  <button
                    className={`w-full flex items-center p-5 text-left transition-colors duration-300 ${
                      expandedPanels[accordion.index]
                        ? "bg-primary-500 text-black"
                        : "text-black"
                    }`}
                    onClick={() => handlePanelChange(accordion.index)}
                  >
                    {expandedPanels[accordion.index] ? (
                      <RiSubtractFill
                        size={25}
                        className="text-btnbackground font-bold"
                      />
                    ) : (
                      <MdAdd
                        size={25}
                        className="text-btnbackground font-bold"
                      />
                    )}
                    <span
                      className={`ml-3 text-lg md:text-xl font-HelveticaNeue font-normal ${
                        expandedPanels[accordion.index]
                          ? "text-btnbackground"
                          : "text-heading"
                      }`}
                    >
                      {accordion.header}
                    </span>
                  </button>

                  <div
                    ref={(el) => (contentRefs.current[accordion.index] = el)}
                    style={{
                      height: expandedPanels[accordion.index]
                        ? `${
                            contentRefs.current[accordion.index]?.scrollHeight
                          }px`
                        : 0,
                      transition: "height 0.3s ease, opacity 0.3s ease",
                      opacity: expandedPanels[accordion.index] ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6 font-HelveticaNeue text-heading">
                      <p className="text-sm md:text-base text-heading">
                        {accordion.content} <br />
                        {accordion.lists}
                        <h1 className="pl-4 md:pl-10 text-sm md:text-base">{accordion.firstli}</h1>
                        <ul className="list-disc pl-4 md:pl-10">
                          <h1 className="font-semibold text-sm md:text-base">
                            {accordion.liheading}
                          </h1>
                          {accordion?.membershipPlans?.map((plan, index) => (
                            <li key={index} className="text-sm md:text-base">{plan}</li>
                          ))}
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
      ))}
      {location.pathname === "/faqs" && (
          <div className="rounded-[50px]">
            <div className="flex flex-col items-center justify-center font-helvetica">
              <h1 className="text-heading font-pally font-bold text-xl md:text-[32px] mb-6">
                Still have questions?
              </h1>
              <button
                onClick={() => navigate("/contact")}
                className="flex gap-2 font-HelveticaNeue text-lg md:text-xl bg-dashboardPrimary text-white px-6 py-3 md:py-4 rounded-full hover:bg-hoverbtn transition"
              >
                Contact Us
              </button>
            </div>
          </div>
      )}
    </section>
  );
};

export default FaqsCustom;
