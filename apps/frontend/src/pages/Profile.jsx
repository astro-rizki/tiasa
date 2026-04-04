import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Settings, Sun, Moon, Shield, Bell, Info, Edit2, Check, X } from "lucide-react";
import FeaturedYSL from "../components/profile/FeaturedYSL";
import { toast } from "sonner";

export default function Profile() {
  const [profileImage, setProfileImage] = useState("/images/profile.png");
  const [darkMode, setDarkMode] = useState(true);
  const [username, setUsername] = useState("Alexandra Chen");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        toast.success("Profile photo updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = () => {
    setUsername(tempUsername);
    setIsEditingName(false);
    toast.success("Name updated successfully");
  };

  const handleCancelEdit = () => {
    setTempUsername(username);
    setIsEditingName(false);
  };

  return (
    <div className={`max-w-md mx-auto min-h-screen pb-24 transition-colors duration-300 ${
      darkMode ? 'bg-[#0A0A0A]' : 'bg-white'
    }`}>
      {/* Header */}
      <motion.div
        className="px-6 pt-6 pb-4 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className={`font-serif-luxury text-2xl ${darkMode ? 'gold-text' : 'text-gray-800'}`}>Profile</h1>
          <p className={`text-[10px] uppercase tracking-[0.3em] mt-1 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
            Your Personal Space
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              darkMode ? 'glass-card' : 'bg-gray-100'
            }`}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
            ) : (
              <Moon className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
            )}
          </button>
          <button className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            darkMode ? 'glass-card' : 'bg-gray-100'
          }`}>
            <Settings className={`w-4 h-4 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>

      {/* Profile Photo Section */}
      <motion.div
        className={`mx-6 mb-6 rounded-2xl p-6 ${
          darkMode ? 'glass-card-strong' : 'bg-gray-50 border border-gray-200'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className={`w-32 h-32 rounded-full overflow-hidden border-2 ${
              darkMode ? 'border-[#C0C0C0]/30 silver-glow' : 'border-gray-300'
            }`}>
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label className={`absolute bottom-0 right-0 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
              darkMode ? 'bg-[#C0C0C0] hover:bg-[#E8E8E8] silver-glow' : 'bg-gray-800 hover:bg-gray-700'
            }`}>
              <Camera className={`w-5 h-5 ${darkMode ? 'text-black' : 'text-white'}`} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {isEditingName ? (
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                className={`font-serif-luxury text-xl text-center px-3 py-1 rounded-lg ${
                  darkMode 
                    ? 'bg-neutral-900 text-white border border-neutral-700' 
                    : 'bg-white text-gray-800 border border-gray-300'
                }`}
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-[#C0C0C0] text-black' : 'bg-gray-800 text-white'
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  darkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-1">
              <h2 className={`font-serif-luxury text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {username}
              </h2>
              <button
                onClick={() => setIsEditingName(true)}
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  darkMode ? 'hover:bg-neutral-800' : 'hover:bg-gray-200'
                }`}
              >
                <Edit2 className={`w-3.5 h-3.5 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`} />
              </button>
            </div>
          )}
          
          <p className={`text-xs uppercase tracking-wider mb-4 ${
            darkMode ? 'text-neutral-500' : 'text-gray-500'
          }`}>
            Premium Member
          </p>

          <div className="flex gap-8">
            <div className="text-center">
              <p className={`text-2xl font-bold mb-0.5 ${darkMode ? 'text-white' : 'text-gray-800'}`}>1.2K</p>
              <p className={`text-[10px] uppercase tracking-wider ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
                Blends
              </p>
            </div>
            <div className={`w-px ${darkMode ? 'bg-neutral-800' : 'bg-gray-300'}`} />
            <div className="text-center">
              <p className={`text-2xl font-bold mb-0.5 ${darkMode ? 'text-white' : 'text-gray-800'}`}>4.5K</p>
              <p className={`text-[10px] uppercase tracking-wider ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
                Hours
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured from YSL */}
      <FeaturedYSL />

      {/* Account Actions */}
      <motion.div
        className="mx-6 mb-8 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <button className={`w-full rounded-2xl px-5 py-3.5 flex items-center justify-between transition-colors ${
          darkMode 
            ? 'glass-card hover:bg-white/5' 
            : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
        }`}>
          <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Subscription</span>
          <span className={`text-xs ${darkMode ? 'text-[#E0B23A]' : 'text-gray-800'}`}>Premium</span>
        </button>
        <button 
          onClick={() => setShowPrivacyModal(true)}
          className={`w-full rounded-2xl px-5 py-3.5 flex items-center gap-3 transition-colors ${
            darkMode 
              ? 'glass-card hover:bg-white/5' 
              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Shield className={`w-4 h-4 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`} />
          <span className={`text-sm flex-1 text-left ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Privacy & Security
          </span>
          <span className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>→</span>
        </button>
        <button 
          onClick={() => setShowNotificationModal(true)}
          className={`w-full rounded-2xl px-5 py-3.5 flex items-center gap-3 transition-colors ${
            darkMode 
              ? 'glass-card hover:bg-white/5' 
              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Bell className={`w-4 h-4 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`} />
          <span className={`text-sm flex-1 text-left ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Notifications
          </span>
          <span className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>→</span>
        </button>
        <button 
          onClick={() => setShowVersionModal(true)}
          className={`w-full rounded-2xl px-5 py-3.5 flex items-center gap-3 transition-colors ${
            darkMode 
              ? 'glass-card hover:bg-white/5' 
              : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
          }`}
        >
          <Info className={`w-4 h-4 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`} />
          <span className={`text-sm flex-1 text-left ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            App Version
          </span>
          <span className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>v2.4.1</span>
        </button>
      </motion.div>

      {/* Privacy Modal */}
      <AnimatePresence>
        {showPrivacyModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`rounded-2xl p-6 w-full max-w-sm ${
                darkMode ? 'glass-card-strong' : 'bg-white'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-serif-luxury text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Privacy & Security
                </h3>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    darkMode ? 'glass-card hover:bg-white/5' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <X className={`w-4 h-4 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`} />
                </button>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-neutral-900' : 'bg-gray-50'}`}>
                  <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Data Privacy
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
                    Your biometric and scent data is processed locally and never leaves your device.
                  </p>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-neutral-900' : 'bg-gray-50'}`}>
                  <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Encryption
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
                    All data transmissions are encrypted using industry-standard protocols.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPrivacyModal(false)}
                className={`w-full py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${
                  darkMode 
                    ? 'bg-[#C0C0C0] text-black hover:bg-[#E8E8E8]' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Modal */}
      <AnimatePresence>
        {showNotificationModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`rounded-2xl p-6 w-full max-w-sm ${
                darkMode ? 'glass-card-strong' : 'bg-white'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-serif-luxury text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Notifications
                </h3>
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    darkMode ? 'glass-card hover:bg-white/5' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <X className={`w-4 h-4 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`} />
                </button>
              </div>
              
              <div className="space-y-3 mb-6">
                {['Scent Pulse Reminders', 'Device Alerts', 'Cartridge Refill', 'New Blends'].map((notif) => (
                  <div key={notif} className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{notif}</span>
                    <button className={`w-11 h-6 rounded-full transition-all relative ${
                      darkMode ? 'bg-[#D4AF37]' : 'bg-gray-800'
                    }`}>
                      <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 right-0.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowNotificationModal(false)}
                className={`w-full py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${
                  darkMode 
                    ? 'bg-[#C0C0C0] text-black hover:bg-[#E8E8E8]' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Version Modal */}
      <AnimatePresence>
        {showVersionModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`rounded-2xl p-6 w-full max-w-sm ${
                darkMode ? 'glass-card-strong' : 'bg-white'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-serif-luxury text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  App Version
                </h3>
                <button
                  onClick={() => setShowVersionModal(false)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    darkMode ? 'glass-card hover:bg-white/5' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <X className={`w-4 h-4 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`} />
                </button>
              </div>
              
              <div className="text-center mb-6">
                <p className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>v2.4.1</p>
                <p className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
                  Released on February 20, 2026
                </p>
              </div>

              <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-neutral-900' : 'bg-gray-50'}`}>
                <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  What's New
                </p>
                <ul className={`space-y-1 text-xs ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
                  <li>• Improved Bluetooth connectivity</li>
                  <li>• Enhanced scent mixer precision</li>
                  <li>• New YSL perfume collection</li>
                  <li>• Bug fixes and performance improvements</li>
                </ul>
              </div>

              <button
                onClick={() => setShowVersionModal(false)}
                className={`w-full py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all ${
                  darkMode 
                    ? 'bg-[#C0C0C0] text-black hover:bg-[#E8E8E8]' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}