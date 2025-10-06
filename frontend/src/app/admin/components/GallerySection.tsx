"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaTrash, FaImage, FaStar } from "react-icons/fa";

// Define types
interface GalleryImage {
  name: string;
  src: string | ArrayBuffer | null;
}

interface Folder {
  name: string;
  images: GalleryImage[];
}

export default function GallerySection() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [newFolder, setNewFolder] = useState("");
  const [toppers, setToppers] = useState<GalleryImage[]>([]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedFolders = localStorage.getItem("adminGallery");
    const savedToppers = localStorage.getItem("adminToppers");
    if (savedFolders) setFolders(JSON.parse(savedFolders));
    if (savedToppers) setToppers(JSON.parse(savedToppers));
  }, []);

  // Save data automatically
  useEffect(() => {
    localStorage.setItem("adminGallery", JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem("adminToppers", JSON.stringify(toppers));
  }, [toppers]);

  // Folder Controls
  const addFolder = () => {
    if (!newFolder.trim()) return;
    setFolders([...folders, { name: newFolder, images: [] }]);
    setNewFolder("");
  };

  const deleteFolder = (name: string) => {
    setFolders(folders.filter((f) => f.name !== name));
    if (selectedFolder === name) setSelectedFolder(null);
  };

  // Image Controls
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedFolder || !e.target.files?.length) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const updated = folders.map((f) =>
        f.name === selectedFolder
          ? { ...f, images: [...f.images, { src: reader.result, name: file.name }] }
          : f
      );
      setFolders(updated);
    };
    reader.readAsDataURL(file);
  };

  const deleteImage = (folderName: string, imgName: string) => {
    setFolders(
      folders.map((f) =>
        f.name === folderName
          ? {
              ...f,
              images: f.images.filter((img: GalleryImage) => img.name !== imgName),
            }
          : f
      )
    );
    // Also remove from toppers if exists
    setToppers(toppers.filter((t) => t.name !== imgName));
  };

  // Toppers Controls
  const addTopper = (img: GalleryImage) => {
    if (!toppers.find((t) => t.name === img.name)) setToppers([...toppers, img]);
  };

  const removeTopper = (imgName: string) => {
    setToppers(toppers.filter((t) => t.name !== imgName));
  };

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">📸 Gallery Management</h2>

      {/* Folder Creation */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="New Folder Name"
          className="border rounded-lg p-2 w-60"
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
        />
        <button
          onClick={addFolder}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add Folder
        </button>
      </div>

      {/* Folder List */}
      <div className="flex flex-wrap gap-4 mb-6">
        {folders.map((f) => (
          <div
            key={f.name}
            className={`p-4 border rounded-xl cursor-pointer shadow-sm transition ${
              selectedFolder === f.name
                ? "bg-indigo-100 border-indigo-400"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedFolder(f.name)}
          >
            <p className="font-semibold text-indigo-700">{f.name}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFolder(f.name);
              }}
              className="text-red-500 text-sm mt-2 flex items-center gap-1"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>

      {/* Selected Folder */}
      {selectedFolder && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-600">
            Folder: {selectedFolder}
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              <FaImage /> Add Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAddImage}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {folders
              .find((f) => f.name === selectedFolder)
              ?.images.map((img) => (
                <div
                  key={img.name}
                  className="relative border rounded-lg overflow-hidden shadow-sm"
                >
                  <img src={img.src as string} alt={img.name} className="w-full h-40 object-cover" />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                      onClick={() => deleteImage(selectedFolder, img.name)}
                      className="bg-red-600 text-white p-1 rounded-full"
                    >
                      <FaTrash size={12} />
                    </button>
                    {toppers.some((t) => t.name === img.name) ? (
                      <button
                        onClick={() => removeTopper(img.name)}
                        className="bg-yellow-400 text-white p-1 rounded-full"
                      >
                        <FaStar size={12} />
                      </button>
                    ) : (
                      <button
                        onClick={() => addTopper(img as GalleryImage)}
                        className="bg-gray-300 text-yellow-500 p-1 rounded-full"
                      >
                        <FaStar size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Toppers Section */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4 text-yellow-600">🏆 Toppers</h3>
        {toppers.length === 0 && <p className="text-gray-500">No toppers added yet.</p>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {toppers.map((img) => (
            <div key={img.name} className="relative border rounded-lg overflow-hidden shadow">
              <img src={img.src as string} alt={img.name} className="w-full h-40 object-cover" />
              <button
                onClick={() => removeTopper(img.name)}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
