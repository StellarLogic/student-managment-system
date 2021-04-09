import faker from "faker";

export const profile = {
  contact: faker.phone.phoneNumberFormat(),
  skills: ["Dancing", "Running", "Travelling"],
  bio:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo sed officiis magnam, rem dolor ipsum accusantium natus eos cum! Ipsa fugit mollitia sapiente amet eius.",
  address: {
    flat: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    zip: faker.address.zipCode(),
  },
};
