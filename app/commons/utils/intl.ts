import type { Params } from '@remix-run/react';
import { createIntl, createIntlCache } from '@formatjs/intl';
import enUS from '../assets/en.json';

export type Locale = 'en-US';

export const messagesByLocale: Record<Locale, Record<string, string>> = {
  'en-US': enUS,
};

export const locales = Object.keys(messagesByLocale) as ReadonlyArray<Locale>;

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}

export function matchLocale(locale?: string | undefined): Locale {
  return isLocale(locale) ? locale : 'en-US';
}

const cache = createIntlCache();

export function getIntl(locale?: string) {
  const matched = matchLocale(locale);
  const messages = messagesByLocale[matched];
  return createIntl({ locale: matched, messages }, cache);
}

export function loadLocale(params: Params<string>): Locale {
  const lang = matchLocale(params['lang']);
  // if (params['lang'] != null && lang !== params['lang']) {
  //   throw redirect('/');
  // }
  return lang;
}
