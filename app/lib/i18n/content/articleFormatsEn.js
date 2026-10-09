/*
 * English translation of the published guide
 * /articles/jpg-vs-webp-vs-png-avif.
 *
 * The English route uses the natural slug /en/articles/image-format-comparison
 * and is mapped to the Arabic page in app/lib/i18n/articles.js.
 */

export const toc = [
  { id: 'intro', title: 'Why are there so many image formats?' },
  { id: 'jpg', title: 'When should you use JPG?' },
  { id: 'png', title: 'When should you use PNG?' },
  { id: 'webp', title: 'When should you use WebP?' },
  { id: 'avif', title: 'When should you use AVIF?' },
  { id: 'gif', title: 'When should you use GIF?' },
  { id: 'tiff', title: 'When should you use TIFF?' },
  { id: 'ico', title: 'What is ICO for?' },
  { id: 'comparison', title: 'A quick comparison between formats' },
  { id: 'choose', title: 'How do you choose the right format?' },
  { id: 'faq', title: 'Frequently asked questions' },
];

export const formats = [
  {
    name: 'JPG / JPEG',
    best: 'Photographs and colour images',
    strength: 'Widely supported, with a suitable size in many cases',
    weakness:
      'Lossy compression, and it does not support transparency the way PNG does',
    className: 'border-blue-500/20 bg-blue-500/5',
  },
  {
    name: 'PNG',
    best: 'Transparency, graphics, and images that must keep their detail',
    strength: 'Supports transparency and uses lossless compression',
    weakness: 'Can produce large files for photographs',
    className: 'border-emerald-500/20 bg-emerald-500/5',
  },
  {
    name: 'WebP',
    best: 'The web, and uses that need a balance between size and quality',
    strength: 'Offers good compression options for modern web use',
    weakness: 'Some older systems may need it converted to another format',
    className: 'border-violet-500/20 bg-violet-500/5',
  },
  {
    name: 'AVIF',
    best: 'Cases where compression efficiency is the priority',
    strength: 'A modern format aimed at high compression efficiency',
    weakness: 'Support and encoding vary by environment and browser',
    className: 'border-amber-500/20 bg-amber-500/5',
  },
];

export const chooseGuide = [
  {
    title: 'A photograph',
    answer:
      'Usually start with JPG or WebP, then compare size and quality for your use case.',
  },
  {
    title: 'An image that needs transparency',
    answer:
      'PNG or WebP may be suitable depending on the project and the support of the target environment.',
  },
  {
    title: 'An image for publishing on the web',
    answer:
      'WebP or AVIF are two modern options to consider when size efficiency matters.',
  },
  {
    title: 'An icon or favicon',
    answer:
      'Use ICO when you need an icon file, and several sizes can be created from the same image.',
  },
  {
    title: 'A professional or print image',
    answer:
      'TIFF or another professional format may be more suitable depending on the workflow in use.',
  },
];

export const faq = [
  {
    question: 'Is WebP always better than JPG?',
    answer:
      'Not necessarily. WebP is an excellent option in many modern use cases, but JPG remains a practical and widely supported choice and can be the best fit when you need broad compatibility with different systems.',
  },
  {
    question: 'When should I use PNG instead of JPG?',
    answer:
      'PNG is suitable when you need transparency, or when the image is graphics or visual elements that benefit from lossless compression.',
  },
  {
    question: 'Is AVIF always the best?',
    answer:
      'No. Choosing a format depends on the use case, the target environment, its support for the format, and how much file size and image quality matter.',
  },
  {
    question: 'What is the best format for a website?',
    answer:
      'In many cases WebP or AVIF are suitable choices for the web, while the final decision depends on the target browsers and systems and the nature of the images.',
  },
  {
    question: 'What format suits icons?',
    answer:
      'ICO is made for icons, especially favicon use cases, Windows icons and some shortcuts.',
  },
];

export const iconSizes = [
  '16×16',
  '24×24',
  '32×32',
  '48×48',
  '64×64',
  '128×128',
  '256×256',
];

export const paragraphs = {
  intro:
    'When you save an image on your device, choosing the extension is not just a name at the end of the file. Every format uses a different way of storing and compressing the image, and that can affect the file size, its quality, its transparency and how well it works with programs and browsers.',

  why1:
    'There is no single perfect format for every kind of image. A photograph is different from a logo, a logo is different from a scanned document, and an icon is different from all of them.',
  why2:
    'That is why multiple formats appeared, each with different characteristics related to size, quality, transparency, animation and compatibility with programs and systems.',

  jpg1:
    'JPG, or JPEG, is one of the most widespread image formats, especially for photographs and images containing a large number of colours and gradients.',
  jpg2:
    'JPEG relies on lossy compression, meaning that reaching a smaller size may require discarding part of the image data.',
  jpg3:
    'This makes JPG a practical choice when size and broad compatibility matter more than preserving all the original image data.',

  png1:
    'PNG is particularly suitable when you need transparency, or when the image is graphics, interfaces or elements that contain clear areas and fine lines.',
  png2:
    'PNG uses lossless compression, so detail can be preserved without introducing the usual lossy compression artefacts found in JPEG.',
  png3:
    'That does not mean it is always smaller, especially when the image is photographic and highly colourful.',

  webp1:
    'WebP was designed with web use in mind, and it offers a modern way of handling image size while supporting multiple use cases.',
  webp2:
    'WebP can be a good choice when you want to publish images on a website and reduce download size while keeping a good appearance.',
  webp3:
    'That is why Data Lynx Tools offers WebP as one of the main output options in its compression and conversion tools.',

  avif1:
    'AVIF is a modern format focused on compression efficiency, which can make it an attractive option when reducing image size matters.',
  avif2:
    'But choosing it should also depend on the environment where the image will be used, because the level of support for reading and encoding may vary by browser and by the programs in use.',

  avifTip:
    'Do not choose the newest format just because it is the newest. Choose what suits the actual use of your users and the systems that will handle the file.',

  gif1:
    'GIF is known for its use in simple animated images and limited-colour graphics.',
  gif2:
    'However it is not an ideal choice for modern photographs or images that contain a large number of colours and gradients.',

  tiff1:
    'TIFF is used a lot in print, scanning and professional image work, where quality and the original data matter more than a small file size.',
  tiff2:
    'So TIFF is usually not the first choice for publishing images on the web, but it can be very important as an input or output format in professional environments.',

  ico1:
    'ICO is not just another format for ordinary images: it is used mainly for icons.',
  ico2:
    'Its most common uses are favicon files, Windows icons, and some application and website shortcuts.',
  ico3:
    'That is why a single image may need more than one size inside the same icon package, such as 16×16, 32×32, 48×48 and 256×256.',

  ctaTitle: 'Not sure which format to choose?',
  ctaText:
    'Try more than one format on the same image and compare the size and the result visually. Data Lynx Tools provides a tool to convert images between a wide range of formats directly from the browser.',
  ctaButton: 'Try the image converter',
  convertNow: 'Convert an image now',
};
