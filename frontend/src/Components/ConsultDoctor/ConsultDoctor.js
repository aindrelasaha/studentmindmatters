import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Assuming `db` is already initialized
import DoctorDetails from "../DoctorDetails/DoctorDetails";
import { FilterContext } from "../../context/FilterContext";

function ConsultDoctor({ updateFilter }) {
  const { doctorSpec, setDoctorSpec } = useContext(FilterContext);

  const [doctors, setDoctors] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // Use a map for cleaner filters
  const filters = [
    { name: "All", value: null },
    { name: "Dermatologist", value: "Dermatologist" },
    { name: "Endocrinologist", value: "Endocrinologist" },
    { name: "Gastroenterologist", value: "Gastroenterologist" },
    { name: "Rheumatologist", value: "Rheumatologist" },
    { name: "Neurologist", value: "Neurologist" },
    { name: "Pulmonologist", value: "Pulmonologist" },
    { name: "Cardiologist", value: "Cardiologist" },
  ];

  // Fetch doctors from Firestore on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setDoctors(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch doctor data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter items whenever the selected specialty or doctors list changes
  useEffect(() => {
    if (selectedSpecialty) {
      setFilteredItems(
        doctors.filter((doctor) => doctor.specialisation === selectedSpecialty)
      );
    } else {
      setFilteredItems(doctors);
    }
  }, [selectedSpecialty, doctors]);

  const handleFilterChange = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const showDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorDetails(true);
  };

  const hideDetails = () => {
    setShowDoctorDetails(false);
    setSelectedDoctor(null);
  };

  return (
    <ConsultDoctorStyled>
      <InnerLayout>
        {showDoctorDetails ? (
          <DoctorDetails doctor={selectedDoctor} onBack={hideDetails} />
        ) : (
          <>
            <Header>
              <h2>Find a Doctor</h2>
              <p>Search for a professional who can help you with your specific needs.</p>
            </Header>

            <FilterContainer>
              {filters.map((filter) => (
                <FilterButton
                  key={filter.name}
                  active={selectedSpecialty === filter.value}
                  onClick={() => handleFilterChange(filter.value)}
                >
                  {filter.name}
                </FilterButton>
              ))}
            </FilterContainer>

            {loading ? (
              <LoadingText>Loading doctors...</LoadingText>
            ) : (
              <DoctorCardsContainer>
                {filteredItems.length > 0 ? (
                  filteredItems.map((doctor) => (
                    <DoctorCard key={doctor.id}>
                      <img
                        src={doctor.imageUrl || "https://placehold.co/150x150/f0f0f0/666666?text=Doctor"}
                        alt={`Dr. ${doctor.name}`}
                      />
                      <CardContent>
                        <h3>Dr. {doctor.name}</h3>
                        <p className="specialty">{doctor.specialisation}</p>
                        <p className="location">{doctor.location}</p>
                        <Rating>
                          {/* Create an array of 5 and map over it to render stars */}
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              color={i < doctor.rating ? "#ffc107" : "#e4e5e9"}
                              size={20}
                            />
                          ))}
                          <span className="rating-number">({doctor.rating})</span>
                        </Rating>
                        {/* The onClick handler has been removed to make the button unclickable */}
                        <BookButton as="div">
                          View Profile
                        </BookButton>
                      </CardContent>
                    </DoctorCard>
                  ))
                ) : (
                  <NoResults>No doctors found for this specialty.</NoResults>
                )}
              </DoctorCardsContainer>
            )}
          </>
        )}
      </InnerLayout>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
    </ConsultDoctorStyled>
  );
}

const ConsultDoctorStyled = styled.div`
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h2 {
    font-size: 2.5rem;
    color: #4a148c;
    margin-bottom: 0.5rem;
  }
  p {
    color: #777;
    font-size: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button`
  background: ${(props) => (props.active ? "#6a1b9a" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#6a1b9a")};
  border: 1px solid #6a1b9a;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    background: #6a1b9a;
    color: #fff;
  }
`;

const DoctorCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

const DoctorCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    border: 3px solid #eee;
  }
`;

const CardContent = styled.div`
  width: 100%;
  h3 {
    font-size: 1.25rem;
    color: #4a148c;
    margin-bottom: 0.25rem;
  }
  .specialty {
    font-weight: 600;
    color: #6a1b9a;
    margin-bottom: 0.25rem;
  }
  .location {
    font-size: 0.9rem;
    color: #999;
    margin-bottom: 0.5rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  .rating-number {
    margin-left: 0.5rem;
    font-weight: 600;
    color: #444;
  }
`;

const BookButton = styled.button`
  background: #4a148c;
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    background: #6a1b9a;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 5rem;
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 5rem;
  width: 100%;
`;

export default ConsultDoctor;
