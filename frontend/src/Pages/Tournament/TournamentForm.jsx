import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NB from "../../components/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TournamentForm = () => {
  const navigate = useNavigate();
  const [groundInfo, setGroundInfo] = useState(null);
  const [groundTournaments, setGroundTournaments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const { state } = useLocation();
  const groundId = state && state.id ? state.id : "";

  useEffect(() => {
    fetchData(groundId);
  }, [groundId]);

  const fetchData = async (gId) => {
    try {
      const groundResponse = await axios.get(
        `http://localhost:4000/GroundOwner/GetGroundById/${gId}`
      );
      const filteredTournaments = groundResponse.data.ground.Tournaments.filter(
        (tournament) => {
          const now = new Date();
          return (
            tournament.RegStartingDate <= now &&
            tournament.RegEndingDate >= now &&
            tournament.NoOfRegTeams < tournament.teamsCount
          );
        }
      );

      setGroundInfo(groundResponse.data.ground);
      setGroundTournaments(groundResponse.data.ground.Tournaments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [teamName, setTeamName] = useState("");
  const [teamCaptain, setTeamCaptain] = useState("");
  const [members, setMembers] = useState([
    { name: "", email: "", contact: "" },
  ]);

  const handleAddMember = () => {
    if (members.length < selectedTournament.MembersPerTeam) {
        setMembers([...members, { name: "", email: "", contact: "" }]);
      }
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = members.slice();
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (members.length < selectedTournament.MembersPerTeam) {
        alert(`You need to add at least ${selectedTournament.MembersPerTeam} members to the team.`);
        return;
      }
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(`http://localhost:4000/GroundOwner/TournamentRegistration`, {
        teamName,
        teamCaptain,
        members,
        tournamentId: selectedTournament._id,
        userId,
        groundId: groundInfo._id
      });
      console.log("Registration successful:", response.data);
      setShowModal(false);
    } catch (error) {
      console.error("Error registering team:", error);
    }
  };

  const openModal = (tournament) => {
    setSelectedTournament(tournament);
    setShowModal(true);
  };

  const resetForm = () => {
    setTeamName("");
    setTeamCaptain("");
    setMembers([{ name: "", email: "", contact: "" }]);
  };

  const closeModal = () => {
    resetForm();
    setSelectedTournament(null);
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    groundInfo && (
      <div className="bg-white">
        <NB />
        <div className="container_">
          <div className="grounds-container1">
            <h1 className="uppercase-text text-4xl text-black text-left mb-4 mt-20 ml-30">
              {groundInfo.G_Name}
            </h1>
            <hr className="mb-4" />
            {groundTournaments.map((d, index) => (
              <div
                key={index}
                className="ground-card mt-10 bg-white rounded-lg shadow-lg"
              >
                <div className="flex items-center justify-between pl-5 pr-5">
                  <div className="relative h-36 w-36 bg-white overflow-hidden rounded-full">
                    <img
                      src={"/Posters/"+d.PosterPath}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-grow ml-6">
                    <p className="text-xl font-semibold text-blue-900">
                      {d.TournamentName}
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-blue-900 font-semibold">
                          Registration End Date:
                        </p>
                        <p>{formatDate(d.RegEndingDate)}</p>
                      </div>
                      <div>
                        <p className="text-blue-900 font-semibold">
                          Number of Registered Teams:
                        </p>
                        <p>{d.NoOfRegTeams}</p>
                      </div>
                      <div>
                        <p className="text-blue-900 font-semibold">
                          Tournament Start Date:
                        </p>
                        <p>{formatDate(d.startingDate)}</p>
                      </div>
                      <div>
                        <p className="text-blue-900 font-semibold">Tournament End Date:</p>
                        <p>{formatDate(d.endingDate)}</p>
                      </div>
                      <div>
                        <p className="text-blue-900 font-semibold">
                          Winning Prize: 
                        </p>
                        <p className="text-red-900 font-semibold">Rs {d.winningPrize}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => openModal(d)}
                      className="bg-blue-500 hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={closeModal}
            ></div>
            <div className="relative bg-white p-8 rounded-lg shadow max-h-[80vh] overflow-y-auto">
              <h1 className="text-2xl font-bold mb-6">
                Sports Tournament Registration
              </h1>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label htmlFor="teamName" className="block text-gray-700">
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    value={teamName}
                    placeholder="Enter Team Name"
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="teamCaptain" className="block text-gray-700">
                    Team Captain
                  </label>
                  <input
                    type="text"
                    id="teamCaptain"
                    value={teamCaptain}
                    placeholder="Enter Team's Captain Name"
                    onChange={(e) => setTeamCaptain(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-black"
                    required
                  />
                </div>
                <div id="members-container" className="mb-4">
                  <label className="block text-gray-700">Team Members</label>
                  {members.map((member, index) => (
                    <div className="member mb-2" key={index}>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        placeholder="Member Name"
                        className="w-full px-3 py-2 border rounded mb-2 text-black"
                        required
                      />
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, "email", e.target.value)
                        }
                        placeholder="Member Email"
                        className="w-full px-3 py-2 border rounded mb-2 text-black"
                        required
                      />
                      <input
                        type="text"
                        value={member.contact}
                        onChange={(e) =>
                          handleMemberChange(index, "contact", e.target.value)
                        }
                        placeholder="Member Contact Info"
                        className="w-full px-3 py-2 border rounded mb-2 text-black"
                        required
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Member
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default TournamentForm;
