import { Candidate } from "../../pages/CandidateReviewTool/components/Candidate";
import { send } from "../utils/send";
import { HttpRequestMethod } from "../utils/HttpRequestMethod";

export type RandomUsersResponse = {
  results: Candidate[];
};

export const sendGetRandomUsers = async (
  numUsers: number
): Promise<RandomUsersResponse> =>
  send<RandomUsersResponse>(
    `https://randomuser.me/api/?results=${numUsers}`,
    HttpRequestMethod.GET
  );
