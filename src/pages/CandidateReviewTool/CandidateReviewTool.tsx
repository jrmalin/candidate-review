import { Chip, Typography } from "@mui/material";
import { useCandidates } from "../../requests/candidates/useCandidates";
import { useState } from "react";
import { SingleCandidateReviewer } from "./components/SingleCandidateReviewer";
import { CandidateGrid } from "./components/CandidateGrid";
import { CustomSpinner } from "../../components/CustomSpinner";
import { Candidate } from "./components/Candidate";
import { useAddCandidates } from "../../requests/candidates/useAddCandidates";
import { useInvalidateAllCandidates } from "../../requests/candidates/useInvalidateAllCandidates";
import { PopupModal } from "../../components/PopupModal";

export const CandidateReviewTool = () => {
  const candidates = useCandidates();
  const addCandidates = useAddCandidates();
  const invalidateAllCandidates = useInvalidateAllCandidates();
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(
    null
  );

  if (!candidates) {
    return <CustomSpinner />;
  }

  return (
    <>
      <Typography variant="h1">Candidate Review Tool</Typography>
      <Chip
        label="Add 10 Candidates"
        color="secondary"
        onClick={addCandidates}
      />
      <Chip
        label="Reset Tool"
        color="secondary"
        onClick={invalidateAllCandidates}
      />
      <CandidateGrid
        candidates={candidates}
        setActiveCandidate={setActiveCandidate}
      />
      {activeCandidate && (
        <PopupModal onClickClose={() => setActiveCandidate(null)}>
          <SingleCandidateReviewer
            candidate={activeCandidate}
            resetActiveCandidate={() => setActiveCandidate(null)}
          />
        </PopupModal>
      )}
    </>
  );
};
