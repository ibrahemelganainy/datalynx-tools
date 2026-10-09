import ImageFormatComparisonContent from '../../../../components/ImageFormatComparisonContent';

/*
 * The English route uses the natural slug /en/articles/image-format-comparison
 * and maps back to the published Arabic page
 * /articles/jpg-vs-webp-vs-png-avif through app/lib/i18n/articles.js.
 */
export const metadata = {
  title: 'JPG or PNG or WebP or AVIF? A guide to choosing the right image format | Data Lynx Tools',

  description:
    'Learn the difference between JPG, PNG, WebP, AVIF, GIF, TIFF and ICO, when to use each format, and how to choose the right one for size, quality and the web.',

  keywords: [
    'JPG or WebP',
    'PNG or WebP',
    'AVIF or WebP',
    'best image format',
    'best format for the web',
    'difference between JPG and PNG',
    'difference between WebP and JPG',
    'convert JPG to WebP',
    'convert PNG to JPG',
    'convert images',
    'ICO',
  ],

  alternates: {
    canonical:
      'https://tools.datalynx.space/en/articles/image-format-comparison',
    languages: {
      ar: 'https://tools.datalynx.space/articles/jpg-vs-webp-vs-png-avif',
      en: 'https://tools.datalynx.space/en/articles/image-format-comparison',
      'x-default':
        'https://tools.datalynx.space/articles/jpg-vs-webp-vs-png-avif',
    },
  },

  openGraph: {
    title: 'JPG or PNG or WebP or AVIF?',
    description:
      'A practical guide to choosing the right image format based on quality, size and use.',
    url: 'https://tools.datalynx.space/en/articles/image-format-comparison',
    siteName: 'Data Lynx Tools',
    type: 'article',
    locale: 'en_US',
  },
};

export default function EnglishImageFormatComparisonPage() {
  return <ImageFormatComparisonContent />;
}
