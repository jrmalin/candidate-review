// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { frozenCandidates } from "./test-utils/frozenCandidates";
import { Candidate } from "./pages/CandidateReviewTool/components/Candidate";
import { queryClient } from "./test-utils/testingLibrary";

let candidates: Candidate[] = [];
export const server = setupServer(
  rest.get("https://randomuser.me/api/", (_, res, ctx) => {
    expect(candidates.length).toBeGreaterThanOrEqual(2);
    // Return two candidates on each request, but make sure that those candidates are not repeated by removing them.
    const body = { results: candidates.splice(0, 2) };
    return res(ctx.json(body));
  })
);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Create unique candidate list for each test so that we can mutate the `candidates` list.
beforeEach(async () => {
  candidates = frozenCandidates.map((candidate) => ({ ...candidate }));
});

afterEach(async () => {
  // Reset any request handlers that we may add during the tests, so they don't affect other tests.
  server.resetHandlers();
  // Invalidate the candidates query so that the next test will make a new request.
  await queryClient.invalidateQueries({ queryKey: ["candidates"] });
});

// Clean up after the tests are finished.
afterAll(() => server.close());
