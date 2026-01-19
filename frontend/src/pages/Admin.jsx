import { useEffect, useState } from "react";
import {
  addCandidate,
  deleteCandidate,
  getCandidates,
  getVoteCount,
} from "../api/api";

export default function Admin() {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);

  const loadData = async () => {
    const c = await getCandidates();
    const v = await getVoteCount();
    setCandidates(c.data);
    setVotes(v.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const add = async () => {
    if (!name || !party || !age) {
      alert("Fill all candidate fields");
      return;
    }
    await addCandidate({ name, party, age });
    setName("");
    setParty("");
    setAge("");
    loadData();
  };

  const remove = async (id) => {
    await deleteCandidate(id);
    loadData();
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Party" value={party} onChange={(e) => setParty(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

      <button onClick={add}>Add Candidate</button>

      <h3>Candidates</h3>
      {candidates.map((c) => (
        <div key={c._id}>
          {c.name} ({c.party})
          <button onClick={() => remove(c._id)}>Delete</button>
        </div>
      ))}

      <h3>Vote Count</h3>
      {votes.map((v, i) => (
        <p key={i}>
          {v.party}: {v.count}
        </p>
      ))}
    </div>
  );
}
