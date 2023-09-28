import { LemonsqueezyClient } from "lemonsqueezy.ts";

export const client = new LemonsqueezyClient(
  process.env.LEMONSQUEEZY_API_KEY_TEST as string
);
