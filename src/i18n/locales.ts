import { ILocale } from "../components/LocalizationProvider";

export const defaultLocale = "en-US";

export const locales: ILocale[] = [
  {
    locale: "en-US",
    englishName: "English (US)",
    displayName: "English (US)",
    rtl: false,
  },
  {
    locale: "es-ES",
    englishName: "Spanish",
    displayName: "Español",
    rtl: false,
  },
  {
    locale: "fr-FR",
    englishName: "French",
    displayName: "Français",
    rtl: false,
  },
];

export const loadLocaleStrings = async (locale: string) => {
  // Attempt to find the locale in the list of supported locales
  //  otherwise select the default locale
  const language = locales.find(
    (lang) => lang.locale.toLowerCase() === locale.toLowerCase()
  );

  if (language) {
    locale = language.locale;
  } else {
    locale = defaultLocale;
  }

  // The default locale is automatically loaded into the main bundle
  //  no need to load the bundle again
  if (locale.toLowerCase() === defaultLocale.toLowerCase()) {
    return Promise.resolve();
  } else {
    return (await localeBundles[locale]()).default;
  }
};

// So we don't load each import at compile time, we have wrapped these into
// functions to ensure that they load on execution of the function.
// We only want the client to receive the translation files for the language
// that the desktop or browser is in.
export const localeBundles: {
  [index: string]: () => Promise<{ default: any }>;
} = {
  "en-US": () =>
    import(/* webpackChunkName: "en-US" */ "./translated/en-US.json"),
  "es-ES": () =>
    import(/* webpackChunkName: "es-ES" */ "./translated/es-ES.json"),
  "fr-FR": () =>
    import(/* webpackChunkName: "fr-FR" */ "./translated/fr-FR.json"),
};
