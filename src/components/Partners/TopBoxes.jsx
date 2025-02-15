import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Academic', path: '/academic' },
  { name: 'Cooperative', path: '/cooperative' },
  { name: 'B', path: '/b' },
  { name: 'G', path: '/g' },
  { name: 'R', path: '/r' },
];

const TopBoxes = () => {
  const navigate = useNavigate();

  return (
    <Section>
      <Container>
        <Header>
          <Title>Explore Our Sections</Title>
          <Subtitle>Click on a section to navigate and learn more.</Subtitle>
        </Header>

        <Categories>
          {categories.map((category) => (
            <CategoryBox
              key={category.name}
              onClick={() => navigate(category.path)}
            >
              {category.name}
            </CategoryBox>
          ))}
        </Categories>
      </Container>
    </Section>
  );
};

export default TopBoxes;

// Styled Components
const Section = styled.section`
  padding: 4rem 1rem;
  background-color: #f9fafb;
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  color: #111827;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #4b5563;
  max-width: 42rem;
  margin: 0 auto;
`;

const Categories = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const CategoryBox = styled.div`
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
