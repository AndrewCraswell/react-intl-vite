import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import type { IntlConfig } from "react-intl";

import type {
  ILocaleContext,
  LocalizationProviderConfig,
} from "./LocalizationProvider.types";

const LOCALE_CACHE_KEY = "locale";
const DEFAULT_LOCALE = {
  locale: "en-US",
  englishName: "English (US)",
  displayName: "English (US)",
  rtl: false,
};

const defaultLocaleContext: ILocaleContext = {
  locale: DEFAULT_LOCALE.locale,
  defaultLocale: DEFAULT_LOCALE.locale,
  locales: [DEFAULT_LOCALE],
  setLocale: (locale: string, forceReload?: boolean) => {},
  setDefaultLocale: (locale: string) => {},
};

export const LocaleContext =
  createContext<ILocaleContext>(defaultLocaleContext);

export type LocalizationProviderProps =
  PropsWithChildren<LocalizationProviderConfig>;

export const LocalizationProvider: React.FunctionComponent<
  LocalizationProviderProps
> = (props) => {
  const { children, locales, storage, localeLoader, ...providerProps } = props;

  const [locale, _setLocale] = useState(
    providerProps.locale || defaultLocaleContext.locale
  );
  const [defaultLocale, setDefaultLocale] = useState(
    providerProps.defaultLocale || defaultLocaleContext.locale
  );
  const [messages, setMessages] = useState<IntlConfig["messages"]>(
    providerProps.messages
  );

  const setLocale = useCallback(
    async (locale: string, forceReload?: boolean) => {
      const loc =
        locales.find((l) => l.locale.toLowerCase() === locale.toLowerCase()) ||
        locales.find(
          (l) => l.locale.toLowerCase() === defaultLocale.toLowerCase()
        );

      if (loc) {
        if (storage) {
          storage.setItem(LOCALE_CACHE_KEY, loc.locale);
        }

        if (forceReload) {
          window.location.reload();
        } else if (localeLoader) {
          const localeData = await localeLoader(loc.locale);
          setMessages(localeData);
          _setLocale(loc.locale);

          document.documentElement.lang = loc.locale;
          document.documentElement.dir = loc.rtl ? "rtl" : "ltr";
        } else {
          throw new Error(
            "Attempted to load a locale without registering a localeLoader handler"
          );
        }
      } else {
        throw new Error(`Attempted to set an unregistered locale "${locale}"`);
      }
    },
    [defaultLocale, localeLoader, locales, storage]
  );

  const localeMemo = useMemo<ILocaleContext>(
    () => ({
      locale,
      locales,
      defaultLocale,
      setLocale,
      setDefaultLocale,
    }),
    [defaultLocale, locale, locales, setLocale]
  );

  useEffect(() => {
    if (storage) {
      const cachedLocale = storage.getItem(LOCALE_CACHE_KEY);
      if (cachedLocale) {
        setLocale(cachedLocale);
      } else {
        storage.setItem(LOCALE_CACHE_KEY, locale);
        setLocale(locale);
      }
    } else {
      setLocale(locale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocaleContext.Provider value={localeMemo}>
      <IntlProvider
        {...providerProps}
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
