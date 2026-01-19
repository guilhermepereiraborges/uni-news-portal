export const userKeys = {
    all: ["user"] as const,
    me: () => [...userKeys.all, "me"] as const,
}

export const categoryKeys = {
    all: ["category"] as const,
    lists: () => [...categoryKeys.all, "list"] as const,
    details: () => [...categoryKeys.all, "detail"] as const,
}



export const postKeys = {
    all: ["posts"] as const,
    lists: () => [...postKeys.all, "list"] as const,
    details: (slug: string) => [...postKeys.all, "detail", slug] as const,
}