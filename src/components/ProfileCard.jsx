import { Link } from 'react-router-dom';

const ProfileCard = ({ profile, onSummaryClick }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden p-4 hover:shadow-lg transition">
      <Link to={`/profile/${profile.id}`}>
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
        <h3 className="text-lg font-bold text-gray-800">{profile.name}</h3>
      </Link>
      <p className="text-sm text-gray-600 mb-3">{profile.description}</p>
      <button
        onClick={() => onSummaryClick(profile)}
        className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
      >
        Summary
      </button>
    </div>
  );
};

export default ProfileCard;