/*
 * English content for the "compress images, convert formats and compress
 * PDF files online" guide.
 *
 * This is a real English translation of the published Arabic guide at
 * /articles/image-pdf-compression-tools. The structure mirrors the
 * original section order exactly.
 */

export const tocItems = [
  { id: 'what-is-datalynx-tools', title: 'What is Data Lynx Tools?' },
  { id: 'image-compression', title: 'Compressing images online' },
  { id: 'image-conversion', title: 'Converting image formats' },
  { id: 'ico', title: 'Converting images to ICO and creating favicons' },
  { id: 'pdf-compression', title: 'Compressing PDF files' },
  { id: 'prosecution', title: 'Preparing files for under 500KB' },
  { id: 'privacy', title: 'Why processing happens inside the browser' },
  { id: 'choose-tool', title: 'How do you choose the right tool?' },
  { id: 'faq', title: 'Frequently asked questions' },
];

export const relatedTools = [
  {
    href: '/#image-compression',
    title: 'Image compression',
    description:
      'Reduce image size with control over quality, dimensions and the output format.',
    className: 'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40',
    iconClass: 'bg-blue-500/10 text-blue-400',
  },
  {
    href: '/#format-converter',
    title: 'Format conversion',
    description:
      'Convert images between a wide range of formats and build ICO packages.',
    className: 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40',
    iconClass: 'bg-emerald-500/10 text-emerald-400',
  },
  {
    href: '/#pdf-compression',
    title: 'PDF compression',
    description:
      'Reduce the size of PDF files with different modes for text and scanned documents.',
    className: 'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40',
    iconClass: 'bg-rose-500/10 text-rose-400',
  },
  {
    href: '/#prosecution-portal',
    title: 'Prosecution Portal',
    description:
      'Automatically prepare images and PDF files to reach the limit below 500KB.',
    className: 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40',
    iconClass: 'bg-amber-500/10 text-amber-400',
  },
];

export const imageFormats = [
  'JPG / JPEG',
  'PNG',
  'WebP',
  'GIF',
  'BMP',
  'TIFF / TIF',
  'TGA',
  'AVIF',
  'HEIC / HEIF',
  'ICO',
  'DNG',
  'PSD',
];
export const iconSizes = [
  '16 × 16',
  '24 × 24',
  '32 × 32',
  '48 × 48',
  '64 × 64',
  '128 × 128',
  '256 × 256',
];

export const toolChooser = [
  {
    need: 'The image is large and you want to reduce its size',
    tool: 'Image compression',
  },
  {
    need: 'You need to change the image extension',
    tool: 'Format conversion',
  },
  {
    need: 'You want to create an ICO or favicon',
    tool: 'Format conversion — ICO',
  },
  {
    need: 'The PDF file is large',
    tool: 'PDF compression',
  },
  {
    need: 'You need to reach a limit below 500KB',
    tool: 'Prosecution Portal',
  },
];

export const toolSectionModes = [
  {
    key: 'preserve',
    tone: 'emerald',
    title: 'Preserve the text',
    description:
      'This mode tries to reduce the size without turning the document pages into images. It is suitable when selectable, searchable text is a priority.',
  },
  {
    key: 'visual',
    tone: 'amber',
    title: 'Visual compression',
    description:
      'Pages are redrawn as compressed images and the PDF is rebuilt. This works very well for scanned documents, but it may make the text unselectable if the original file relied on page images.',
  },
  {
    key: 'smart',
    tone: 'blue',
    title: 'Smart compression',
    description:
      'The system tries more than one processing route and then picks the smallest result according to the settings in use.',
  },
];

export const faqItems = [
  {
    question: 'Does Data Lynx Tools require installing software?',
    answer:
      'No. The tools are designed to work directly from a web browser, with no separate program needed to process your files.',
  },
  {
    question: 'Are images uploaded to a Data Lynx server?',
    answer:
      'The core processing tools are designed so that files are handled inside the user\u2019s browser, instead of uploading the file to a central Data Lynx server for compression or conversion.',
  },
  {
    question:
      'What is the difference between compressing an image and converting its format?',
    answer:
      'Compression focuses on reducing the file size, while format conversion changes the file type itself, such as converting PNG to WebP or JPEG to PNG. The two operations can be combined when needed.',
  },
  {
    question: 'Can an image be converted to ICO?',
    answer:
      'Yes. The format converter provides a dedicated path for creating ICO files in multiple sizes, and it can also create favicon.ico and a ZIP package containing the icons.',
  },
  {
    question: 'Can several files be compressed at once?',
    answer:
      'Yes. The tools support processing a group of files where appropriate, and the results can be downloaded as separate files or as a single ZIP package.',
  },
  {
    question: 'Are all PDF files compressed the same way?',
    answer:
      'No. The compression method depends on the nature of the document. Text PDFs differ from scanned files, which is why the PDF tool offers more than one processing mode.',
  },
  {
    question: 'Can a file be prepared to be under 500KB?',
    answer:
      'Yes, the platform provides a dedicated tool for that. It automatically tries to reach a safe size below the target limit while preserving usable quality as much as possible.',
  },
  {
    question:
      'Is the Prosecution Portal tool affiliated with the public prosecution?',
    answer:
      'No. The name describes a use case for preparing files according to the required size limit, and the platform is not an official service affiliated with or representing the public prosecution.',
  },
];

/* Section prose for the guide, keyed by section id. */
export const sectionParagraphs = {
  intro1:
    'Handling images and digital documents has become a normal part of everyday work. A user may need to send an image by email, upload it to an electronic system, convert it to another format, or reduce the size of a large PDF document so it can be shared easily.',
  intro2:
    'The problem is that traditional programs are not always available, and some web services require you to upload files to their servers before processing them. That is where Data Lynx Tools came from: a free space that brings together a set of practical tools that run directly from the browser.',

  whatIs1:
    'Data Lynx Tools is a free platform that provides a set of tools to process images and PDF files directly from a web browser.',
  whatIs2:
    'Instead of switching between several programs and websites, a user can reach image compression, image format conversion, PDF compression and file preparation for specific size limits from a single workspace.',
  whatIs3:
    'The design is based on a simple idea: choose the file, choose the operation, then get the result.',

  compression1:
    'Image size is affected by several factors, including the image dimensions, the number of pixels, the encoding type, the compression quality, and any extra data stored inside the file.',
  compression2:
    'So reducing image size does not necessarily mean sacrificing a lot of quality. In many cases a large difference in size can be achieved by choosing suitable dimensions, a more efficient format, and a balanced compression level.',
  compression3:
    'The image compression tool in Data Lynx Tools provides settings that let you control the compression level, the maximum image dimension, and the output format.',

  conversion1:
    'Sometimes the problem is the image format rather than its size. A user may need to convert a file from PNG to JPG, from JPG to WebP, or use another format that suits a particular system or application.',
  conversion2:
    'That is why the conversion tool supports a wide range of formats, including both common and advanced technical formats.',
  conversion3:
    'Common use cases include converting images for publishing on the web, preparing images for certain systems, or producing files with different extensions from the same original image.',

  ico1:
    'ICO files are commonly used for icons, especially website and application icons and shortcuts on different systems.',
  ico2:
    'Data Lynx Tools therefore does not stop at changing the file extension: it treats ICO as a real icon-creation process at multiple sizes.',
  ico3: 'A user can select several sizes from the same image, such as:',

  pdf1:
    'PDF files differ from images in how they are built. A single file may contain text, fonts, drawings, vectors and scanned images.',
  pdf2:
    'This is why there is no single method that gives the best result for every PDF file.',
  pdf3:
    'If the file contains original text, keeping the text selectable and searchable may matter. If the document is a set of scanned pages, the images are usually the main reason the file became large.',

  prosecution1:
    'Some electronic systems impose a strict limit on file size, so exceeding it causes the upload to be rejected even when the document itself is correct.',
  prosecution2:
    'That is why Data Lynx Tools provides a dedicated route called the Prosecution Portal, focused on one specific use case: automatically preparing an image or PDF file so it falls within the required limit.',
  prosecution3:
    'In this tool the user does not need to understand quality, DPI or image dimensions. All you have to do is choose the file, and the engine tries to reach the target size through several levels of compression.',

  prosecutionNote:
    'Note: the name "Prosecution Portal" describes using the tool to prepare files according to a size limit. It does not mean Data Lynx Tools is an official body affiliated with or representing the public prosecution.',

  privacy1:
    'The core Data Lynx Tools are designed so that files are processed inside the user\u2019s browser. This reduces the need to send files to a central server in order to perform the compression or conversion.',
  privacy2:
    'When you choose a file, it is loaded into the browser environment, then JavaScript and the libraries in use read the data and perform the conversion or compression. After that the output file is created so it can be downloaded to the user\u2019s device.',

  privacyStep1Title: 'Choosing the file',
  privacyStep1Text: 'The user selects the file from their device.',
  privacyStep2Title: 'Processing',
  privacyStep2Text:
    'The compression or conversion happens inside the browser.',
  privacyStep3Title: 'Downloading',
  privacyStep3Text:
    'The result is created and downloaded to the user\u2019s device.',

  conclusion1:
    'Handling images and PDF files does not always require huge programs or complicated steps. In many everyday tasks all that is needed is to compress a file, change a format, reduce dimensions, or prepare a document for a specific size limit.',
  conclusion2:
    'Data Lynx Tools brings these operations together in one place, with a focus on ease of use and local processing inside the browser.',
  conclusion3:
    'Choose the right tool, drop in the file, and let the browser handle the processing.',

  openTools: 'Open Data Lynx Tools',
  privacyCta: 'Privacy Policy',
};
