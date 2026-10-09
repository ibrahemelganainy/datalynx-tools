import HomeContent from '../../components/HomeContent';

/*
 * English home page at /en.
 *
 * The Arabic site keeps the root URL, so no existing link or search
 * result is affected.
 */
export const metadata = {
  title:
    'Data Lynx Tools - Professional tools to compress images, convert formats and compress PDF files',
  description:
    'A complete platform to compress images, convert image formats (WebP, PNG, JPEG, ICO), compress PDF files and prepare prosecution documents below 500KB in one click, without uploading them to a server.',
  keywords: [
    'compress images online',
    'convert image formats',
    'convert image to ICO',
    'compress PDF files free',
    'prosecution portal compress documents',
    'reduce file size below 500KB',
    'Data Lynx Tools',
  ],
  alternates: {
    canonical: 'https://tools.datalynx.space/en',
    languages: {
      ar: 'https://tools.datalynx.space/',
      en: 'https://tools.datalynx.space/en',
      'x-default': 'https://tools.datalynx.space/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tools.datalynx.space/en',
    title: 'Data Lynx Tools - File and document processing tools',
    description:
      'Fast, smart tools to process images and files locally inside your browser with maximum security and privacy.',
    siteName: 'Data Lynx Tools',
  },
};

export default function EnglishHomePage() {
  return <HomeContent />;
}
