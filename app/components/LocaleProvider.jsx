'use client';

import React, {
  createContext,
  useContext,
  useMemo,
} from 'react';

import {
  DEFAULT_LOCALE,
  getDictionary,
  localePath,
  translate,
} from '../lib/i18n/config';

const LocaleContext = createContext(null);

/**
 * Provides the active locale to the client components.
 *
 * The locale is decided by the route on the server, so the initial HTML
 * already carries the right `lang`/`dir` and the right strings.
 */
export function LocaleProvider({ locale = DEFAULT_LOCALE, children }) {
  const value = useMemo(() => {
    const dictionary = getDictionary(locale);

    return {
      locale,
      dir: locale === 'en' ? 'ltr' : 'rtl',
      dictionary,

      /**
       * Translate a dotted key path.
       */
      t: (path, fallback = '') =>
        translate(dictionary, path, fallback),

      /**
       * Build a link for the active locale.
       */
      href: (path = '') => localePath(locale, path),
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * Reads the active locale values.
 *
 * A safe Arabic default is returned when a component is rendered outside
 * a provider so nothing breaks during an in-flight refactor.
 */
export function useLocale() {
  const context = useContext(LocaleContext);

  if (context) {
    return context;
  }

  const dictionary = getDictionary(DEFAULT_LOCALE);

  return {
    locale: DEFAULT_LOCALE,
    dir: 'rtl',
    dictionary,
    t: (path, fallback = '') => translate(dictionary, path, fallback),
    href: (path = '') => localePath(DEFAULT_LOCALE, path),
  };
}
