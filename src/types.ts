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

export type Training = {
  date: string;
  activity: string;
  duration: number;
  customer: string;
};

export type CustomerOption = {
  value: string;
  label: string;
};