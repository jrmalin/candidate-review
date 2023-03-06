import { SingleCandidateOverview } from "./SingleCandidateOverview";
import { Candidate, ReviewStatus } from "./Candidate";
import styled from "@emotion/styled";
import { Chip, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { usePatchCandidate } from "../../../requests/candidates/usePatchCandidate";
import { useEventListener } from "usehooks-ts";

const CandidateReviewWrapper = styled.div`
  width: 50rem;
  max-width: 80vw;
  margin: 2rem auto;
`;

export const SingleCandidateReviewer = ({
  candidate,
  resetActiveCandidate,
}: {
  candidate: Candidate;
  resetActiveCandidate: () => void;
}) => {
  const [comment, setComment] = useState("");
  // The candidate can change without recreating the component. We want to ignore any non-explicitly-updated comments
  // but load the active candidate's comment each time the candidate is changed.
  useEffect(() => setComment(candidate.comment ?? ""), [candidate]);

  // If the user keys "Escape" while the user is the document is focused on the input, blur the input. If the user is
  // not focused on the input at time of keying "Escape", close the modal as if the use clicked "CANCEL REVIEW".
  const inputRef = useRef<HTMLInputElement>(null);
  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key !== "Escape") {
      return;
    }

    if (document.activeElement === inputRef.current) {
      inputRef.current?.blur();
    } else {
      onClickReview(candidate.status, candidate.comment);
    }
  });

  const patchCandidate = usePatchCandidate();

  const onClickReview = (status?: ReviewStatus, comment?: string) => {
    patchCandidate({ ...candidate, status, comment });
    resetActiveCandidate();
  };

  return (
    <CandidateReviewWrapper>
      <SingleCandidateOverview candidate={candidate} />
      <TextField
        label="Comment"
        multiline
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        variant="filled"
        sx={{ width: "90%", mt: 2, mb: 2, border: "1px solid white" }}
        inputRef={inputRef}
      />
      <br />
      <Chip
        label="APPROVE"
        color="success"
        onClick={() => onClickReview(ReviewStatus.APPROVED, comment)}
      />
      <Chip
        label="REJECT"
        color="error"
        onClick={() => onClickReview(ReviewStatus.REJECTED, comment)}
      />
      <Chip
        label="CANCEL REVIEW (NO UPDATE TO STATUS)"
        color="info"
        onClick={() => onClickReview(candidate.status, candidate.comment)}
      />
      <br />
      <Chip
        label="RESET STATUS AND CLEAR COMMENT"
        color="warning"
        onClick={() => onClickReview(ReviewStatus.PENDING, "")}
      />
    </CandidateReviewWrapper>
  );
};
