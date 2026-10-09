import ArticlesIndexContent from '../../../components/ArticlesIndexContent';

export const metadata = {
  title: 'Knowledge Center | Data Lynx Tools',

  description:
    'Practical guides and articles about image compression, image format conversion, PDF compression, creating ICO files, and preparing files for specific size limits using Data Lynx Tools.',

  keywords: [
    'knowledge center',
    'image compression',
    'image conversion',
    'pdf compression',
    'ICO',
    'favicon',
    '500KB',
    'Data Lynx Tools',
  ],

  alternates: {
    canonical: 'https://tools.datalynx.space/en/articles',
    languages: {
      ar: 'https://tools.datalynx.space/articles',
      en: 'https://tools.datalynx.space/en/articles',
      'x-default': 'https://tools.datalynx.space/articles',
    },
  },

  openGraph: {
    title: 'Knowledge Center | Data Lynx Tools',
    description:
      'Practical guides and articles about handling images and PDF files, converting formats and reducing file sizes.',
    url: 'https://tools.datalynx.space/en/articles',
    siteName: 'Data Lynx Tools',
    type: 'website',
    locale: 'en_US',
  },
};

export default function EnglishArticlesPage() {
  return <ArticlesIndexContent />;
}
