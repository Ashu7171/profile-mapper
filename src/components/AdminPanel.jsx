import React, { useState } from 'react';

const AdminPanel = ({ profiles, setProfiles }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    photo: '',
    address: ''
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newProfile = {
      ...formData,
      id: Date.now() // unique ID
    };
    setProfiles(prev => [...prev, newProfile]);
    setFormData({ id: '', name: '', description: '', photo: '', address: '' });
  };

  const handleEdit = (profile) => {
    setFormData(profile);
    setEditMode(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setProfiles(prev =>
      prev.map(p => (p.id === formData.id ? formData : p))
    );
    setFormData({ id: '', name: '', description: '', photo: '', address: '' });
    setEditMode(false);
  };

  const handleDelete = (id) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit Profile' : 'Add New Profile'}</h2>
      <form
        onSubmit={editMode ? handleUpdate : handleAdd}
        className="space-y-4 mb-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={formData.photo}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
          >
            {editMode ? 'Update' : 'Add'}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setFormData({ id: '', name: '', description: '', photo: '', address: '' });
              }}
              className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-lg font-semibold mb-2">All Profiles</h3>
      <ul className="space-y-2">
        {profiles.map((profile) => (
          <li
            key={profile.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <span className="font-medium">{profile.name}</span> —{' '}
              <span className="text-gray-600 text-sm">{profile.address}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(profile)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(profile.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
