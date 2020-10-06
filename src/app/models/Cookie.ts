import { CookiePlugin } from './CookiePlugin';

export interface Cookie {
  CategoyHeading: string;
  CategoyId: number;
  CategoyText: string;
  ExtraSettings: string;
  IsMandatory: boolean;
  Localization: string;
  Collapsed?: boolean;
  PluginList: Array<CookiePlugin>;
}
