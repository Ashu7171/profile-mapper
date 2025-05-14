import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockProfiles from '../data/mockProfiles.json';

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const profile = mockProfiles.find(p => p.id.toString() === id);

  if (!profile) {
    return (
      <div className="p-6 text-center text-red-500">
        ❌ Profile not found.
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">{profile.name}</h2>
        <p className="text-center text-gray-600 mb-4">{profile.description}</p>
        <p className="text-center text-sm text-gray-500 italic">📍 {profile.address}</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
