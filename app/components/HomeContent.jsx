'use client';

import React, { useEffect, useState } from 'react';

import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import PrivacySection from './PrivacySection';
import Footer from './Footer';
import Workspace from './Workspace';

import { useLocale } from './LocaleProvider';

const VALID_TOOLS = new Set([
  'image-compression',
  'format-converter',
  'pdf-compression',
  'prosecution-portal',
]);

function getToolFromHash() {
  if (typeof window === 'undefined') {
    return null;
  }

  const hash = window.location.hash.replace('#', '');

  return VALID_TOOLS.has(hash) ? hash : null;
}

function scrollToWorkspace(behavior) {
  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      document
        .getElementById('workspace')
        ?.scrollIntoView({
          behavior,
          block: 'start',
        });
    }, 50);
  });
}

export default function HomeContent() {
  const { dir } = useLocale();

  const [activeTool, setActiveTool] = useState(null);

  /*
   * تحديد الأداة من الـURL عند فتح الصفحة.
   *
   * مثال:
   * tools.datalynx.space/#image-compression
   *
   * سيتم فتح أداة ضغط الصور مباشرة.
   */
  useEffect(() => {
    const initialTool = getToolFromHash();

    if (initialTool) {
      setActiveTool(initialTool);

      /*
       * بعد ظهور Workspace في الـDOM نقوم بالنزول إليه.
       */
      scrollToWorkspace('auto');
    }
  }, []);

  /*
   * الاستماع إلى:
   *
   * - Hash changes
   * - Back / Forward
   *
   * حتى يصبح الـURL متزامنًا دائمًا مع الأداة.
   */
  useEffect(() => {
    const handleLocationChange = () => {
      const tool = getToolFromHash();

      setActiveTool(tool);

      if (tool) {
        scrollToWorkspace('smooth');
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  /*
   * اختيار أداة من Hero أو Workspace.
   *
   * نستخدم pushState حتى يكون بإمكان المستخدم الرجوع
   * بين الأدوات باستخدام Back في المتصفح.
   */
  const handleSelectTool = (toolId) => {
    if (!VALID_TOOLS.has(toolId)) {
      return;
    }

    setActiveTool(toolId);

    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}#${toolId}`;

      window.history.pushState({ tool: toolId }, '', newUrl);

      /*
       * لا ننتظر hashchange لأن pushState لا يطلق
       * حدث hashchange تلقائيًا.
       */
      scrollToWorkspace('smooth');
    }
  };

  /*
   * العودة إلى Hero.
   *
   * نزيل الـhash بدون إضافة entry جديد إلى History.
   */
  const handleBack = () => {
    setActiveTool(null);

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="min-h-screen text-slate-100 font-sans"
      dir={dir}
    >
      <Navbar activeTool={activeTool} />

      <main>
        {activeTool === null ? (
          <Hero onSelectTool={handleSelectTool} />
        ) : (
          <div id="workspace">
            <Workspace
              activeTool={activeTool}
              onBack={handleBack}
              onSelectTool={handleSelectTool}
            />
          </div>
        )}

        <Features />
        <PrivacySection />
      </main>

      <Footer />
    </div>
  );
}
