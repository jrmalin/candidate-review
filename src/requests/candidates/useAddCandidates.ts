import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RandomUsersResponse, sendGetRandomUsers } from "./sendGetRandomUsers";

// Because we aren't set up with an actual backend server, this no-ops.
// In this case, let's imagine a separate component candidate review tool that adds candidates to the backend.
const addCandidates = async () => {};

export const useAddCandidates = (numUsers: number = 10): (() => void) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addCandidates, {
    onMutate: async () => {
      const newRandomUsersResponse = await sendGetRandomUsers(numUsers);
      queryClient.setQueryData(
        ["candidates"],
        (prevRandomUsersResponse: RandomUsersResponse | undefined) => {
          return {
            results: (prevRandomUsersResponse?.results ?? []).concat(
              newRandomUsersResponse?.results ?? []
            ),
          };
        }
      );
    },

    // We might normally set up handlers for if the request fails, but we don't need to worry about staying in-sync with
    // the backend because there is no backend.
    onError: () => {},
    onSuccess: () => {},
  });
  return mutation.mutate;
};
