import { SingleCandidateReviewer } from "./SingleCandidateReviewer";
import {
  AllTheProviders,
  fireEvent,
  QueryClientWrapper,
  render,
  renderHook,
  screen,
  waitFor,
  within,
} from "../../../test-utils/testingLibrary";
import { Candidate, ReviewStatus } from "./Candidate";
import { useCandidates } from "../../../requests/candidates/useCandidates";
import { frozenCandidates } from "../../../test-utils/frozenCandidates";

let candidate: Candidate;
const resetActiveCandidateMock = jest.fn();

beforeEach(async () => {
  // Create dummy candidate and fresh mock.
  candidate = { ...frozenCandidates[0] };
  resetActiveCandidateMock.mockReset();

  // Ensure that `QueryClientWrapper` will be used as the query client and has loaded.
  // eslint-disable-next-line testing-library/no-render-in-setup
  let { result } = renderHook(() => useCandidates(), {
    wrapper: QueryClientWrapper,
  });
  await waitFor(() => expect(result.current).toBeDefined());
});

const getCandidateByEmail = async (email: string): Promise<Candidate> => {
  let { result } = renderHook(() => useCandidates(), {
    wrapper: AllTheProviders,
  });
  await waitFor(() => expect(result.current).toBeDefined());
  return result.current?.find(
    (candidate) => candidate.email === email
  ) as unknown as Candidate;
};

const setup = (candidate: Candidate) => {
  render(
    <SingleCandidateReviewer
      candidate={candidate}
      resetActiveCandidate={resetActiveCandidateMock}
    />
  );
};

test("empty comment and profile displayed on load", () => {
  setup(candidate);

  const candidateElement = screen.getByTestId("candidate-overview");
  const candidateNameHeading = within(candidateElement).getByRole("heading", {
    name: "John Smith",
  });
  expect(candidateNameHeading).toBeInTheDocument();

  const textboxElement = screen.getByRole("textbox");
  expect(textboxElement).toBeInTheDocument();
});

test("display previous comment on load", () => {
  setup({ ...candidate, comment: "test comment" });

  const textboxElement = screen.getByRole("textbox");
  expect(within(textboxElement).getByText("test comment")).toBeDefined();
  const textElement = within(textboxElement).getByText("test comment");
  expect(textElement).toBeInTheDocument();
});

test("approve with comment", async () => {
  setup(candidate);

  const approveButton = screen.getByRole("button", { name: "APPROVE" });
  fireEvent.click(approveButton);

  await waitFor(() => expect(resetActiveCandidateMock).toHaveBeenCalled());
  await waitFor(() =>
    getCandidateByEmail(candidate.email).then(
      (updatedCandidate) => updatedCandidate?.status === ReviewStatus.APPROVED
    )
  );
});

test("cancel review on previously-rejected candidate with comment", async () => {
  setup({
    ...candidate,
    status: ReviewStatus.REJECTED,
    comment: "initial reject",
  });

  const textboxElement = screen.getByRole("textbox");
  expect(within(textboxElement).getByText("initial reject")).toBeDefined();
  fireEvent.input(textboxElement, { target: { value: "new ignored comment" } });

  const cancelButton = screen.getByRole("button", { name: /CANCEL REVIEW/ });
  fireEvent.click(cancelButton);

  await waitFor(() => expect(resetActiveCandidateMock).toHaveBeenCalled());
  await waitFor(() =>
    getCandidateByEmail(candidate.email).then(
      (updatedCandidate) => updatedCandidate?.status === ReviewStatus.REJECTED
    )
  );
});

test("approve previously-rejected candidate with new comment", async () => {
  setup({
    ...candidate,
    status: ReviewStatus.REJECTED,
    comment: "initial reject",
  });

  const textboxElement = screen.getByRole("textbox");
  expect(within(textboxElement).getByText("initial reject")).toBeDefined();
  fireEvent.input(textboxElement, { target: { value: "final accept" } });

  const approveButton = screen.getByRole("button", { name: "APPROVE" });
  fireEvent.click(approveButton);
  await waitFor(() => expect(resetActiveCandidateMock).toHaveBeenCalled());

  await waitFor(() =>
    getCandidateByEmail(candidate.email).then(
      (updatedCandidate) =>
        updatedCandidate?.status === ReviewStatus.APPROVED &&
        updatedCandidate?.comment === "final accept"
    )
  );
});

test("reset previously-approved candidate with comment", async () => {
  setup({
    ...candidate,
    status: ReviewStatus.REJECTED,
    comment: "initial reject",
  });

  const resetButton = screen.getByRole("button", { name: /RESET STATUS/ });
  fireEvent.click(resetButton);

  await waitFor(() => expect(resetActiveCandidateMock).toHaveBeenCalled());
  await waitFor(() =>
    getCandidateByEmail(candidate.email).then(
      (updatedCandidate) =>
        updatedCandidate?.status === ReviewStatus.PENDING &&
        updatedCandidate?.comment === ""
    )
  );
});
