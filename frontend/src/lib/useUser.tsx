import {useQuery} from "@tanstack/react-query";
import {IUser} from "../types";
import {GetMe} from "../api";

export default function useUser() {
    const {isLoading, data, isError} = useQuery<IUser>({queryKey: ["Me"], queryFn: GetMe})

    return {
        isUserLoading: isLoading,
        user: data,
        isUser: !isError,
    }
}