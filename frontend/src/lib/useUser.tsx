import {useQuery} from "@tanstack/react-query";
import GetMe from "../api";

export default function useUser() {
    const {isLoading, data, isError} = useQuery({queryKey: ["Me"], queryFn: GetMe})
    return {isLoading, data, isError}
}