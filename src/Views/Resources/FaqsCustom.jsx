import { useState, useRef } from "react";
import { IoAdd } from "react-icons/io5";
import { RiSubtractFill } from "react-icons/ri";
import PropTypes from "prop-types";

const FaqsCustom = ({ accordionData = [] }) => {
    const [expandedPanels, setExpandedPanels] = useState(Array(accordionData.length).fill(false));
    const contentRefs = useRef([]);

    const handlePanelChange = (panelIndex) => {
        const newExpandedPanels = [...expandedPanels];
        newExpandedPanels[panelIndex] = !newExpandedPanels[panelIndex];
        setExpandedPanels(newExpandedPanels);
    };

    return (
        <section>
            <div className="space-y-6 md:space-y-8">
                    {accordionData.map((accordion, index) => (
                        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                            <button
                                className={`w-full flex gap-3 md:gap-4 p-4 md:p-6 text-left transition-colors duration-300 ${
                                    expandedPanels[index] ? "bg-primary-500 text-black" : "border-b text-black"
                                }`}
                                onClick={() => handlePanelChange(index)}
                            >
                                  {expandedPanels[index] ? (
                                    <RiSubtractFill className="text-[#f28327] mt-1 md:mt-2 text-lg md:text-xl" />
                                ) : (
                                    <IoAdd className="text-[#f28327] mt-1 md:mt-2 text-lg md:text-xl" />
                                )}
                                <span className="text-sm md:text-[15px] lg:text-[20px] text-start font-semibold">{accordion.header}</span>
                              
                            </button>
                            <div
                                ref={(el) => (contentRefs.current[index] = el)}
                                style={{
                                    height: expandedPanels[index] ? `${contentRefs.current[index]?.scrollHeight}px` : 0,
                                    transition: "height 0.3s ease, opacity 0.3s ease",
                                    opacity: expandedPanels[index] ? 1 : 0,
                                }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 md:p-6 bg-[#f28327] font-semibold text-white text-sm md:text-[15px]">
                                    <p>{accordion.content} <br/>{accordion.lists}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        </section>
    );
};

FaqsCustom.propTypes = {
    accordionData: PropTypes.array.isRequired,
};

export default FaqsCustom;
