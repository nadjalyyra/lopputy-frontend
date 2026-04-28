export type ClientData = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;

  _links: {
    self: {
      href: string;
    };
  };
};

export type Client = Omit<ClientData, "_links">;