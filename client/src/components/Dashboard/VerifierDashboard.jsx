import React, { useState } from 'react';
import API from '../../services/api';
import DashboardLayout from '../../pages/DashboardLayout';
import './VerifierDashboard.css';

const VerifierDashboard = ({ user }) => {
  const [certificateNo, setCertificateNo] = useState('');
  const [result, setResult] = useState(null);

  const handleVerify = async () => {
    try {
      const res = await API.get(`/certificates/verify/${certificateNo}`);
      setResult(res.data);
    } catch {
      setResult({ error: 'Certificate not found' });
    }
  };

  return (
    <DashboardLayout user={user}>
      <div className="verifier-dashboard">
        <h1>Verify Certificate</h1>
        <div className="verify-section">
          <input
            type="text"
            placeholder="Enter Certificate Number"
            value={certificateNo}
            onChange={(e) => setCertificateNo(e.target.value)}
          />
          <button onClick={handleVerify}>Verify</button>
        </div>

        {result && (
          <div className="verification-result">
            {result.error ? (
              <p className="error">{result.error}</p>
            ) : (
              <div className="result-card">
                <h3>{result.student_name}</h3>
                <p>Certificate: {result.certificate_no}</p>
                <p>Degree: {result.degree}</p>
                <p>CGPA: {result.cgpa}</p>
                <p>Status: {result.verified ? '✅ Verified' : '❌ Unverified'}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VerifierDashboard;
