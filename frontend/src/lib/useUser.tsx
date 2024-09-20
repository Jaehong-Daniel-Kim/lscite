import {useQuery} from "@tanstack/react-query";
import GetMe from "../api";
import {IUser} from "../types";

export default function useUser() {
    const {isLoading, data, isError} = useQuery<IUser>({queryKey: ["Me"], queryFn: GetMe})
    return {isLoading, data, isError}
}