import "./side_bar.css";
import React, {useState} from "react";
import {FaUniversalAccess} from "react-icons/fa";
import {CgPerformance} from "react-icons/cg";
import {MdMobileFriendly} from "react-icons/md";

interface SideBarProps {
    setAnalysisType: (type: string) => void;
    setReport: (type: unknown) => void;
}

export const SideBar: React.FC<SideBarProps> = ({setAnalysisType, setReport}) => {
    const [selectedType, setSelectedType] = useState<string>("Performance");
    const setType = (type: string) => {
        return () => {
            setSelectedType(type);
            setAnalysisType(type);
            setReport(null);
        }
    }
    return (
        <div className="side-bar">
            <div className="p-4">
                <h2 className="text-2xl font-bold">Tests</h2>
            </div>
            <div className="p-4 nav-options">
                <button
                    className={`font-semibold nav-option ${selectedType === "Performance" ? "selected" : ""}`}
                    onClick={setType("Performance")}
                >
                    <CgPerformance className="option-icon"/> Performance
                </button>
                <button
                    className={`nav-option ${selectedType === "Accessibility" ? "selected" : ""}`}
                    onClick={setType("Accessibility")}
                >
                    <FaUniversalAccess className="option-icon"/> Accessibility
                </button>
                <button
                    className={`nav-option ${selectedType === "Responsiveness" ? "selected" : ""}`}
                    onClick={setType("Responsiveness")}
                >
                    <MdMobileFriendly className="option-icon"/> Responsiveness
                </button>
            </div>
        </div>
    );
};