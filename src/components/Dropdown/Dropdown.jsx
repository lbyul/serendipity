import "./Dropdown.css";
import Button from "../Button/Button";
import { useState, useRef } from "react";
import useEscapeKey from "../../hooks/useEscapeKey";
import useOutsideClick from "../../hooks/useOutsideClick";

const Dropdown = ({ options, onChange, buttonType, icon, align }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0] || "");
  const dropdownRef = useRef(null);
  useEscapeKey(isOpen, () => setIsOpen(false));
  useOutsideClick(dropdownRef, isOpen, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (onChange) {
      setSelectedOption(option);
      onChange(option);
    }

    if (option.onClick) {
      option.onClick();
    }

    return setIsOpen(false);
  };

  return (
    <div
      className={`dropdown ${align ? `dropdown-${align}` : ""}`}
      ref={dropdownRef}
    >
      {buttonType === "select" ? (
        <Button
          type="select"
          text={selectedOption?.label}
          arrow={true}
          arrowDirection={isOpen ? "top" : "down"}
          onClick={toggleDropdown}
        />
      ) : (
        <Button type={buttonType} imageUrl={icon} onClick={toggleDropdown} />
      )}
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li className="dropdown-option" key={index}>
              <Button
                text={option.label}
                onClick={() => handleOptionClick(option)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
