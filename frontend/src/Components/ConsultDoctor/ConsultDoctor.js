import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStar } from "react-icons/fa";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import DoctorDetails from "../DoctorDetails/DoctorDetails";
import { FilterContext } from "../../context/FilterContext";

function ConsultDoctor({ updateFilter }) {
  const { doctorSpec, setDoctorSpec } = useContext(FilterContext);

  const [doctors, setDoctors] = useState([]);
  const [filteredItems, setFilteredItems] = useState(doctors);
  const [selectedDoctor, setSelectedDoctor] = useState(doctorSpec);
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [DoctorDet, setDoctorDet] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));

        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          fetchedData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log(doctors);
        setDoctors(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const notify = (item) => {
    setDoctorDet(item);
    setShowDoctorDetails(true);
  };
  console.log(doctors);
  const filters = [
    "Dermatologist",
    "Endocrinologist",
    "Gastroenterologist",
    "Rheumatologist",
    "Neurologist",
    "Pulmonologist",
    "Cardiologist",
  ];

  const handleFilterChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

  const filterItems = () => {
    if (selectedDoctor) {
      setFilteredItems(
        doctors.filter((doctor) => doctor.specialisation === selectedDoctor)
      );
    } else {
      setFilteredItems(doctors);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedDoctor, doctors]);

  return (
    <>
    
     <div className="flex items-center justify-center m-2" >
    <ul className="p-2 ">
      
        <li className="mb-2">Feeling stressed and anxious? </li>
          <li>Try telling your parents or close friends.</li>
        <li className="mb-2">If that doesn't work, consult a doctor.</li>
        <li className="mb-2">Below given a few consultency service</li>
        <li className="text-xl underline text-sky-700"><a href="https://www.apollohospitals.com">Apollo Hospital</a></li>
        <li className="text-xl underline text-sky-700"><a href="https://ckbirlahospitals.com/enquirenow/bmb/ck-birla-hospital-in-kolkata?utm_campaign=18387231836&utm_adgroup=143198264804&utm_keyword=birla%20hospital%20kolkata&utm_source=google&utm_medium=cpc&utm_placement=&utm_location=9299020&utm_matchtype=e&utm_network=g&utm_device=c&utm_creative=635396195910&gclid=Cj0KCQjwvb-zBhCmARIsAAfUI2uFjFyTiLS3wPFAtal7BBCmEUZ9ywspnaRwQxrodatVtkWdfpk1X00aAgp5EALw_wcB">BM Birla Hospital</a></li>
    </ul>
</div>

    </>
  );
}

const DashboardStyled = styled.div`
  .heading h2 {
    font-size: 29px;
    color: darkviolet;
    font-weight: 605;
    margin: 25px -17px;
    padding: 1rem 1.5rem;
    width: 100%;
  }
`;

export default ConsultDoctor;
