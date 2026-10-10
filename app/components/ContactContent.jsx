'use client';

import React, { useCallback, useMemo, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faPaperPlane,
  faCircleCheck,
  faTriangleExclamation,
  faCopy,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

import Navbar from './Navbar';
import Footer from './Footer';

import { useLocale } from './LocaleProvider';

/*
 * صفحة "اتصل بنا" في اللغتين.
 *
 * التصميم مأخوذ من نظام الموقع الحالي بالكامل (نفس الخلفية والشبكة
 * والإضاءة والبطاقات الزجاجية وrounded-3xl والحدود slate-800)، مع
 * الحفاظ على التركيبة المطلوبة:
 *
 *   - عنوان ووصف في المنتصف
 *   - عمودان على الشاشات الكبيرة: بطاقات التواصل + النموذج
 *   - عمود واحد على الجوال
 *
 * الأيقونات كلها من حزمة Font Awesome المستخدمة بالفعل في الموقع،
 * فلم تُضف أي مكتبة جديدة.
 */

/* رقم واتساب مؤكد من الفوتر: +20 150 707 1671 */
const WHATSAPP_NUMBER = '201507071671';

/* البريد الإلكتروني المؤكد من الفوتر وصفحة الخصوصية. */
const CONTACT_EMAIL = 'lexoffice.datalynx@proton.me';

const INQUIRY_KEYS = [
  'general',
  'imageCompression',
  'formatConverter',
  'pdfCompression',
  'prosecutionPortal',
  'technical',
  'feedback',
  'other',
];

export default function ContactContent({ lang = 'ar' }) {
  const { t } = useLocale();

  const isEnglish = lang === 'en';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [preparedUrl, setPreparedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const inquiryOptions = useMemo(
    () =>
      INQUIRY_KEYS.map((key) => ({
        key,
        label: t(`contact.inquiryOptions.${key}`),
      })),
    [t]
  );

  const updateField = useCallback((field, value) => {
    setForm((current) => ({ ...current, [field]: value }));

    /* إزالة خطأ الحقل فور تصحيحه. */
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];

      return next;
    });
  }, []);

  /**
   * يبني رسالة واتساب المنسقة من البيانات المُتحقق منها.
   */
  const buildMessage = useCallback(() => {
    const labels = t('contact.messageLabels');

    const lines = [
      labels.heading,
      '',
      `${labels.name}: ${form.name}`,
      `${labels.phone}: ${form.phone}`,
    ];

    if (form.email) {
      lines.push(`${labels.email}: ${form.email}`);
    }

    lines.push(
      `${labels.inquiry}: ${t(`contact.inquiryOptions.${form.inquiry}`)}`,
      '',
      `${labels.message}:`,
      form.message
    );

    return lines.join('\n');
  }, [form, t]);

  /**
   * يتحقق من الحقول المطلوبة ويعيد كائن الأخطاء.
   */
  const validate = useCallback(() => {
    const next = {};

    if (!form.name.trim()) {
      next.name = t('contact.errorName');
    }

    /*
     * الرقم مطلوب، ويُقبل بصيغة دولية أو محلية مع مسافات وشرطات
     * وأقواس. نتحقق من وجود 7 أرقام على الأقل بعد إزالة التنسيق.
     */
    const digits = form.phone.replace(/\D/g, '');

    if (!form.phone.trim() || digits.length < 7) {
      next.phone = t('contact.errorPhone');
    }

    if (!form.inquiry) {
      next.inquiry = t('contact.errorInquiry');
    }

    if (!form.message.trim()) {
      next.message = t('contact.errorMessage');
    }

    return next;
  }, [form, t]);

  /**
   * إرسال النموذج.
   *
   * لا يوجد خادم: الرسالة تُجهَّز وتُفتح في واتساب عبر تفاعل مباشر من
   * المستخدم. وأهم قرار تقني هنا أننا لا نؤجل window.open:
   *
   * كان النمط الشائع هو setTimeout ثم window.open، وهو ما تحجبه
   * المتصفحات لأن النافذة لا تُعد ناتجة عن تفاعل مباشر بعد انتهاء
   * المهلة. لذلك:
   *
   *   1. نتحقق أولًا.
   *   2. نبني الرابط.
   *   3. نستدعي window.open فورًا داخل نفس معالج الحدث، فتبقى النقرة
   *      هي ما يفتح النافذة ولا يحجبه المتصفح.
   *   4. إذا أُرجع null (نافذة محجوبة/فاشلة) نُظهر حالة احتياطية
   *      صادقة فيها زر ظاهر لفتح واتساب وزر لنسخ الرسالة.
   *
   * ولا تظهر أي رسالة تفيد بأن الطلب أُرسل إلى Data Lynx: النص
   * يوضح أن الرسالة جاهزة للإرسال عبر واتساب.
   */
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const validationErrors = validate();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setStatus('idle');

        return;
      }

      setErrors({});

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        buildMessage()
      )}`;

      setPreparedUrl(url);

      /* الفتح الفوري داخل معالج الحدث نفسه. */
      const opened =
        typeof window !== 'undefined' ? window.open(url, '_blank') : null;

      setStatus(opened ? 'success' : 'fallback');
    },
    [buildMessage, validate]
  );

  const handleReset = useCallback(() => {
    setForm({ name: '', phone: '', email: '', inquiry: '', message: '' });
    setErrors({});
    setStatus('idle');
    setPreparedUrl('');
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildMessage());
      setCopied(true);
    } catch {
      /*
       * Clipboard API غير متاحة أو مرفوضة: لا نُظهر نجاحًا كاذبًا.
       * يبقى زر الفتح المباشر متاحًا، ويمكن للمستخدم تحديد النص
       * يدويًا.
       */
      setCopied(false);
    }
  }, [buildMessage]);

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder:text-slate-500 outline-none transition-colors focus:ring-2 focus:ring-datalynx-primary/40 ${
      errors[field]
        ? 'border-rose-500/60'
        : 'border-slate-800 focus:border-datalynx-primary/60'
    }`;

  return (
    <div
      className="min-h-screen text-slate-100 font-sans"
      lang={lang}
      dir={isEnglish ? 'ltr' : 'rtl'}
    >
      <Navbar />

      <main className="pt-32 pb-20">
        <section className="relative overflow-hidden">
          {/* خلفية الصفحة: نفس الشبكة والإضاءة المستخدمة في الموقع */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-datalynx-primary/10 blur-[150px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
          </div>

          <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
            {/* العنوان المقدمة */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-datalynx-primary/10 border border-datalynx-primary/20 text-datalynx-primary text-sm font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-datalynx-primary" />
                {t('contact.badge')}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
                {t('contact.titleLine1')}{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-datalynx-primary">
                  {t('contact.titleLine2')}
                </span>
              </h1>

              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                {t('contact.description')}
              </p>
            </div>

            {/* عمودان: بيانات التواصل + النموذج */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* بطاقات التواصل */}
              <div className="lg:col-span-2">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 h-full">
                  <h2 className="text-xl font-black text-white mb-2">
                    {t('contact.infoTitle')}
                  </h2>

                  <p className="text-sm text-white/80 leading-relaxed mb-6">
                    {t('contact.infoDescription')}
                  </p>

                  <div className="space-y-4">
                    {/* واتساب */}
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t('contact.whatsappLabel')}: ${
                        t('contact.whatsappValue')
                      }`}
                      className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all"
                    >
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                        <FontAwesomeIcon icon={faWhatsapp} />
                      </div>

                      <div className="min-w-0">
                        <span className="block font-bold text-white">
                          {t('contact.whatsappLabel')}
                        </span>

                        <span
                          className="block text-sm text-white/80 mb-1"
                          dir="ltr"
                        >
                          {t('contact.whatsappValue')}
                        </span>

                        <span className="text-xs font-bold text-emerald-400 group-hover:underline">
                          {t('contact.whatsappCta')}
                        </span>
                      </div>
                    </a>

                    {/* البريد الإلكتروني */}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      aria-label={`${t('contact.emailLabel')}: ${
                        t('contact.emailValue')
                      }`}
                      className="group flex items-start gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-datalynx-primary/50 transition-all"
                    >
                      <div className="w-11 h-11 rounded-xl bg-datalynx-primary/10 text-datalynx-primary flex items-center justify-center shrink-0">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>

                      <div className="min-w-0">
                        <span className="block font-bold text-white">
                          {t('contact.emailLabel')}
                        </span>

                        <span
                          className="block text-sm text-white/80 mb-1 break-all"
                          dir="ltr"
                        >
                          {t('contact.emailValue')}
                        </span>

                        <span className="text-xs font-bold text-datalynx-primary group-hover:underline">
                          {t('contact.emailCta')}
                        </span>
                      </div>
                    </a>
                  </div>

                  <p className="mt-6 text-xs text-white/70 leading-relaxed">
                    {t('contact.privacyNote')}
                  </p>
                </div>
              </div>

              {/* النموذج */}
              <div className="lg:col-span-3">
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
                  <h2 className="text-xl font-black text-white mb-2">
                    {t('contact.formTitle')}
                  </h2>

                  <p className="text-sm text-white/80 leading-relaxed mb-6">
                    {t('contact.formDescription')}{' '}
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* الاسم */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-bold text-white mb-2"
                        >
                          {t('contact.nameLabel')}{' '}
                          <span aria-hidden="true">*</span>
                        </label>

                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder={t('contact.namePlaceholder')}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={
                            errors.name ? 'contact-name-error' : undefined
                          }
                          className={inputClass('name')}
                        />

                        {errors.name && (
                          <p
                            id="contact-name-error"
                            role="alert"
                            className="mt-2 text-xs text-rose-400"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* الهاتف */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-sm font-bold text-white mb-2"
                        >
                          {t('contact.phoneLabel')}{' '}
                          <span aria-hidden="true">*</span>
                        </label>

                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          required
                          dir="ltr"
                          value={form.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder={t('contact.phonePlaceholder')}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={
                            errors.phone ? 'contact-phone-error' : undefined
                          }
                          className={inputClass('phone')}
                        />

                        {errors.phone && (
                          <p
                            id="contact-phone-error"
                            role="alert"
                            className="mt-2 text-xs text-rose-400"
                          >
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* البريد (اختياري) */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-bold text-white mb-2"
                        >
                          {t('contact.emailFormLabel')}
                        </label>

                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          dir="ltr"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder={t('contact.emailFormPlaceholder')}
                          className={inputClass('email')}
                        />
                      </div>

                      {/* نوع الاستفسار */}
                      <div>
                        <label
                          htmlFor="contact-inquiry"
                          className="block text-sm font-bold text-white mb-2"
                        >
                          {t('contact.inquiryLabel')}{' '}
                          <span aria-hidden="true">*</span>
                        </label>

                        <select
                          id="contact-inquiry"
                          name="inquiry"
                          required
                          value={form.inquiry}
                          onChange={(e) =>
                            updateField('inquiry', e.target.value)
                          }
                          aria-invalid={Boolean(errors.inquiry)}
                          aria-describedby={
                            errors.inquiry ? 'contact-inquiry-error' : undefined
                          }
                          className={inputClass('inquiry')}
                        >
                          <option value="">
                            {t('contact.inquiryPlaceholder')}
                          </option>

                          {inquiryOptions.map((option) => (
                            <option key={option.key} value={option.key}>
                              {option.label}
                            </option>
                          ))}
                        </select>

                        {errors.inquiry && (
                          <p
                            id="contact-inquiry-error"
                            role="alert"
                            className="mt-2 text-xs text-rose-400"
                          >
                            {errors.inquiry}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* تفاصيل الرسالة */}
                    <div className="mt-4">
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-bold text-white mb-2"
                      >
                        {t('contact.messageLabel')}{' '}
                        <span aria-hidden="true">*</span>
                      </label>

                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder={t('contact.messagePlaceholder')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={
                          errors.message ? 'contact-message-error' : undefined
                        }
                        className={`${inputClass('message')} resize-y`}
                      />

                      {errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="mt-2 text-xs text-rose-400"
                        >
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <p className="mt-4 text-xs text-white/70">
                      {t('contact.requiredHint')}
                    </p>

                    <button
                      type="submit"
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-datalynx-primary hover:bg-blue-600 text-white font-bold transition-all shadow-md cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                      {t('contact.submit')}
                    </button>
                  </form>

                  {/* الحالة: نجاح أو احتياطي صادق */}
                  <div aria-live="polite">
                    {status === 'success' && (
                      <div className="mt-6 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                        <h3 className="flex items-center gap-2 font-bold text-white mb-2">
                          <FontAwesomeIcon
                            icon={faCircleCheck}
                            className="text-emerald-400"
                          />
                          {t('contact.successTitle')}
                        </h3>

                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                          {t('contact.successBody')}
                        </p>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="text-sm font-bold text-datalynx-primary hover:underline cursor-pointer"
                        >
                          {t('contact.sendAnother')}
                        </button>
                      </div>
                    )}

                    {status === 'fallback' && (
                      <div className="mt-6 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                        <h3 className="flex items-center gap-2 font-bold text-white mb-2">
                          <FontAwesomeIcon
                            icon={faTriangleExclamation}
                            className="text-amber-400"
                          />
                          {t('contact.fallbackTitle')}
                        </h3>

                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                          {t('contact.fallbackBody')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href={preparedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-500/25 transition-all cursor-pointer"
                          >
                            <FontAwesomeIcon icon={faWhatsapp} />
                            {t('contact.fallbackButton')}
                          </a>

                          <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
                          >
                            <FontAwesomeIcon
                              icon={copied ? faCheck : faCopy}
                            />
                            {copied
                              ? t('contact.copiedButton')
                              : t('contact.copyButton')}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
