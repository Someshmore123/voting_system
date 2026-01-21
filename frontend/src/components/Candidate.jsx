export default function Candidate({ candidate, onVote, disabled }) {
  return (
    <div className="card candidate-card">
      <div className="candidate-info">
        <h3>{candidate.name}</h3>
        <p>Party: {candidate.party}</p>
        <p>Votes: {candidate.voteCount}</p>
      </div>

      <button onClick={() => onVote(candidate._id)} disabled={disabled}>
        {disabled ? "Already Voted" : "Vote"}
      </button>
    </div>
  );
}
