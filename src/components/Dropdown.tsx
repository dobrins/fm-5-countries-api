import { useState, useRef, useEffect } from 'react';

type DropdownProps = {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  active: string;
};

export default function Dropdown({
  label,
  options,
  onSelect,
  active,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(active);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  // Close if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown__btn" onClick={() => setIsOpen(!isOpen)}>
        {selected ?? label}
        <svg
          className={`dropdown__icon ${isOpen && 'dropdown__icon--open'}`}
          aria-hidden="true"
        >
          <use href="/icons.svg#icon-chevron-small-down"></use>
        </svg>
      </button>
      {isOpen && (
        <ul className="dropdown__menu">
          {options.map((option) => (
            <li
              key={option}
              className="dropdown__item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
