import React, { useState } from "react";
import { 
  Award, 
  Users, 
  Star, 
  Camera, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Upload,
  Eye,
  EyeOff
} from "lucide-react";

const AboutUsAdmin = () => {
  // About Us Content State
  const [aboutContent, setAboutContent] = useState({
    title: "FOCUS & FILMS PHOTOSTUDIO",
    description1: "At PhotoStudioService, we're storytellers, memory-makers, and artists dedicated to preserving your moments. Our journey began with a passion for capturing emotions and evolved into crafting visual narratives that transcend time.",
    description2: "Born from a desire to transform photography into an art form that encapsulates emotions and stories. We've been part of countless milestones, celebrations, and moments of pure joy.",
    badge: "Professional Photography Studio"
  });

  // Stats State
  const [stats, setStats] = useState([
    { icon: "Award", stat: "500+", label: "Events Captured" },
    { icon: "Users", stat: "1000+", label: "Happy Clients" },
    { icon: "Star", stat: "6+", label: "Years Experience" }
  ]);

  // Team Members State
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Lead Photographer & Founder",
      image: "/aboutimage/Memone.jpg",
      bio: "With 15 years of experience, Sarah specializes in wedding and portrait photography.",
      social: { instagram: "#", twitter: "#", linkedin: "#" }
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Commercial Photographer",
      image: "/aboutimage/Memtwo.jpg",
      bio: "Michael brings creativity to commercial and product photography with his unique vision.",
      social: { instagram: "#", twitter: "#", linkedin: "#" }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Event Photographer",
      image: "/aboutimage/Memthree.jpg",
      bio: "Emily captures the energy and emotion of every event with her dynamic photography style.",
      social: { instagram: "#", twitter: "#", linkedin: "#" }
    },
    {
      id: 4,
      name: "David Kim",
      role: "Photo Editor & Retoucher",
      image: "/aboutimage/Memfour.jpg",
      bio: "David's post-processing expertise ensures every image meets our highest standards.",
      social: { instagram: "#", twitter: "#", linkedin: "#" }
    }
  ]);

  // Gallery Images State
  const [galleryImages, setGalleryImages] = useState([
    { id: 1, src: "/aboutimage/imagetwo.jpg", alt: "Photo studio session 1" },
    { id: 2, src: "/aboutimage/imagethree.jpg", alt: "Photo studio session 2" },
    { id: 3, src: "/aboutimage/imagefour.jpg", alt: "Photo studio session 3" },
    { id: 4, src: "/aboutimage/imagefive.jpg", alt: "Photo studio session 4" }
  ]);

  // Hero Images State
  const [heroImages, setHeroImages] = useState([
    "/aboutimage/imageone.jpg",
    "/aboutimage/imagetwo.jpg",
    "/aboutimage/imagethree.jpg",
    "/aboutimage/imagefour.jpg",
    "/aboutimage/imagefive.jpg"
  ]);

  // UI State
  const [activeTab, setActiveTab] = useState("content");
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Icon mapping
  const iconMap = {
    Award: Award,
    Users: Users,
    Star: Star,
    Camera: Camera
  };

  // Handle About Content Update
  const handleAboutContentChange = (field, value) => {
    setAboutContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle Stats Update
  const updateStat = (index, field, value) => {
    const newStats = [...stats];
    newStats[index][field] = value;
    setStats(newStats);
  };

  const addStat = () => {
    setStats([...stats, { icon: "Award", stat: "0", label: "New Stat" }]);
  };

  const removeStat = (index) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  // Handle Team Member Operations
  const addTeamMember = () => {
    const newMember = {
      id: Date.now(),
      name: "New Team Member",
      role: "Role",
      image: "/aboutimage/placeholder.jpg",
      bio: "Bio description here...",
      social: { instagram: "#", twitter: "#", linkedin: "#" }
    };
    setTeamMembers([...teamMembers, newMember]);
    setEditingTeamMember(newMember.id);
  };

  const updateTeamMember = (id, field, value) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const updateTeamMemberSocial = (id, platform, value) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id 
        ? { ...member, social: { ...member.social, [platform]: value } }
        : member
    ));
  };

  const removeTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    setEditingTeamMember(null);
  };

  // Handle Gallery Operations
  const addGalleryImage = () => {
    const newImage = {
      id: Date.now(),
      src: "/aboutimage/placeholder.jpg",
      alt: "New gallery image"
    };
    setGalleryImages([...galleryImages, newImage]);
  };

  const updateGalleryImage = (id, field, value) => {
    setGalleryImages(prev => prev.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  const removeGalleryImage = (id) => {
    setGalleryImages(galleryImages.filter(img => img.id !== id));
  };

  // Handle Hero Images
  const addHeroImage = () => {
    setHeroImages([...heroImages, "/aboutimage/placeholder.jpg"]);
  };

  const updateHeroImage = (index, value) => {
    const newHeroImages = [...heroImages];
    newHeroImages[index] = value;
    setHeroImages(newHeroImages);
  };

  const removeHeroImage = (index) => {
    setHeroImages(heroImages.filter((_, i) => i !== index));
  };

  // Save All Data
  const saveAllData = () => {
    const data = {
      aboutContent,
      stats,
      teamMembers,
      galleryImages,
      heroImages
    };
    console.log("Saving data:", data);
    alert("Data saved successfully!");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-red-600 text-white p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">About Us Management</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2"
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
            <button
              onClick={saveAllData}
              className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-100 px-6">
        <div className="flex space-x-1">
          {["content", "stats", "team", "gallery", "hero"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 capitalize font-medium rounded-t-lg ${
                activeTab === tab
                  ? "bg-white text-red-600 border-t-2 border-red-600"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              {tab === "hero" ? "Hero Images" : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Main Content</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={aboutContent.badge}
                  onChange={(e) => handleAboutContentChange("badge", e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Title
                </label>
                <input
                  type="text"
                  value={aboutContent.title}
                  onChange={(e) => handleAboutContentChange("title", e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Description Paragraph
              </label>
              <textarea
                value={aboutContent.description1}
                onChange={(e) => handleAboutContentChange("description1", e.target.value)}
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Second Description Paragraph
              </label>
              <textarea
                value={aboutContent.description2}
                onChange={(e) => handleAboutContentChange("description2", e.target.value)}
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Statistics</h2>
              <button
                onClick={addStat}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Stat
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">Stat {index + 1}</h3>
                    <button
                      onClick={() => removeStat(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Icon
                      </label>
                      <select
                        value={stat.icon}
                        onChange={(e) => updateStat(index, "icon", e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                      >
                        <option value="Award">Award</option>
                        <option value="Users">Users</option>
                        <option value="Star">Star</option>
                        <option value="Camera">Camera</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Statistic
                      </label>
                      <input
                        type="text"
                        value={stat.stat}
                        onChange={(e) => updateStat(index, "stat", e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => updateStat(index, "label", e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
              <button
                onClick={addTeamMember}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Team Member
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-gray-50 p-6 rounded-lg border">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTeamMember(
                          editingTeamMember === member.id ? null : member.id
                        )}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeTeamMember(member.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {editingTeamMember === member.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateTeamMember(member.id, "name", e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => updateTeamMember(member.id, "role", e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="Role"
                      />
                      <input
                        type="text"
                        value={member.image}
                        onChange={(e) => updateTeamMember(member.id, "image", e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="Image URL"
                      />
                      <textarea
                        value={member.bio}
                        onChange={(e) => updateTeamMember(member.id, "bio", e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                        placeholder="Bio"
                        rows={3}
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={member.social.instagram}
                          onChange={(e) => updateTeamMemberSocial(member.id, "instagram", e.target.value)}
                          className="p-2 border rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                          placeholder="Instagram URL"
                        />
                        <input
                          type="text"
                          value={member.social.twitter}
                          onChange={(e) => updateTeamMemberSocial(member.id, "twitter", e.target.value)}
                          className="p-2 border rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                          placeholder="Twitter URL"
                        />
                        <input
                          type="text"
                          value={member.social.linkedin}
                          onChange={(e) => updateTeamMemberSocial(member.id, "linkedin", e.target.value)}
                          className="p-2 border rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                          placeholder="LinkedIn URL"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <p><span className="font-medium">Role:</span> {member.role}</p>
                      <p><span className="font-medium">Bio:</span> {member.bio}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gallery Images</h2>
              <button
                onClick={addGalleryImage}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Image
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">Image {image.id}</h3>
                    <button
                      onClick={() => removeGalleryImage(image.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={image.src}
                      onChange={(e) => updateGalleryImage(image.id, "src", e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                      placeholder="Image URL"
                    />
                    <input
                      type="text"
                      value={image.alt}
                      onChange={(e) => updateGalleryImage(image.id, "alt", e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                      placeholder="Alt text"
                    />
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' font-family='Arial, sans-serif' font-size='14' fill='%23666'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Images Tab */}
        {activeTab === "hero" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Hero Section Images</h2>
              <button
                onClick={addHeroImage}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Hero Image
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {heroImages.map((image, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-900">Hero Image {index + 1}</h3>
                    <button
                      onClick={() => removeHeroImage(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => updateHeroImage(index, e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 text-sm"
                      placeholder="Image URL"
                    />
                    <img
                      src={image}
                      alt={`Hero image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' font-family='Arial, sans-serif' font-size='14' fill='%23666'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Preview Content */}
              <div className="space-y-8">
                <div className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold inline-block">
                  {aboutContent.badge}
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900">
                  ABOUT <span className="text-red-600">{aboutContent.title}</span>
                </h1>
                
                <div className="space-y-4 text-gray-600">
                  <p>{aboutContent.description1}</p>
                  <p>{aboutContent.description2}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, idx) => {
                    const IconComponent = iconMap[stat.icon];
                    return (
                      <div key={idx} className="text-center bg-gray-50 rounded-lg p-4">
                        <div className="bg-red-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                          <IconComponent className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">{stat.stat}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {teamMembers.slice(0, 4).map((member) => (
                    <div key={member.id} className="text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-16 h-16 rounded-full mx-auto mb-2 object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23f3f4f6'/%3E%3Ctext x='32' y='36' text-anchor='middle' dy='.3em' font-family='Arial, sans-serif' font-size='24' fill='%23666'%3E👤%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <h4 className="font-semibold text-gray-900">{member.name}</h4>
                      <p className="text-sm text-red-600">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUsAdmin;