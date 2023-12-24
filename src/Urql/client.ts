import { useMemo } from "react";
import { cacheExchange, Client, fetchExchange, ssrExchange, errorExchange } from "urql";


let client: Client | null = null;

let ssrCache: ReturnType<typeof ssrExchange> | null = null;

const isServer = typeof window === "undefined";
export function initUrqlClient(initialState?: any) {
    if (!client) {
        ssrCache = ssrExchange({ initialState, isClient: !isServer });
        client = new Client({
            url: process.env.NEXT_PUBLIC_API_URL as string,
            exchanges: [
                errorExchange({
                    onError: (error) => {
                        error.message = error.message.replace(/^\[.*\]\s*/, "");
                    }
                }),
                cacheExchange,
                ssrCache,
                fetchExchange
            ],
            fetchOptions: {
                credentials: "include"
            },
        });
    } else {
        ssrCache?.restoreData(initialState);
    }
    return { client, ssrCache };
}


export const useClient = (pageProps?: any) => {
    const urqlData = pageProps.urqlState;
    const { client } = useMemo(() => {
        return initUrqlClient(urqlData);
    }, [urqlData]);
    return client;
};