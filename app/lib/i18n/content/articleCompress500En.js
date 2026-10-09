/*
 * English translation of the published guide
 * /articles/compress-image-500kb.
 *
 * Section order mirrors the Arabic original.
 */

export const toc = [
  { id: 'introduction', title: 'Why does an image become large?' },
  { id: 'size-factors', title: 'What determines image size?' },
  { id: 'compression', title: 'What does image compression mean?' },
  { id: 'dimensions', title: 'The role of image dimensions' },
  { id: 'format', title: 'Choosing the image format' },
  { id: '500kb', title: 'How do I get below 500KB?' },
  { id: 'prosecution', title: 'Preparing images for strict limits' },
  { id: 'quality', title: 'How do I keep the document clear?' },
  { id: 'faq', title: 'Frequently asked questions' },
];

export const sizeFactors = [
  {
    title: 'Image dimensions',
    text: 'The number of pixels in width and height directly affects how much data has to be processed.',
  },
  {
    title: 'File format',
    text: 'JPEG, WebP, PNG and others use different ways of representing and compressing the image.',
  },
  {
    title: 'Quality level',
    text: 'In lossy formats, lowering quality usually reduces the size at the cost of some detail.',
  },
  {
    title: 'Image content',
    text: 'Images with a lot of detail or noise can be harder to compress than simple graphics.',
  },
];

export const fiveHundredKbSteps = [
  'Start by deciding the target size.',
  'Choose a format that suits the image.',
  'Reduce the dimensions if they are larger than the use case requires.',
  'Adjust quality gradually instead of dropping it to the lowest value immediately.',
  'Check the final file size before uploading it.',
];

export const faq = [
  {
    question: 'Can any image be made smaller than 500KB?',
    answer:
      'The size of most images can usually be reduced substantially, but reaching a very small size may require lowering the dimensions or the quality to a degree that affects detail. So look for the best balance instead of reducing the size by any means.',
  },
  {
    question: 'Is reducing image dimensions better than lowering quality?',
    answer:
      'That depends on the use case. In many situations reducing the dimensions lowers the size noticeably while keeping good visual quality, whereas lowering quality sharply can produce visible artefacts.',
  },
  {
    question: 'What is the best format for reaching a small size?',
    answer:
      'There is no single perfect format for every image. JPEG suits many photographs, WebP can offer a good balance for the web, while PNG is better suited to images that need transparency or that must keep detail without lossy compression.',
  },
  {
    question: 'Is an image under 500KB always clear?',
    answer:
      'Not necessarily. Size alone does not guarantee quality. The quality of the result depends on the image dimensions, its type, its content and the compression level used.',
  },
  {
    question: 'Are images processed on a server inside Data Lynx Tools?',
    answer:
      'The core file processing tools are designed to process files inside the user\u2019s browser, so there is no need to upload the image to a Data Lynx server for compression.',
  },
];

export const paragraphs = {
  intro1:
    'An image may look simple to the user, but technically it can contain millions of pixels, colour information and extra data that make the file much larger than the actual use case requires.',
  intro2:
    'That is why you may find a single image several megabytes in size even though you do not need that resolution when uploading it to an electronic platform or sending it by email.',

  why1:
    'There are several reasons an image can be large. The first is the image dimensions themselves. A high-resolution image contains a very large number of pixels, and the more pixels there are the more data has to be stored in the file.',
  why2:
    'The file format and the way it compresses data also affect the size. Some images may additionally contain extra data such as camera information, location or shooting settings.',
  why3:
    'So effective size reduction starts with understanding the real cause of the file size instead of relying on lowering quality at random.',

  compression1:
    'Compressing an image means reducing the data needed to store the image in a smaller file.',
  compression2:
    'There are different compression methods. Some preserve the data completely, while others allow part of the visible or invisible information to be discarded in order to reach a smaller size.',
  compression3:
    'For everyday use, what matters is reaching a result that looks clear to the user and meets the required size at the same time.',

  dimensions1:
    'Imagine an image 4000 pixels wide and 3000 pixels high. This image contains an enormous number of pixels, but the upload platform or the phone screen may not need all of that detail.',
  dimensions2:
    'When we reduce the largest dimension of the image to a suitable value, the number of pixels is reduced and the size can therefore drop noticeably.',
  dimensions3:
    'It is usually better to preserve the aspect ratio so that the image does not look stretched or visually squeezed.',

  dimensionsTipTitle: 'A practical rule',
  dimensionsTipText:
    'Do not always start by dropping quality to the minimum. First try dimensions that suit the actual use case, then adjust the compression level if needed.',

  format1:
    'Choosing the format is an essential part of reducing size, because the right format depends on the nature of the image and on where it will be used.',
  format2:
    'JPEG is very common for photographs, while PNG is suitable when transparency, or preserving the original data, matters more.',
  format3:
    'WebP is a modern option that is useful in many web use cases, while AVIF can be suitable when compression efficiency is a priority and the target system supports it.',

  kb1:
    'When a specific size is required, such as under 500KB, using one fixed compression setting does not suit every image.',
  kb2:
    'A small image may reach the required size with simple compression, while another image with large dimensions needs its dimensions reduced and then a stronger compression level.',

  prosecution1:
    'Some portals and electronic systems impose a maximum file size. In that case the goal becomes different from simply "compressing the image".',
  prosecution2:
    'You need to reach a specific size while keeping the best practical quality possible.',
  prosecution3:
    'That is why Data Lynx Tools provides a dedicated tool for preparing files below 500KB, so the user does not have to try dozens of settings manually.',
  prosecutionNote:
    'The "Prosecution Portal" tool is an independent Data Lynx Tools tool for preparing files according to a size limit. It is not an official service affiliated with the public prosecution.',

  quality1:
    'If the image contains a document or text, fine detail becomes more important than in ordinary photographs.',
  quality2:
    'So very strong compression should be avoided if it would blur letters, lines, stamps or small details.',
  quality3:
    'In these cases, moderate dimension reduction combined with a suitable quality can be better than sharply lowering quality.',

  ctaTitle: 'Need to compress an image right now?',
  ctaText:
    'Instead of trying settings manually, use the Data Lynx Tools to choose the compression level, dimensions and the right format, then download the result directly.',
  ctaPrimary: 'Compress images',
  ctaSecondary: 'Read the comprehensive guide',
  toolCta: 'Prepare an image for under 500KB',
  compressNow: 'Compress an image now',
};
