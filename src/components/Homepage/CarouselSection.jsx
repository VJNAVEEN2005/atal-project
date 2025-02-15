import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { dummy1, dummy2, dummy3, dummy4, dummy5, dummy6, dummy7} from '../../assets/Homepage/images';

const CarouselSection = () => {
    const images = [dummy1, dummy2, dummy3, dummy4, dummy5, dummy6, dummy7 ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex+1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <CarouselContainer>
            {images.map((image, i) => (
                <CarouselImage
                    key={i}
                    src={image}
                    alt={`Carousel Image ${i + 1}`}
                    $isActive={i === index}
                    $animationType={i % 2 === 0 ? slideInRight : zoomIn} // Use different animations for odd/even images
                />
            ))}
            <Overlay />

            <TextContent>
                <Title>Creating an Instinctive</Title>
                <Subtitle>Start-Up Ecosystem</Subtitle>
            </TextContent>

            <FormSection>
                <FormContainer>
                    <TypewriterSelect label="Who Am I?" options={['Startup', 'Investor', 'Enabler']} />
                    <TypewriterSelect label="I'm looking for" options={['Funding', 'Mentorship', 'Networking']} />
                    <ExploreButton>Explore</ExploreButton>
                </FormContainer>
            </FormSection>
        </CarouselContainer>
    );
};

// Typewriter Select Component for Dropdown
const TypewriterSelect = ({ options, label }) => {
    const [currentOption, setCurrentOption] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < options.length) {
            const timeout = setTimeout(() => {
                setCurrentOption(options[index]);
                setIndex(index + 1);
            }, 2000);

            return () => clearTimeout(timeout);
        } else {
            setIndex(0); // Loop back to the first option
        }
    }, [currentOption, index, options]);

    return (
        <SelectWrapper>
            <Label>{label}</Label>
            <Select>
                <option>{currentOption || 'Select...'}</option>
                {options.map((option, idx) => (
                    <option key={idx}>{option}</option>
                ))}
            </Select>
        </SelectWrapper>
    );
};

// Keyframe Animations
const slideInRight = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const zoomIn = keyframes`
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;



// Styled Components
const CarouselContainer = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    @media(min-width:769px){
        height: 100vh;
    }
`;

const CarouselImage = styled.img`
    display:flex;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    animation: ${({ $isActive, $animationType }) => 
      $isActive && css`${$animationType} 1s ease-in-out`};
    transition: opacity 1s ease-in-out;
`;

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30, 58, 138, 0.5); 
`;

const TextContent = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    margin-bottom:5px;
    
   
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom:0px;

    @media (min-width: 768px) {
        font-size: 4rem;
    }
`;

const Subtitle = styled.h2`
    font-size: 1rem;
    margin-top: 10px;

    @media (min-width: 768px) {
        font-size: 2rem;
    }
`;

/*const FormSection = styled.div`
    position: absolute;
    bottom: 150px;
    display: block;
    justify-content: center;
    align-items: center;
    height : 90px;
    width: 40%;
    padding-top: 30px;
`;

const FormContainer = styled.div`
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
`;*/

const FormSection = styled.div`
    position: absolute;
    bottom: 40px;
    display: block;
    justify-content: center;
    align-items: center;
    width: 50%; /* Adjust width for mobile */
    padding-bottom: 150px;

    @media (max-width: 768px) {
        bottom: 50px; /* Move it higher for mobile */
        width: 95%; /* Make it wider to fit smaller screens */
        padding-top: 10px;
    }
`;

const FormContainer = styled.div`
    background-color: white;
    padding: 1rem; /* Adjust padding for mobile */
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, 
                rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, 
                rgba(0, 0, 0, 0.09) 0px -3px 5px;
    display: flex;
    flex-wrap: wrap; /* Ensure proper wrapping for smaller screens */
    align-items: center;
    justify-content: center;
    gap: 0.5rem; /* Reduce gap for mobile */

    @media (max-width: 768px) {
        padding: 0.75rem;
        gap: 0.25rem;
    }
`;


const SelectWrapper = styled.div`
    flex: 1;
    position: relative;
`;

const Label = styled.label`
    display: block;
    color: #4b5563;
    font-size: 0.875rem;
`;

const Select = styled.select`
    background-color: white;
    color: #4b5563;
    width: 100%;
    margin-top: 0.25rem;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    cursor: pointer;
`;

const ExploreButton = styled.button`
    background-color: #fbbf24;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #f59e0b;
    }
`;

export default CarouselSection;
