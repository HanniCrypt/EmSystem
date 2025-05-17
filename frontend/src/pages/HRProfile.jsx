import axios from "axios";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const API_URL = "http://localhost/emsystem/backend/index.php?action=";

function HRProfile() {
  const { user, setUser } = useOutletContext();
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({
          ...prev,
          avatar: reader.result.split(",")[1],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpdate = async () => {
    try {
      await axios.post(
        `${API_URL}updateAvatar`,
        {
          avatar: user.avatar,
        },
        {
          withCredentials: true,
        }
      );

      setShowModal(false);
      // window.location.reload(); 
    } catch (error) {
      console.error("Failed to update avatar", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-10">
      {/* HEADER */}
      <div className="bg-gray-900 h-48 relative">
        <div className="absolute -bottom-12 left-8 group">
          <div className="w-32 h-32 rounded-2xl border-4 border-white bg-gray-50 flex items-center justify-center text-3xl text-gray-400 font-bold shadow-lg">
            {user?.avatar ? (
              <img
                src={`data:image/jpeg;base64,${user?.avatar}`}
                alt="Avatar"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              user?.username?.charAt(0).toUpperCase()
            )}
          </div>
        </div>
      </div>

      {/* USER INFO */}
      <div className="pt-20 pb-8 px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {user?.username}
            </h1>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-50 text-purple-700 capitalize">
              {user?.role}
            </span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">User ID</div>
            <div className="font-medium text-gray-900">{user?.user_id}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">Account Created</div>
            <div className="font-medium text-gray-900">
              {new Date(user?.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Update Avatar</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 rounded-2xl bg-gray-50 ring-4 ring-purple-100 flex items-center justify-center overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={`data:image/jpeg;base64,${user?.avatar}`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-gray-300">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose new picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2.5 text-sm text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#260058] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAvatarUpdate}
                  className="px-4 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HRProfile;
