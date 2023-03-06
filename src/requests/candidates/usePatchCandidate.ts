import { Candidate } from "../../pages/CandidateReviewTool/components/Candidate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RandomUsersResponse } from "./sendGetRandomUsers";

// Because we aren't set up with an actual backend server, this no-ops.
const patchCandidate = async () => {};

export const usePatchCandidate = (): ((candidate: Candidate) => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(patchCandidate, {
    onMutate: async (mutatedCandidate: Candidate) => {
      queryClient.setQueryData(
        ["candidates"],
        (prevRandomUsersResponse: RandomUsersResponse | undefined) => {
          return {
            results:
              prevRandomUsersResponse?.results?.map((candidate) =>
                candidate.email === mutatedCandidate.email
                  ? mutatedCandidate
                  : candidate
              ) ?? [],
          };
        }
      );
    },

    // We might normally set up handlers for if the request fails, but it will always succeed because it is a no-op.
    onError: () => {},
    onSuccess: () => {},
  });
  return mutation.mutate;
};
