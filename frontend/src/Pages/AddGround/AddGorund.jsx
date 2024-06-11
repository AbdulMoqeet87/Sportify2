import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NB from "../../components/Navbar";
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const AddGround = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // State variables for form fields
  const [groundName, setGroundName] = useState('');
  const [sportsCategory, setSportsCategory] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState('');
  const [perHourCharges, setPerHourCharges] = useState('');
  const [groundOwnerEmail, setGroundOwnerEmail] = useState('');
  const [image, setImage] = useState(null);
  const [slots, setSlots] = useState([{ date: '', startTime: '', endTime: '' }]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSlotChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSlots = [...slots];
    updatedSlots[index][name] = value;
    setSlots(updatedSlots);
  };

  const handleAddSlot = () => {
    setSlots([...slots, { date: '', startTime: '', endTime: '' }]);
  };

  const handleRemoveSlot = (index) => {
    const updatedSlots = slots.filter((_, i) => i !== index);
    setSlots(updatedSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('into handle add');
    const formData = new FormData();
    formData.append('G_Name', groundName);
    formData.append('SportsCategory', sportsCategory);
    formData.append('Town', town);
    formData.append('City', city);
    formData.append('District', district);
    formData.append('Address', address);
    formData.append('PerHourCharges', perHourCharges);
    formData.append('GroundOwnerEmail', groundOwnerEmail);
    formData.append('Image', image);
    formData.append('Slots', JSON.stringify(slots));
    const userId=localStorage.getItem("userId");
    try {
      await axios.post(
        `http://localhost:4000/GroundOwner/CreateGround/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Clear the form fields after successful submission
      setGroundName('');
      setSportsCategory('');
      setTown('');
      setCity('');
      setDistrict('');
      setAddress('');
      setPerHourCharges('');
      setGroundOwnerEmail('');
      setImage(null);
      setSlots([{ date: '', startTime: '', endTime: '' }]);
      navigate('/OwnerHome'); 
      toast.success("Ground added successfully");
    } catch (error) {
    toast.error("Could not add ground");
      console.error(error);
    }
  };

  return (
    <div className="bg_images_G min-h-screen flex items-center justify-center bg-blue-50">
      <NB />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-20">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Add New Ground</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="groundName" className="block text-gray-700 text-sm font-bold mb-2">
              Ground Name
            </label>
            <input
              type="text"
              id="groundName"
              name="groundName"
              value={groundName}
              onChange={(e) => setGroundName(e.target.value)}
              placeholder="Enter ground name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sportsCategory" className="block text-gray-700 text-sm font-bold mb-2">
              Sports Category
            </label>
            <input
              type="text"
              id="sportsCategory"
              name="sportsCategory"
              value={sportsCategory}
              onChange={(e) => setSportsCategory(e.target.value)}
              placeholder="Enter sports category"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="town" className="block text-gray-700 text-sm font-bold mb-2">
              Town
            </label>
            <input
              type="text"
              id="town"
              name="town"
              value={town}
              onChange={(e) => setTown(e.target.value)}
              placeholder="Enter town"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="district" className="block text-gray-700 text-sm font-bold mb-2">
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Enter district"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="perHourCharges" className="block text-gray-700 text-sm font-bold mb-2">
              Per Hour Charges
            </label>
            <input
              type="number"
              id="perHourCharges"
              name="perHourCharges"
              value={perHourCharges}
              onChange={(e) => setPerHourCharges(e.target.value)}
              placeholder="Enter charges per hour"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="groundOwnerEmail" className="block text-gray-700 text-sm font-bold mb-2">
              Ground Owner Email
            </label>
            <input
              type="email"
              id="groundOwnerEmail"
              name="groundOwnerEmail"
              value={groundOwnerEmail}
              onChange={(e) => setGroundOwnerEmail(e.target.value)}
              placeholder="Enter ground owner email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Slots</label>
            {slots.map((slot, index) => (
              <div key={index} className="mb-2">
                <div className="flex space-x-2">
                  <input
                    type="date"
                    name="date"
                    value={slot.date}
                    onChange={(e) => handleSlotChange(index, e)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
                  />
                  <input
                    type="time"
                    name="startTime"
                    value={slot.startTime}
                    onChange={(e) => handleSlotChange(index, e)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
                  />
                  <input
                    type="time"
                    name="endTime"
                    value={slot.endTime}
                    onChange={(e) => handleSlotChange(index, e)}
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 text-black"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSlot(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSlot}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add Slot
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Add Ground
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGround;
