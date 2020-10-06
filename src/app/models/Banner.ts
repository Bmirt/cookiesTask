import { Cookie } from './Cookie';

export interface Banner {
  BannerId: number;
  Created: string;
  LastUpdated: string;
  accordian: Array<Cookie>;
}
