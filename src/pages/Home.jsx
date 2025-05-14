import React, { useState } from 'react';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import MapView from '../components/MapView';
import AdminPanel from '../components/AdminPanel';
import SearchFilter from '../components/SearchFilter';
import initialProfiles from '../data/mockProfiles.json';
import Loader from '../components/Loader';


const Home = () => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [mapCoords, setMapCoords] = useState([18.5204, 73.8567]); // Default: Pune

  const handleSummaryClick = async (profile) => {
  setSelectedProfile(profile);
  setIsLoading(true); // Start loader

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: profile.address,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'profile-mapper-app'
      }
    });

    const results = response.data;

    if (results && results.length > 0) {
      const { lat, lon } = results[0];
      setMapCoords([parseFloat(lat), parseFloat(lon)]);
    } else {
      alert('Location not found. Showing default.');
      setMapCoords([18.5204, 73.8567]);
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    alert('Error fetching location.');
    setMapCoords([18.5204, 73.8567]);
  } finally {
    setIsLoading(false); // Stop loader
  }
};


  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <div className="min-h-screen bg-gray-50 p-6">
    <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">🌍 Profile Explorer</h1>

    <div className="max-w-4xl mx-auto">
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSummaryClick={handleSummaryClick}
          />
        ))}
      </div>

      {selectedProfile && (
      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Map for {selectedProfile.name}
        </h2>
        
        {isLoading ? (
          <Loader />
        ) : (
          <div className="rounded-lg overflow-hidden shadow-lg">
            <MapView position={mapCoords} name={selectedProfile.name} />
          </div>
        )}
      </div>
    )}


      <div className="mt-12">
        <AdminPanel profiles={profiles} setProfiles={setProfiles} />
      </div>
    </div>
  </div>
);

};

export default Home;
