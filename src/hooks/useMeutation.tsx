import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCustomMutation = (mutationFn, queryKey) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(mutationFn, {
    onMutate: async (updatedData) => {
      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData) => {
        return { ...oldData, ...updatedData };
      });

      return () => queryClient.setQueryData(queryKey, previousData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },

    onError: (err, variables, rollback) => {
      if (rollback) rollback();
    },
  });

  return mutation;
};

export default useCustomMutation;
