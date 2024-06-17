import React, { useState } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import SymptomAnalysis from '../SymptomAnalysis/SymptomAnalysis';
import MentalWellness from '../MentalWellness/MentalWellness';
import ConsultDoctor from '../ConsultDoctor/ConsultDoctor';
import hero from '../../img/hero.png'

function Home({ updateActive }) {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

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
      {/* <InnerLayout> */}
      {!selectedComponent ? (
        <>
        <HeroSection>
          <div className='hero'>
            <div className='des'>
            <h3>Student Mind Matters</h3>
            <h1>Taking Care of Your Mental Health</h1>
            <ol className='text-left m-5'>
    <li>1. Recognizing feelings of overwhelm, anxiety, or stress is the first step.</li>
    <li>2. Talk to parents, close friends, or trusted mentors for emotional support.</li>
    <li>3. Sharing your experiences can lighten your mental burden and reduce isolation.</li>
    <li>4. If needed, seek professional assistance from mental health professionals.</li>
    <li>5. Colleges often offer free or low-cost mental health services like counseling.</li>
    <li>6. Take advantage of wellness workshops to maintain mental well-being.</li>
    <li>7. Engage in activities like exercise, hobbies, or mindfulness for relaxation.</li>
    <li>8. Practice self-care to maintain balance and reduce stress levels.</li>
    <li>9. Join or create student groups focused on mental health awareness and support.</li>
    <li>10. Being part of a community with similar experiences can provide comfort and advice.</li>
</ol>
            </div>
            <div className='des'>
              <img src={hero} alt=''></img>
            </div>
          </div>
        </HeroSection>
       
        </>
      ) : (
        renderSelectedComponent()
      )}
      {/* </InnerLayout> */}
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  /* Your styles for the overall home page layout */
`;

const HeroSection = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: purple;
  text-align: center;

  .hero{
    height: 300px;
    /* margin-top: 400px; */
    margin: 50px 80px;
    display: flex;
    justify-content: space-between;
    
  }
  .des{
    flex: 1;
    margin-right: 20px;
    margin-top: 50px;
  }

  .des h3{
    /* margin-right: 300px; */
      font-size: 30px;
      font-weight:700;
      color: blue;
  }

  .des h1{
    align-items: start;
    font-weight: 700;
    font-size: 40px;
    color: royalblue;
  }

  .des p{
    align-items: start;
    color: #222260;
    font-weight: 500;
    /* margin-right: -40px; */
  }


  .des img{
    width: 5000px;
    height: 6500
    margin-left: 110px;
    margin-top: -45px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 120px 50px;
  cursor: hover;
`;

const Card = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 20px);
  transition: all 0.3s ease;
  color: #4b0082;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    color: darkViolet;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h2 {
    font-weight: 700;
    margin-bottom: 10px;
  }

  p {
    font-size: 17px;
    color: #666;
  }
`;

export default Home;
