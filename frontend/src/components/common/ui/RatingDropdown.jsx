import React, { useState } from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const RatingDropdown = ({ initialRating, onRatingChange }) => {
    const [rating, setRating] = useState(initialRating);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        if (onRatingChange) {
            onRatingChange(newRating);
        }
    };

    return (
        <DropdownButton
            as={ButtonGroup}
            title={
                <div>
                    {[...Array(5)].map((_, i) => (
                        <FaStar key={i} color={i < rating ? '#ffc107' : '#e4e5e9'} />
                    ))}
                </div>
            }
            id="rating-dropdown"
            variant="link"  // Transparent background
            className="rating-dropdown" // Custom class for additional styling
        >
            {[...Array(5)].map((_, i) => (
                <Dropdown.Item
                    key={i + 1}
                    onClick={() => handleRatingChange(i + 1)}
                >
                    {[...Array(5)].map((_, j) => (
                        <FaStar key={j} color={j < i + 1 ? '#ffc107' : '#e4e5e9'} />
                    ))}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export default RatingDropdown;
