import CompressImage500KbContent from '../../../../components/CompressImage500KbContent';

export const metadata = {
  title: 'How do you reduce an image to less than 500KB? A practical guide | Data Lynx Tools',

  description:
    'Learn the best ways to reduce image size to less than 500KB while keeping the image clear, and understand the role of quality, dimensions and file format.',

  keywords: [
    'compress image to 500KB',
    'reduce image size to 500KB',
    'image under 500KB',
    'image compression',
    'reduce JPG size',
    'reduce PNG size',
    'compress images for the prosecution portal',
    'reduce image size online',
  ],

  alternates: {
    canonical:
      'https://tools.datalynx.space/en/articles/compress-image-500kb',
    languages: {
      ar: 'https://tools.datalynx.space/articles/compress-image-500kb',
      en: 'https://tools.datalynx.space/en/articles/compress-image-500kb',
      'x-default':
        'https://tools.datalynx.space/articles/compress-image-500kb',
    },
  },

  openGraph: {
    title: 'How do you reduce an image to less than 500KB?',
    description:
      'A practical guide to understanding image size and reducing it to less than 500KB while keeping the best possible quality.',
    url: 'https://tools.datalynx.space/en/articles/compress-image-500kb',
    siteName: 'Data Lynx Tools',
    type: 'article',
    locale: 'en_US',
  },
};

export default function EnglishCompressImage500KbPage() {
  return <CompressImage500KbContent />;
}
