import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBus, faBolt, faHeartbeat, faFilm, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

export const categories = [
    { name: 'Food', icon: faUtensils },
    { name: 'Transport', icon: faBus },
    { name: 'Utilities', icon: faBolt },
    { name: 'Health', icon: faHeartbeat },
    { name: 'Entertainment', icon: faFilm },
    { name: 'Other', icon: faEllipsisH },
];

const CustomDropdown = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedCategory = categories.find(cat => cat.name === value);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-between"
            >
                {selectedCategory ? (
                    <>
                        <FontAwesomeIcon icon={selectedCategory.icon} className="mr-2" />
                        {selectedCategory.name}
                    </>
                ) : (
                    'Select category'
                )}
                <span>&#9662;</span>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {categories.map((cat) => (
                        <div
                            key={cat.name}
                            onClick={() => {
                                onChange(cat.name);
                                setIsOpen(false);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                        >
                            <FontAwesomeIcon icon={cat.icon} className="mr-2" />
                            {cat.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
