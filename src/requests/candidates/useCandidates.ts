import { useQuery } from "@tanstack/react-query";
import { Candidate } from "../../pages/CandidateReviewTool/components/Candidate";
import { sendGetRandomUsers } from "./sendGetRandomUsers";

export const useCandidates = (numUsers: number = 10): Candidate[] | undefined =>
  useQuery(["candidates"], () => sendGetRandomUsers(numUsers)).data?.results;
