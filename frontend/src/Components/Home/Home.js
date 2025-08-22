import React, { useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import hero from '../../img/hero.png';

function Home({ updateActive }) {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "SymptomAnalysis":
        updateActive(2);
        return;
      case "MentalWellness":
        updateActive(3);
        return;
      case "ConsultDoctor":
        updateActive(4);
        return;
      default:
        updateActive(1);
        return;
    }
  };

  return (
    <HomeStyled>
      <InnerLayout>
        {!selectedComponent ? (
          <>
            <HeroSection>
              <div className='hero-content'>
                <div className='text-content'>
                  <h3>Student Mind Matters</h3>
                  <h1>Taking Care of Your Mental Health</h1>
                  <p>
                    Your mental well-being is a priority. Here are some simple steps you can take
                    to manage stress and improve your mental health.
                  </p>
                </div>
                <div className='image-content'>
<img src={hero} alt="A person's head with smaller figures tending to plants growing from it." />
                </div>
              </div>
            </HeroSection>
            <CardContainer>
              <Card onClick={() => updateActive(2)}>
                <h2>Healing-Bot</h2>
                <p>Analyze your symptoms and get helpful advice instantly.</p>
              </Card>
              <Card onClick={() => updateActive(3)}>
                <h2>Consult a Doctor</h2>
                <p>Find and connect with qualified mental health professionals.</p>
              </Card>
            </CardContainer>
          </>
        ) : (
          renderSelectedComponent()
        )}
      </InnerLayout>
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  width: 100%;
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  background: #f7f9fc;
  border-radius: 12px;
  margin-bottom: 2rem;

  .hero-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    padding: 0 2rem;
  }

  .text-content {
    flex: 1;
    max-width: 50%;
    h3 {
      font-size: 1.25rem;
      color: #6a1b9a;
      font-weight: 600;
    }
    h1 {
      font-size: 3rem;
      color: #4a148c;
      font-weight: 700;
      margin: 0.5rem 0 1rem;
    }
    p {
      font-size: 1rem;
      color: #555;
      line-height: 1.6;
    }
  }

  .image-content {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 0 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  flex: 1;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid #eee;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    border-color: #6a1b9a;
  }

  h2 {
    font-size: 1.5rem;
    color: #4a148c;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #777;
    line-height: 1.5;
  }
`;

export default Home;