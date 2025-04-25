import React from 'react';

const DoctorCard = ({ doctor }) => {
return (
    <div className="doctor-card" data-testid="doctor-card">
        <div className="doctor-image">
        {doctor.photo ? (
            <img src={doctor.photo} alt={doctor.name} />
        ) : (
        <div className="doctor-initials">{doctor.name_initials || doctor.name.charAt(0)}</div>
        )}
    </div>
    <div className="doctor-info">
        <h2 data-testid="doctor-name">{doctor.name}</h2>
        <p data-testid="doctor-specialty">
            {doctor.specialities.map(spec => spec.name).join(', ')}
        </p>
        <p data-testid="doctor-experience">{doctor.experience}</p>
        <div className="doctor-fee" data-testid="doctor-fee">
            {doctor.fees}
        </div>
        <div className="consultation-types">
            {doctor.video_consult && <span className="video-consult">Video Consult</span>}
            {doctor.in_clinic && <span className="in-clinic">In Clinic</span>}
        </div>
        <div className="doctor-languages">
            <p>Languages: {doctor.languages ? doctor.languages.join(', ') : 'Not specified'}</p>
        </div>
        {doctor.clinic && (
            <div className="clinic-info">
            <p className="clinic-name">{doctor.clinic.name}</p>
            {doctor.clinic.address && (
                <p className="clinic-address">{doctor.clinic.address.locality}, {doctor.clinic.address.city}</p>
            )}
            </div>
        )}
        </div>
    </div>
    );
};

export default DoctorCard;