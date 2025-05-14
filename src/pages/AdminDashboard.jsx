import { useState } from 'react';
import AdminPanel from '../components/AdminPanel';
import initialProfiles from '../data/mockProfiles.json';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState(initialProfiles);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="text-right mb-4">
        <Link to="/" className="text-sm text-teal-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-teal-700 mb-6 text-center">🛠️ Admin Dashboard</h1>
      <AdminPanel profiles={profiles} setProfiles={setProfiles} />
    </div>
  );
};

export default AdminDashboard;
