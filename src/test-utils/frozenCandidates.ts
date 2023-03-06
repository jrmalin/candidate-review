// Freeze this object so that we can't accidentally make changes to it.
export const frozenCandidates = Object.freeze(
  [
    {
      gender: "male",
      name: { first: "John", last: "Smith" },
      location: { country: "USA" },
      email: "test@john.com",
      phone: "123-456-7890",
      picture: { large: "https://pictureUrl.com" },
    },
    {
      gender: "female",
      name: { first: "Jane", last: "Smith" },
      location: { country: "USA" },
      email: "test@jane.com",
      phone: "123-456-7890",
      picture: { large: "https://pictureUrl.com" },
    },
    {
      gender: "male",
      name: { first: "Mike", last: "Smith" },
      location: { country: "USA" },
      email: "test@mike.com",
      phone: "123-456-7890",
      picture: { large: "https://pictureUrl.com" },
    },
    {
      gender: "male",
      name: { first: "Paul", last: "Smith" },
      location: { country: "USA" },
      email: "test@paul.com",
      phone: "123-456-7890",
      picture: { large: "https://pictureUrl.com" },
    },
    {
      gender: "female",
      name: { first: "Sydney", last: "Smith" },
      location: { country: "USA" },
      email: "test@sydney.com",
      phone: "123-456-7890",
      picture: { large: "https://pictureUrl.com" },
    },
    {
      gender: "female",
      name: { first: "Ashley", last: "Smith" },
      location: { country: "USA" },
      email: "test@ashley.com",
      phone: "123-456-7890",
      picture: { large: "https://pictureUrl.com" },
    },
  ].map((candidate) => Object.freeze(candidate))
);
