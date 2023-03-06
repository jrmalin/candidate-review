import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateAllCandidates = (): (() => void) => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["candidates"] });
};
