import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResumePage = () => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/resume', {
          headers: { Authorization: token }
        });
        setResume(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResume();
  }, []);

  return (
    <div>
      <h2>Your Resume</h2>
      {resume ? (
        <pre>{JSON.stringify(resume, null, 2)}</pre>
      ) : (
        <p>No resume found</p>
      )}
    </div>
  );
};

export default ResumePage;
