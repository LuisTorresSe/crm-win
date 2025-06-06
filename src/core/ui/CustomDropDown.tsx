import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuCheck } from 'react-icons/lu';

type OptionType = {
    id: number | string;
    value: string;
    label: string;
    icon?: React.ReactNode;
};

type CustomDropdownProps = {
    label?: string;
    name?: string;
    options: OptionType[];
    placeholder?: string;
    defaultValue?: string | null;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;
};

// Componente dropdown reutilizable con TypeScript
const CustomDropdown: React.FC<CustomDropdownProps> = ({
    label = 'Seleccione una opción',
    name = 'dropdown',
    options = [],
    placeholder = 'Seleccionar...',
    defaultValue = null,
    onChange = () => { },
    className = '',
    disabled = false,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cerrar el dropdown cuando se hace clic fuera
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    // Si las opciones o defaultValue cambian, actualizar el estado seleccionado
    useEffect(() => {
        if (defaultValue) {
            const option = options.find(opt => opt.value === defaultValue);
            if (option) {
                setSelectedOption(option);
            }
        }
    }, [options, defaultValue]);

    const handleSelect = (option: OptionType) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option.value);
    };

    return (
        <div className={` flex justify-between items-center gap-3  ${className}`} ref={dropdownRef}>
            <label
                id={`${name}-label`}
                className="block mb-2 text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <div className="relative w-1/2">
                {/* Botón principal del dropdown */}
                <button
                    type="button"
                    disabled={disabled}
                    className={`flex items-center justify-between w-full px-4 py-2.5 text-left bg-white border border-gray-300 rounded-lg shadow-sm transition-all duration-200 ${disabled
                        ? 'opacity-60 cursor-not-allowed'
                        : 'hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        }`}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-labelledby={`${name}-label`}
                >
                    <div className="flex items-center">
                        {selectedOption?.icon && <span className="mr-2 text-gray-500">{selectedOption.icon}</span>}
                        <span className={selectedOption ? "text-gray-700" : "text-gray-500"}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                    </div>
                    <LuChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    />
                </button>

                {/* Lista de opciones */}
                {isOpen && !disabled && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        <ul
                            className="py-1 max-h-60 overflow-auto"
                            role="listbox"
                            aria-labelledby={`${name}-label`}
                        >
                            {options.map((option) => (
                                <li
                                    key={option.id}
                                    className={`flex items-center px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${selectedOption?.id === option.id ? 'bg-blue-50' : ''
                                        }`}
                                    onClick={() => handleSelect(option)}
                                    role="option"
                                    aria-selected={selectedOption?.id === option.id}
                                >
                                    <div className="flex items-center flex-1">
                                        {option.icon && <span className="mr-2 text-gray-500">{option.icon}</span>}
                                        <span className="text-gray-700">{option.label}</span>
                                    </div>
                                    {selectedOption?.id === option.id && (
                                        <LuCheck className="w-4 h-4 text-blue-500" />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Campo oculto para formularios */}
            <input
                type="hidden"
                name={name}
                value={selectedOption?.value || ''}
            />
        </div>
    );
};
export default CustomDropdown