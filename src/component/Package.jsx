import { useState } from "react";
import { 
  Calendar, User, Award, Plus, Edit, Trash2, Eye, X, Camera, Image
} from "lucide-react";

const AdminPackageDashboard = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      category: "Candid",
      title: "How Candid Wedding Photography Captures Real Moments Beautifully",
      description: "There's something timeless about a photo that wasn't planned. Capture authentic emotions and spontaneous moments that tell your unique story.",
      price: 2500,
      originalPrice: 3000,
      discount: 17,
      photographer: "Samir Bhandari",
      date: "2024-03-10",
      image: "",
      features: ["4-6 Hours Coverage", "200+ Edited Photos", "Online Gallery", "Print Release"],
      rating: 4.9,
      reviews: 127,
      photoPieces: 200,
      status: "active",
      bookings: 45
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    photographer: "",
    date: "",
    image: "",
    imageFile: null,
    features: [""],
    rating: "",
    reviews: "",
    photoPieces: ""
  });

  const categories = [
    { value: "Candid", icon: Camera },
    { value: "Romantic", icon: Award },
    { value: "Photography", icon: Image },
    { value: "Portrait", icon: User },
    { value: "Event", icon: Calendar },
    { value: "Newborn", icon: Award }
  ];

  const resetForm = () => {
    setFormData({
      category: "",
      title: "",
      description: "",
      price: "",
      originalPrice: "",
      photographer: "",
      date: "",
      image: "",
      imageFile: null,
      features: [""],
      rating: "",
      reviews: "",
      photoPieces: ""
    });
  };

  const openModal = (mode, pkg = null) => {
    setModalMode(mode);
    setSelectedPackage(pkg);
    if (mode === "create") {
      resetForm();
    } else if (pkg) {
      setFormData({
        category: pkg.category,
        title: pkg.title,
        description: pkg.description,
        price: pkg.price.toString(),
        originalPrice: pkg.originalPrice.toString(),
        photographer: pkg.photographer,
        date: pkg.date,
        image: pkg.image,
        imageFile: null,
        features: [...pkg.features],
        rating: pkg.rating.toString(),
        reviews: pkg.reviews.toString(),
        photoPieces: pkg.photoPieces.toString()
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file)
      }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""]
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      features: newFeatures
    }));
  };

  const handleSubmit = () => {
    if (!formData.category || !formData.title || !formData.description || !formData.price || !formData.originalPrice || !formData.photographer) {
      alert("Please fill in all required fields");
      return;
    }

    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      rating: parseFloat(formData.rating) || 0,
      reviews: parseInt(formData.reviews) || 0,
      photoPieces: parseInt(formData.photoPieces) || 0,
      discount: Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100),
      features: formData.features.filter((f) => f.trim() !== ""),
      bookings: selectedPackage?.bookings || 0,
      status: "active"
    };

    if (modalMode === "create") {
      const newPackage = { ...packageData, id: Date.now() };
      setPackages((prev) => [...prev, newPackage]);
    } else if (modalMode === "edit") {
      setPackages((prev) =>
        prev.map((pkg) =>
          pkg.id === selectedPackage.id ? { ...packageData, id: selectedPackage.id } : pkg
        )
      );
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-100/40 to-red-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-red-100/40 to-red-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative p-8">
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl py-3 font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Admin Packages
            </h1>
            <p className="text-gray-600 mt-2">Manage your photography packages with ease</p>
          </div>
          <button 
            onClick={() => openModal("create")} 
            className="group flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            Add Package
          </button>
        </div>

        {/* Enhanced Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const Icon = categories.find(c => c.value === pkg.category)?.icon || Camera;
            return (
              <div key={pkg.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-red-50/50 hover:border-red-100 transform hover:-translate-y-1">
                {/* Image container with overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={pkg.image || "/api/placeholder/400/300"} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-red-500" />
                      <span className="font-semibold text-gray-700 text-sm">{pkg.category}</span>
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{pkg.photographer}</span>
                  </div>

                  {/* Price display */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-red-600">${pkg.price}</span>
                    {pkg.originalPrice > pkg.price && (
                      <span className="text-lg text-gray-400 line-through">${pkg.originalPrice}</span>
                    )}
                    {pkg.discount > 0 && (
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-sm font-semibold">
                        -{pkg.discount}%
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-gray-500 mb-6">
                    <span>★ {pkg.rating} ({pkg.reviews})</span>
                    <span>{pkg.photoPieces} photos</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openModal("view", pkg)} 
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2.5 rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button 
                      onClick={() => openModal("edit", pkg)} 
                      className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 py-2.5 rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(pkg.id)} 
                      className="flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-105"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-red-100/50 animate-in slide-in-from-bottom-4 duration-300">
              {/* Enhanced Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-red-50 to-white">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {modalMode === "create" ? "Add New Package" : modalMode === "edit" ? "Edit Package" : "View Package"}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {modalMode === "create" ? "Create a new photography package" : 
                     modalMode === "edit" ? "Modify package details" : "Package information"}
                  </p>
                </div>
                <button 
                  onClick={closeModal}
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Enhanced Category Selection */}
                <div>
                  <label className="block font-semibold mb-3 text-gray-800">Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((c) => {
                      const isSelected = formData.category === c.value;
                      const Icon = c.icon;
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => modalMode !== "view" && setFormData(prev => ({ ...prev, category: c.value }))}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                            isSelected 
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-500 shadow-lg scale-105' 
                              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200 hover:border-red-200'
                          }`}
                          disabled={modalMode === "view"}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{c.value}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Enhanced Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-800">Title</label>
                    <input 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      disabled={modalMode === "view"} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                      placeholder="Enter package title"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-800">Photographer</label>
                    <input 
                      name="photographer" 
                      value={formData.photographer} 
                      onChange={handleInputChange} 
                      disabled={modalMode === "view"} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                      placeholder="Photographer name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-800">Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    disabled={modalMode === "view"} 
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                    placeholder="Package description"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-800">Date</label>
                  <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleInputChange} 
                    disabled={modalMode === "view"} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                  />
                </div>

                {/* Enhanced Image Upload */}
                <div>
                  <label className="block font-semibold mb-2 text-gray-800">Package Image</label>
                  {formData.image && (
                    <div className="mb-4">
                      <img 
                        src={formData.image} 
                        alt="preview" 
                        className="w-40 h-40 object-cover rounded-2xl border-4 border-white shadow-lg"
                      />
                    </div>
                  )}
                  {modalMode !== "view" && (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-400 transition-colors">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:bg-red-50 file:text-red-600 hover:file:bg-red-100"
                      />
                    </div>
                  )}
                </div>

                {/* Enhanced Price Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-800">Price ($)</label>
                    <input 
                      type="number" 
                      name="price" 
                      value={formData.price} 
                      onChange={handleInputChange} 
                      disabled={modalMode === "view"} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-800">Original Price ($)</label>
                    <input 
                      type="number" 
                      name="originalPrice" 
                      value={formData.originalPrice} 
                      onChange={handleInputChange} 
                      disabled={modalMode === "view"} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Enhanced Stats Fields */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-800">Rating</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      name="rating" 
                      value={formData.rating} 
                      onChange={handleInputChange} 
                      disabled={modalMode === "view"} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                      placeholder="5.0"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-800">Reviews</label>
                    <input 
                      type="number" 
                      name="reviews" 
                      value={formData.reviews} 
                      onChange={handleInputChange} 
                      disabled={modalMode === "view"} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-800">Photo Count</label>
                    <input 
                      type="number" 
                      name="photoPieces" 
                      value={formData.photoPieces} 
                      onChange={handleInputChange} 
                      disabled={modalMode === "view"} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Enhanced Features */}
                <div>
                  <label className="block font-semibold mb-3 text-gray-800">Features</label>
                  <div className="space-y-3">
                    {formData.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-3">
                        <input 
                          value={feature} 
                          onChange={(e) => handleFeatureChange(idx, e.target.value)} 
                          disabled={modalMode === "view"} 
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors bg-gray-50/50"
                          placeholder="Enter feature"
                        />
                        {modalMode !== "view" && (
                          <button 
                            type="button" 
                            onClick={() => removeFeature(idx)} 
                            className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-3 rounded-xl transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {modalMode !== "view" && (
                      <button 
                        type="button" 
                        onClick={addFeature} 
                        className="bg-green-100 hover:bg-green-200 text-green-600 px-4 py-2 rounded-xl transition-colors font-medium"
                      >
                        + Add Feature
                      </button>
                    )}
                  </div>
                </div>

                {/* Enhanced Save Button */}
                {modalMode !== "view" && (
                  <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                    <button 
                      onClick={closeModal}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSubmit} 
                      className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {modalMode === "create" ? "Create Package" : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPackageDashboard;