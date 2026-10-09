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
  localizedHref,
  toolPath,
  translate,
} from '../lib/i18n/config';

const LocaleContext = createContext(null);

/**
 * يبني قيمة السياق لنفس اللغة، ويُستخدم في المزوّد وكذلك في القيمة
 * الاحتياطية حتى تبقى نفس الواجهة في الحالتين.
 */
function createLocaleValue(locale) {
  const dictionary = getDictionary(locale);

  return {
    locale,
    dir: locale === 'en' ? 'ltr' : 'rtl',
    dictionary,

    /**
     * Translate a dotted key path.
     */
    t: (path, fallback = '') => translate(dictionary, path, fallback),

    /**
     * Build a link for the active locale.
     */
    href: (path = '') => localePath(locale, path),

    /**
     * Locale-aware link builder used by every internal navigation link.
     *
     * This is the single helper that keeps the user inside the current
     * language: English links keep the /en prefix, Arabic keeps the
     * published root URLs, and external links pass through untouched.
     */
    lhref: (to = '') => localizedHref(locale, to),

    /**
     * Path of a standalone tool page in the active locale.
     */
    toolHref: (toolId) => toolPath(locale, toolId),
  };
}

/**
 * Provides the active locale to the client components.
 *
 * The locale is decided by the route on the server, so the initial HTML
 * already carries the right `lang`/`dir` and the right strings.
 */
export function LocaleProvider({ locale = DEFAULT_LOCALE, children }) {
  const value = useMemo(() => createLocaleValue(locale), [locale]);

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

  return createLocaleValue(DEFAULT_LOCALE);
}
