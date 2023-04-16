import type { IntlConfig } from "react-intl";

export interface ILocale {
  locale: string;
  englishName: string;
  displayName: string;
  rtl: boolean;
}

export interface ILocaleContext {
  locale: string;
  locales: ILocale[];
  defaultLocale: string;
  setLocale: (locale: string, forceReload?: boolean) => void;
  setDefaultLocale: (locale: string) => void;
}

export type LocalizationProviderConfig = IntlConfig & {
  locales: ILocale[];
  storage?: Storage;
  localeLoader?: (locale: string) => Promise<IntlConfig["messages"]>;
};
