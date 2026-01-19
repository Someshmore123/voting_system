import { useEffect, useState } from "react";
import { getCandidates, voteCandidate } from "../api/api";
import Candidate from "../components/Candidate";

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    getCandidates().then((res) => setCandidates(res.data));
  }, []);

  const vote = async (id) => {
    await voteCandidate(id);
    alert("Vote submitted successfully");
    setVoted(true);
  };

  return (
    <div>
      <h1>Vote for Candidate</h1>

      {candidates.map((candidate) => (
        <Candidate
          key={candidate._id}
          candidate={candidate}
          onVote={vote}
          disabled={voted}
        />
      ))}
    </div>
  );
}
