export type ClientData = {
    name: string;
    email: string;
    goal: string;
    level: string;
    age: number;
    _links: {
        self: {
            href: string;
        },
        client: {
            href: string;
        }
    }
}

export type Client = Omit<ClientData, "_links">;