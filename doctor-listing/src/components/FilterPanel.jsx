import React from 'react';

const FilterPanel = ({
    specialties,
    selectedSpecialties,
    consultationType,
    sortBy,
    onSpecialtyChange,
    onConsultationTypeChange,
    onSortChange
}) => {
const specialtyTestIds = {
    "General Physician": "filter-specialty-General-Physician",
    "Dentist": "filter-specialty-Dentist",
    "Dermatologist": "filter-specialty-Dermatologist",
    "Paediatrician": "filter-specialty-Paediatrician",
    "Gynaecologist": "filter-specialty-Gynaecologist",
    "ENT": "filter-specialty-ENT",
    "Diabetologist": "filter-specialty-Diabetologist",
    "Cardiologist": "filter-specialty-Cardiologist",
    "Physiotherapist": "filter-specialty-Physiotherapist",
    "Endocrinologist": "filter-specialty-Endocrinologist",
    "Orthopaedic": "filter-specialty-Orthopaedic",
    "Ophthalmologist": "filter-specialty-Ophthalmologist",
    "Gastroenterologist": "filter-specialty-Gastroenterologist",
    "Pulmonologist": "filter-specialty-Pulmonologist",
    "Psychiatrist": "filter-specialty-Psychiatrist",
    "Urologist": "filter-specialty-Urologist",
    "Dietitian/Nutritionist": "filter-specialty-Dietitian-Nutritionist",
    "Psychologist": "filter-specialty-Psychologist",
    "Sexologist": "filter-specialty-Sexologist",
    "Nephrologist": "filter-specialty-Nephrologist",
    "Neurologist": "filter-specialty-Neurologist",
    "Oncologist": "filter-specialty-Oncologist",
    "Ayurveda": "filter-specialty-Ayurveda",
    "Homeopath": "filter-specialty-Homeopath"
};

return (
    <div className="filter-panel">
    <div className="filter-section">
        <h3 data-testid="filter-header-moc">Consultation Mode</h3>
        <div className="filter-options">
        <label className="radio-label">
            <input
                type="radio"
                name="consultationType"
                checked={consultationType === 'Video Consult'}
                onChange={() => onConsultationTypeChange('Video Consult')}
                data-testid="filter-video-consult"
            />
            Video Consult
        </label>
        <label className="radio-label">
            <input
                type="radio"
                name="consultationType"
                checked={consultationType === 'In Clinic'}
                onChange={() => onConsultationTypeChange('In Clinic')}
                data-testid="filter-in-clinic"
            />
            In Clinic
        </label>
        </div>
    </div>
    <div className="filter-section">
        <h3 data-testid="filter-header-speciality">Speciality</h3>
        <div className="filter-options">
        {specialties.map((specialty) => (
            <label key={specialty} className="checkbox-label">
            <input
                type="checkbox"
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                data-testid={specialtyTestIds[specialty] || `filter-specialty-${specialty.replace(/\//g, '-')}`}
            />
            {specialty}
            </label>
        ))}
        </div>
    </div>
    <div className="filter-section">
        <h3 data-testid="filter-header-sort">Sort By</h3>
        <div className="filter-options">
        <label className="radio-label">
            <input
                type="radio"
                name="sortBy"
                checked={sortBy === 'fees'}
                onChange={() => onSortChange('fees')}
                data-testid="sort-fees"
            />
            Fees (Low to High)
        </label>
        <label className="radio-label">
            <input
                type="radio"
                name="sortBy"
                checked={sortBy === 'experience'}
                onChange={() => onSortChange('experience')}
                data-testid="sort-experience"
            />
            Experience (High to Low)
        </label>
        </div>
    </div>
    </div>
    );
};

export default FilterPanel;