import { ReviewStatus } from "../pages/CandidateReviewTool/components/Candidate";
import { within } from "@testing-library/react";

export const confirmCandidate = (
  candidateElement: HTMLElement,
  name: string,
  status: ReviewStatus
) => {
  const candidateNameHeading = within(candidateElement).getByRole("heading", {
    name: name,
  });
  const candidateStatusButton = within(candidateElement).getByRole("button", {
    name: `Status: ${status}`,
  });
  expect(candidateNameHeading).toBeInTheDocument();
  expect(candidateStatusButton).toBeInTheDocument();
};
