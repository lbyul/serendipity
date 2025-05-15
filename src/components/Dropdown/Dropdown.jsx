import "./Dropdown.css";
import { useRef, useState } from "react";
import Button from "@/components/Button/Button";
import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutsideClick";

const Dropdown = ({
  options,
  onChange,
  buttonType,
  icon,
  align,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(
    selectedOption || options[0]
  );
  const dropdownRef = useRef(null);
  useEscapeKey(isOpen, () => setIsOpen(false));
  useOutsideClick(dropdownRef, isOpen, () => setIsOpen(false));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (onChange) {
      setCurrentOption(option);
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
          text={currentOption?.label}
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
