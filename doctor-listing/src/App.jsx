import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import DoctorList from './components/DoctorList';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import './App.css';

function App() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);
    const [consultationType, setConsultationType] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    const fetchDoctors = async () => {
    try {
        setIsLoading(true);
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data);
        setIsLoading(false);
    } catch (err) {
        setError(err.message);
        setIsLoading(false);
    }
};

    fetchDoctors();
}, []);

useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearchTerm = urlParams.get('search') || '';
    setSearchTerm(urlSearchTerm);
    
    const urlConsultationType = urlParams.get('consultationType') || '';
    setConsultationType(urlConsultationType);
    
    const urlSpecialties = urlParams.getAll('specialty') || [];
    setSelectedSpecialties(urlSpecialties);
    
    const urlSortBy = urlParams.get('sortBy') || '';
    setSortBy(urlSortBy);
}, []);

useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) {
        params.set('search', searchTerm);
    }
    
    if (consultationType) {
        params.set('consultationType', consultationType);
    }
    
    if (selectedSpecialties.length > 0) {
        selectedSpecialties.forEach(specialty => {
        params.append('specialty', specialty);
        });
    }
    
    if (sortBy) {
        params.set('sortBy', sortBy);
    }
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
}, [searchTerm, consultationType, selectedSpecialties, sortBy]);

useEffect(() => {
    if (!doctors.length) return;
    
    let result = [...doctors];
    
    // Filter by search term
    if (searchTerm) {
        result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (consultationType) {
        if (consultationType === 'Video Consult') {
        result = result.filter(doctor => doctor.video_consult);
        } else if (consultationType === 'In Clinic') {
        result = result.filter(doctor => doctor.in_clinic);
        }
    }
    if (selectedSpecialties.length > 0) {
        result = result.filter(doctor => 
        selectedSpecialties.some(specialty => 
            doctor.specialities.some(s => s.name === specialty)
        )
        );
    }
    
    if (sortBy === 'fees') {
        result.sort((a, b) => {
        const aFees = parseInt(a.fees.replace(/[^\d]/g, ''));
        const bFees = parseInt(b.fees.replace(/[^\d]/g, ''));
        return aFees - bFees;
        });
    } else if (sortBy === 'experience') {
    result.sort((a, b) => {
        const aExp = parseInt(a.experience.match(/\d+/)[0]);
        const bExp = parseInt(b.experience.match(/\d+/)[0]);
        return bExp - aExp;
    });
    }
    
    setFilteredDoctors(result);
}, [doctors, searchTerm, consultationType, selectedSpecialties, sortBy]);

    const getAllSpecialties = () => {
    if (!doctors.length) return [];
    const specialtiesSet = new Set();
    doctors.forEach(doctor => {
        doctor.specialities.forEach(specialty => {
        specialtiesSet.add(specialty.name);
        });
    });
    return Array.from(specialtiesSet);
};

const handleSearchChange = (term) => {
    setSearchTerm(term);
};

const handleSpecialtyChange = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
        setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
        setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
};

const handleConsultationTypeChange = (type) => {
    setConsultationType(type === consultationType ? '' : type);
};

const handleSortChange = (option) => {
    setSortBy(option === sortBy ? '' : option);
};

return (
    <BrowserRouter>
    <div className="app-container">
        <header className="app-header">
        <h1>Find a Doctor</h1>
        <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={handleSearchChange} 
            doctors={doctors} 
        />
        </header>
        <main className="app-main">
        <FilterPanel 
            specialties={getAllSpecialties()}
            selectedSpecialties={selectedSpecialties}
            consultationType={consultationType}
            sortBy={sortBy}
            onSpecialtyChange={handleSpecialtyChange}
            onConsultationTypeChange={handleConsultationTypeChange}
            onSortChange={handleSortChange}
        />
        {isLoading ? (
            <div className="loading">Loading...</div>
        ) : error ? (
            <div className="error">{error}</div>
        ) : (
            <DoctorList doctors={filteredDoctors} />
        )}
        </main>
    </div>
    </BrowserRouter>
    );
}

export default App;