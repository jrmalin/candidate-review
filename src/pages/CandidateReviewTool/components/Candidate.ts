export enum ReviewStatus {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export type Candidate = {
  gender: string;
  name: {
    first: string;
    last: string;
  };
  location: {
    country: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
  };
  status?: ReviewStatus;
  comment?: string;
};
