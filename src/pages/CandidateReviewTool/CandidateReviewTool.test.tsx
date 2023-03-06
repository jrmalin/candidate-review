import React from "react";
import { render, screen } from "../../test-utils/testingLibrary";
import { CandidateReviewTool } from "./CandidateReviewTool";
import { fireEvent, waitFor, within } from "@testing-library/react";
import { ReviewStatus } from "./components/Candidate";
import { confirmCandidate } from "../../test-utils/confirmCandidate";

const getScreenEmails = (): string[] =>
  screen.getAllByTestId("candidate-overview").map((candidateElement) =>
    within(candidateElement)
      .getByText(/Email: /)
      .textContent!.slice(7)
  );

test("renders CandidateReviewTool page", async () => {
  render(<CandidateReviewTool />);

  const addCandidatesButton = await screen.findByRole("button", {
    name: "Add 10 Candidates",
  });
  const resetToolButton = screen.getByRole("button", { name: "Reset Tool" });

  const [firstCandidateElement, secondCandidateElement] =
    screen.getAllByTestId("candidate-overview");
  confirmCandidate(firstCandidateElement, "John Smith", ReviewStatus.PENDING);
  confirmCandidate(secondCandidateElement, "Jane Smith", ReviewStatus.PENDING);

  expect(addCandidatesButton).toBeInTheDocument();
  expect(resetToolButton).toBeInTheDocument();
});

test("add candidates  button", async () => {
  render(<CandidateReviewTool />);

  const addCandidatesButton = await screen.findByRole("button", {
    name: "Add 10 Candidates",
  });

  await waitFor(() =>
    expect(screen.getAllByTestId("candidate-overview")).toHaveLength(2)
  );

  fireEvent.click(addCandidatesButton);
  await waitFor(() =>
    expect(screen.getAllByTestId("candidate-overview")).toHaveLength(4)
  );

  fireEvent.click(addCandidatesButton);
  await waitFor(() =>
    expect(screen.getAllByTestId("candidate-overview")).toHaveLength(6)
  );
});

test("reset tool  button", async () => {
  render(<CandidateReviewTool />);

  const addCandidatesButton = await screen.findByRole("button", {
    name: "Add 10 Candidates",
  });
  const resetToolButton = screen.getByRole("button", { name: "Reset Tool" });

  await waitFor(() =>
    expect(screen.getAllByTestId("candidate-overview")).toHaveLength(2)
  );

  fireEvent.click(addCandidatesButton);
  await waitFor(() =>
    expect(screen.getAllByTestId("candidate-overview")).toHaveLength(4)
  );

  const emailsBeforeReset = getScreenEmails();

  fireEvent.click(resetToolButton);
  await waitFor(() =>
    expect(screen.getAllByTestId("candidate-overview")).toHaveLength(2)
  );

  const emailsAfterReset = getScreenEmails();

  expect(
    emailsBeforeReset.filter((value) => emailsAfterReset.includes(value))
  ).toHaveLength(0);
});

test("persistence on refresh", async () => {
  const { rerender } = render(<CandidateReviewTool />);
  let emails: string[] = [];
  await waitFor(() => {
    emails = getScreenEmails();
    expect(emails).toContain("test@john.com");
  });

  expect(emails).toContain("test@jane.com");

  rerender(<CandidateReviewTool />);
  emails = getScreenEmails();
  expect(emails).toContain("test@john.com");
  expect(emails).toContain("test@jane.com");
});
