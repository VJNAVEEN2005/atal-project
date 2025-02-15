import React from 'react';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';  // Import the filter icon

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  background-color: ${props => props.active ? '#2563eb' : 'white'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  box-shadow: ${props => props.active ? '0 4px 6px rgba(37, 99, 235, 0.2)' : 'none'};

  &:hover {
    background-color: ${props => props.active ? '#2563eb' : '#f3f4f6'};
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PortfolioFilters = ({ categories, activeCategory, onCategoryChange, onAdvancedFilterClick }) => {
  return (
    <FilterContainer>
      {categories.map((category) => (
        <FilterButton
          key={category}
          active={activeCategory === category}
          onClick={() => {
            if (category === 'AdvancedFilterIcon') {
              onAdvancedFilterClick();  // Trigger advanced filter modal
            } else {
              onCategoryChange(category);
            }
          }}
        >
          {category === 'AdvancedFilterIcon' ? <FaFilter /> : category}  {/* Render icon for 'Advanced Filter' */}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default PortfolioFilters;
