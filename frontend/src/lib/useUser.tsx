import {useQuery} from "@tanstack/react-query";
import {IUser} from "../types";
import {getMe} from "../api";

export default function useUser() {
    const {isLoading, data, isError} = useQuery<IUser>({
        queryKey: ["Me"], queryFn: getMe, retry: false
    })

    return {
        isUserLoading: isLoading,
        user: data,
        isUserLoggedIn: !isError,
    }
}