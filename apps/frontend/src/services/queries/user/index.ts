import { queryOptions, useQuery } from "@tanstack/react-query";
import type { MeResponse } from "@uni-news/types";
import { userKeys } from "@/config/keys";
import { httpClient } from "@/services/httpClient";

async function me() {
    const { data } = await httpClient.get<MeResponse>("/auth/me");
    return data;
}

export const getMe = () => {
    return queryOptions({
        queryKey: userKeys.me(),
        queryFn: me,
        staleTime: Infinity,
    });
};

export const useGetMe = () => {
    const { isError, isLoading, isSuccess } = useQuery(getMe());
    return { isError, isLoading, isSuccess };
};
