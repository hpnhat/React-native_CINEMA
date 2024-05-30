import { get, getById } from "@/common/services/auth";
import { useQuery } from "@tanstack/react-query";

const useAuthQuery = (id?: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["AUTH_KEY", id],
    queryFn: async () => {
      return id ? await getById(id) : await get();
    },
  });
  return { data, ...rest };
};
export default useAuthQuery;
