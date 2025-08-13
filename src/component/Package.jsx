import React, { useState } from "react";

const Package = () => {
  const [packages, setPackages] = useState([]);

  const addPackage = () => {
    const newPackage = { id: Date.now(), name: "Wedding Package" };
    setPackages([...packages, newPackage]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Packages</h2>
      <button
        onClick={addPackage}
        className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-red-600"
      >
        Add Package
      </button>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg.id} className="p-2 border-b">{pkg.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Package;
