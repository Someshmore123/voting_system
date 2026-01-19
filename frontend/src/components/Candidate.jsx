export default function Candidate({ candidate, onVote, disabled }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        marginBottom: "10px",
        borderRadius: "6px",
      }}
    >
      <h3>{candidate.name}</h3>

      <button
        onClick={() => onVote(candidate._id)}
        disabled={disabled}
        style={{
          padding: "6px 12px",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {disabled ? "Already Voted" : "Vote"}
      </button>
    </div>
  );
}
