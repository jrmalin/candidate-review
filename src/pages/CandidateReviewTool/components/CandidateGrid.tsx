import { Grid } from "@mui/material";
import { SingleCandidateOverview } from "./SingleCandidateOverview";
import { Candidate } from "./Candidate";

const gridStyle = {
  justifyContent: "center",
  maxWidth: "145rem",
  margin: "0 auto",
};

export const CandidateGrid = ({
  candidates,
  setActiveCandidate,
}: {
  candidates: Candidate[];
  setActiveCandidate: (candidate: Candidate) => void;
}) => (
  <Grid container spacing={0.5} sx={gridStyle}>
    {candidates.map((candidate) => (
      <Grid item key={candidate.email}>
        <SingleCandidateOverview
          candidate={candidate}
          setActiveCandidate={() => setActiveCandidate(candidate)}
        />
      </Grid>
    ))}
  </Grid>
);
