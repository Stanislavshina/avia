import { Segment } from './segment';

export type Ticket = {
  carrier: string;
  price: number;
  segments: Segment[];
};
