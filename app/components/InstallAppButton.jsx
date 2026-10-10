'use client';

import React, { useEffect, useRef, useState } from 'react';

import { useLocale } from './LocaleProvider';

function isStandalone() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches === true ||
    window.navigator.standalone === true
  );
}

function supportsIosHomeScreen() {
  const { navigator } = window;

  return (
    'standalone' in navigator ||
    /iPad|iPhone|iPod/.test(navigator.platform) ||
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export default function InstallAppButton() {
  const { t, locale } = useLocale();
  const [promptEvent, setPromptEvent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);
  const installedRef = useRef(false);

  useEffect(() => {
    const iosHomeScreenAvailable = supportsIosHomeScreen();
    const displayMode = window.matchMedia?.('(display-mode: standalone)');

    const syncDisplayMode = () => {
      if (isStandalone() || installedRef.current) {
        setPromptEvent(null);
        setShowIosHint(false);
        setIsVisible(false);
      } else if (iosHomeScreenAvailable) {
        setIsVisible(true);
      }
    };

    const handleBeforeInstallPrompt = (event) => {
      if (isStandalone()) return;

      event.preventDefault();
      setPromptEvent(event);
      setShowIosHint(false);
      setIsVisible(true);
    };

    const handleInstalled = () => {
      installedRef.current = true;
      setPromptEvent(null);
      setShowIosHint(false);
      setIsVisible(false);
    };

    const handlePageVisibility = () => {
      if (document.visibilityState === 'visible') syncDisplayMode();
    };

    syncDisplayMode();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    window.addEventListener('pageshow', syncDisplayMode);
    document.addEventListener('visibilitychange', handlePageVisibility);
    displayMode?.addEventListener('change', syncDisplayMode);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleInstalled);
      window.removeEventListener('pageshow', syncDisplayMode);
      document.removeEventListener('visibilitychange', handlePageVisibility);
      displayMode?.removeEventListener('change', syncDisplayMode);
    };
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;

    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;

      if (choice.outcome === 'accepted') {
        installedRef.current = true;
      }

      setIsVisible(false);
    } catch (error) {
      console.error('The browser installation prompt failed.', error);
      setIsVisible(false);
    } finally {
      setPromptEvent(null);
    }
  };

  const handleClick = () => {
    if (promptEvent) {
      void handleInstall();
      return;
    }

    setShowIosHint((isOpen) => !isOpen);
  };

  if (!isVisible) return null;

  const isHintOpen = showIosHint && !promptEvent;

  return (
    <div
      className="fixed z-40"
      style={{
        left: 'max(1rem, env(safe-area-inset-left))',
        bottom: 'calc(1rem + env(safe-area-inset-bottom))',
      }}
      dir={locale === 'en' ? 'ltr' : 'rtl'}
    >
      <span id="install-app-description" className="sr-only">
        {t('install.description')}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleClick}
          aria-label={t('install.button')}
          aria-describedby="install-app-description"
          aria-expanded={isHintOpen}
          aria-controls={isHintOpen ? 'install-app-hint' : undefined}
          title={t('install.description')}
          className="flex size-12 items-center justify-center rounded-full border border-datalynx-primary/50 bg-slate-950 text-datalynx-primary shadow-lg transition duration-200 hover:scale-105 hover:bg-datalynx-primary hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-datalynx-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 512 512"
            className="size-5"
          >
            <path
              fill="currentColor"
              d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 0 1 0-48z"
            />
          </svg>
        </button>

        <span
          aria-hidden="true"
          className="rounded-full border border-datalynx-primary/30 bg-slate-950/95 px-3 py-1.5 text-xs font-bold text-slate-100 shadow-lg"
        >
          {t('install.visibleLabel')}
        </span>
      </div>

      {isHintOpen && (
        <div
          id="install-app-hint"
          role="region"
          aria-labelledby="install-app-hint-title"
          className="absolute bottom-full left-0 mb-3 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-4 text-start text-slate-700 shadow-2xl"
        >
          <p
            id="install-app-hint-title"
            className="mb-2 text-sm font-bold text-datalynx-dark"
          >
            {t('install.howToTitle')}
          </p>

          <ol className="list-inside list-decimal space-y-1 text-xs leading-6 text-slate-600">
            <li>{t('install.iosStep1')}</li>
            <li>{t('install.iosStep2')}</li>
            <li>{t('install.iosStep3')}</li>
          </ol>

          <button
            type="button"
            onClick={() => setShowIosHint(false)}
            className="mt-3 text-xs font-bold text-datalynx-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-datalynx-primary"
          >
            {t('install.closeInstructions')}
          </button>
        </div>
      )}
    </div>
  );
}
