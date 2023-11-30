import { nextTick } from "vue";
import { createI18n, type I18n, type I18nOptions } from "vue-i18n";

export const SUPPORT_LOCALES = ["en", "vi"];

export function setupI18n(options: I18nOptions = {}) {
  options = {
    messages: {},
    ...options,
  };
  const i18n = createI18n(options);
  // if (options.locale == null || !options.locale.includes(options.locale)) {
  //   throw `Selected is not support. Locale = ${options.locale}`;
  // }
  setI18nLanguage(i18n, options.locale as any);
  return i18n;
}

export function setI18nLanguage(i18n: I18n, locale: string) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector("html")?.setAttribute("lang", locale);
}

export async function loadLocaleMessages(i18n: I18n, locale: string) {
  // load locale messages with dynamic import
  const messages = await import(
    /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
  );

  // set locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default);

  return nextTick();
}

export async function handleChangeLocale(paramsLocale: string | undefined) {
  // use locale if paramsLocale is not in SUPPORT_LOCALES
  if (
    typeof paramsLocale !== "string" ||
    !SUPPORT_LOCALES.includes(paramsLocale)
  ) {
    console.warn(
      `Caughted unsupported locale=${paramsLocale}. Use default locale=en`
    );
    paramsLocale = SUPPORT_LOCALES[0];
  }

  // load locale messages
  if (!i18n.global.availableLocales.includes(paramsLocale)) {
    await loadLocaleMessages(i18n, paramsLocale);
  }

  // set i18n language
  setI18nLanguage(i18n, paramsLocale);
}

export const i18n = setupI18n({ globalInjection: true });
