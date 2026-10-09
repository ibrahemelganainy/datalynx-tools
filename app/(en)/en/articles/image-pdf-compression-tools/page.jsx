import ImagePdfCompressionArticleContent from '../../../../components/ImagePdfCompressionArticleContent';

export const metadata = {
  title:
    'Compress images, convert formats and compress PDF files online | Data Lynx Tools',

  description:
    'A complete guide to using Data Lynx Tools to compress images, change their dimensions, convert their formats, create ICO files and favicons, compress PDF files, and prepare files below 500KB.',

  keywords: [
    'compress images online',
    'reduce image size',
    'image compression',
    'convert image formats',
    'convert JPG to WebP',
    'convert PNG to JPG',
    'convert image to ICO',
    'create favicon',
    'compress PDF',
    'reduce PDF size',
    'compress a PDF file',
    'image under 500KB',
    'compress images for the prosecution portal',
  ],

  alternates: {
    canonical:
      'https://tools.datalynx.space/en/articles/image-pdf-compression-tools',
    languages: {
      ar: 'https://tools.datalynx.space/articles/image-pdf-compression-tools',
      en: 'https://tools.datalynx.space/en/articles/image-pdf-compression-tools',
      'x-default':
        'https://tools.datalynx.space/articles/image-pdf-compression-tools',
    },
  },

  openGraph: {
    title: 'Compress images, convert formats and compress PDF files online',
    description:
      'A practical guide to using Data Lynx Tools to handle images and PDF files and convert their formats.',
    url: 'https://tools.datalynx.space/en/articles/image-pdf-compression-tools',
    siteName: 'Data Lynx Tools',
    type: 'article',
    locale: 'en_US',
  },
};

export default function EnglishImagePdfCompressionArticlePage() {
  return <ImagePdfCompressionArticleContent />;
}