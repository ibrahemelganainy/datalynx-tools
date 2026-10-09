/*
 * English dictionary.
 *
 * Mirrors the structure of ./ar.js exactly. Keys must stay in sync:
 * the UI reads the same key path in both languages.
 */

export const en = {
  dir: 'ltr',
  lang: 'en',

  nav: {
    home: 'Home',
    imageCompression: 'Image Compression',
    formatConverter: 'Format Converter',
    pdfCompression: 'PDF Compression',
    prosecutionPortal: 'Prosecution Portal',
    articles: 'Knowledge Center',
    openMenu: 'Open menu',
    languageSwitcherLabel: 'Switch language',
  },

  hero: {
    badge: '100% secure processing inside your browser',
    titleLine1: 'Professional tools to compress',
    titleLine2: 'images and PDF files',
    description:
      'A complete platform from <strong>Data Lynx</strong> that lets you shrink your files and convert their formats at high speed. Every operation runs locally on your device so your documents stay private and confidential.',
    startNow: 'Start now',
    tools: {
      'image-compression': {
        title: 'Image Compression',
        desc: 'Reduce image size intelligently while keeping high quality, saving space and speeding up uploads.',
      },
      'format-converter': {
        title: 'Format Converter',
        desc: 'Convert images between WebP, JPEG and PNG with full flexibility and no loss of quality.',
      },
      'pdf-compression': {
        title: 'PDF Compression',
        desc: 'Shrink legal documents and scanned files to make them easier to send.',
      },
      'prosecution-portal': {
        title: 'Prosecution Portal',
        desc: 'A dedicated tool that automatically sizes any document to below 500KB with a single click.',
      },
    },
  },

  features: {
    titleBefore: 'Why trust',
    titleHighlight: 'our tools?',
    description:
      'We built this platform to be the first assistant for lawyers and professionals, with a complete focus on data protection and speed.',
    items: [
      {
        title: '100% local processing',
        desc: 'We use advanced browser technologies (WebAssembly). Your files are never uploaded to any external server.',
      },
      {
        title: 'Complete security and privacy',
        desc: 'Because processing happens on your device, your legal documents and personal images are fully safe and cannot be viewed by anyone.',
      },
      {
        title: 'Lightning speed',
        desc: 'No more waiting for uploads and downloads. Processing completes in fractions of a second using your own device resources.',
      },
      {
        title: 'Smart algorithms',
        desc: 'Advanced compression techniques preserve image quality and text sharpness in PDF files while reducing size as much as possible.',
      },
    ],
  },

  workspace: {
    backToServices: 'Back to services',
    preparingTool: 'Preparing the tool...',
    tools: {
      'image-compression': 'Image Compression',
      'format-converter': 'Format Converter',
      'pdf-compression': 'PDF Compression',
      'prosecution-portal': 'Prosecution Portal',
    },
  },

  knowledgeSection: {
    kicker: 'KNOWLEDGE CENTER',
    kickerNumber: '03',
    titleBefore: 'Knowledge starts with',
    titleHighlight: 'understanding your tools',
    description:
      'At <strong>Data Lynx Tools</strong> we publish practical guides to help you understand image compression, format conversion and PDF handling, and choose the right approach for your files.',
    articleLabel: 'Article',
    readMore: 'Read article →',
    ctaTitle: 'Looking for more guides?',
    ctaDescription:
      'Explore all the practical articles and guides in the Knowledge Center and learn the best ways to handle your digital files.',
    ctaButton: 'Explore the Knowledge Center',
    articles: {
      'image-pdf-compression-tools': {
        title:
          'Compress images, convert formats and compress PDF files online: a practical guide to handling files quickly and safely',
        description:
          'A complete guide explaining how to compress images, convert their formats, create ICO files and compress PDF files, with the best practices for handling files quickly and safely.',
      },
      'compress-image-500kb': {
        title: 'How do you reduce an image to less than 500KB?',
        description:
          'A practical guide to why images grow in size and how to shrink them using the right quality, dimensions and format while keeping the best possible clarity.',
      },
      'jpg-vs-webp-vs-png-avif': {
        title: 'JPG or PNG or WebP or AVIF? A guide to choosing the right image format',
        description:
          'A practical guide to the most common image formats, comparing their uses and how to choose based on quality, size, transparency and how the image will be used.',
      },
    },
  },

  footer: {
    tagline:
      'A free, extremely fast set of tools to compress images, shrink PDF files and prepare court and prosecution documents. All processing happens completely inside your browser for maximum privacy and security.',
    toolsTitle: 'Our quick tools',
    privacyTitle: 'Privacy and security',
    contactTitle: 'Direct contact',
    tools: {
      'image-compression': {
        label: 'Image compression tool',
        hint: 'Shrink file size to keep pages loading fast',
      },
      'format-converter': {
        label: 'Image format converter',
        hint: 'Convert between WebP, PNG and JPEG',
      },
      'pdf-compression': {
        label: 'PDF compression',
        hint: 'Reduce the size of scanned documents',
      },
      'prosecution-portal': {
        label: 'Prosecution Portal',
        hint: 'Automatically fit below 500KB',
      },
    },
    privacyLink: 'Privacy and data protection policy',
    termsLink: 'Terms and conditions of use',
    mainSiteLink: 'Visit the main Data Lynx website',
    callUs: 'Call us',
    support: 'Technical support',
    availableNow: 'Available now',
    whatsapp: 'Chat on WhatsApp',
    copyright: 'All rights reserved for <strong>Data Lynx Tools</strong>. All processing happens 100% locally on your device.',
    backToTop: 'Back to top',
  },

  tools: {
    common: {
      dropImages: 'Drag and drop your images here',
      dropPdfs: 'Drag and drop your PDF files here',
      dropFiles: 'Drag and drop your files here',
      selectImages: 'Choose images',
      selectFiles: 'Choose files',
      selectPdfFiles: 'Choose PDF files',
      clearAll: 'Clear all',
      processingFile: 'Processing file',
      processingImage: 'Processing image',
      of: 'of',
      download: 'Download',
      downloadAllZip: 'Download all as ZIP',
      originalSize: 'Original size:',
      result: 'Result:',
      removeFile: 'Remove file',
    },

    imageCompression: {
      title: 'Image Compression',
      description:
        'Reduce the size of your images while controlling the compression level, dimensions and output format — all processing runs inside your browser.',
      formatsHint: 'JPG, PNG, WebP, BMP',
      settingsTitle: 'Compression settings',
      settingsSubtitle: 'All settings are applied on your device',
      levelLabel: 'Compression level',
      levelLowerQuality: 'Higher quality',
      levelSmallerSize: 'Smaller size',
      maxDimensionLabel: 'Maximum image dimension',
      maxDimensionUnchanged: 'Keep original dimensions',
      maxDimensionHint: 'Aspect ratio is preserved automatically',
      outputFormatLabel: 'Output format',
      outputFormatWebp: 'WebP — recommended',
      jpegTransparencyWarning:
        'Transparent images will be placed on a non-transparent background.',
      start: 'Start compression',
      processing: 'Compressing images...',
      itemProcessing: 'Compressing...',
      saved: 'Saved',
      emptyHelper: 'You can add several images and process them in one batch',
      error: 'This image could not be compressed. Try another format or a smaller image.',
    },

    formatConverter: {
      title: 'Image Format Converter',
      description:
        'Convert your images between a wide range of formats directly inside your browser, without uploading your files to a server.',
      settingsTitle: 'Conversion settings',
      settingsSubtitle: 'Pick the output format and settings for the selected files.',
      outputFormatLabel: 'Output format',
      outputFormatHint: 'Available options change depending on the format and the engine used.',
      qualityLabel: 'Quality',
      qualitySmallerSize: 'Smaller size',
      qualityHigherQuality: 'Higher quality',
      qualityHint: 'Quality control is available for formats that support lossy compression.',
      maxDimensionLabel: 'Maximum image dimension',
      maxDimensionUnchanged: 'No change',
      maxDimensionHint: 'The image aspect ratio is preserved automatically.',
      runtimeDependentWarning:
        'This format depends partly on your browser capabilities and the available image engine. If the required encoder is unavailable, you will see a clear message instead of an invalid file.',
      iconSizesTitle: 'Icon sizes',
      iconSizesDescription:
        'Choose the sizes you need. A separate ICO file is created for each size, plus a multi-size favicon.ico.',
      iconSizesReset: 'Use default sizes',
      iconSizesCurrent: 'Currently selected sizes:',
      iconSizesNone: 'No size selected',
      start: 'Start conversion',
      startIco: 'Create icons',
      processing: 'Converting...',
      itemProcessing: 'Processing the file...',
      processingLocal: 'Processing happens locally inside your browser.',
      icoResult: 'Created',
      icoIcons: 'icons',
      icoFaviconNote: 'In addition to a multi-size favicon.ico',
      saved: 'saved',
      downloadIcoPack: 'Download ICO pack',
      emptyHelper: 'You can select several files and convert them in one batch.',
      error:
        'The file could not be converted. Make sure the file is valid and supported, then try again.',
      outputGroups: {
        common: 'Common formats',
        modern: 'Modern formats',
        advanced: 'Advanced formats',
        icons: 'Icons',
        technical: 'Technical formats',
      },
    },

    pdfCompression: {
      title: 'PDF Compression',
      description:
        'Shrink PDF files inside your browser while controlling page quality and processing resolution. Your files are never uploaded to a server.',
      dropHint: 'You can choose several files at once',
      settingsTitle: 'Compression settings',
      settingsSubtitle: 'Choose the processing level that suits your document type.',
      modeLabel: 'Compression mode',
      modeSmart: 'Smart compression — recommended',
      modePreserve: 'Preserve text',
      modeVisual: 'Strong visual compression',
      modeHint: 'Smart mode tries more than one route and picks the smaller result.',
      dpiLabel: 'Page resolution',
      dpi96: '96 DPI — strong compression',
      dpi120: '120 DPI — balanced',
      dpi150: '150 DPI — high quality',
      dpi200: '200 DPI — very high quality',
      dpiHint: 'Higher resolution means better quality and a larger file, especially for scanned documents.',
      qualityLabel: 'Image quality',
      qualitySmallerSize: 'Smaller size',
      qualityHigherQuality: 'Higher quality',
      qualityHint: 'This option only affects visual compression and the visual part of smart compression.',
      smartTitle: 'Smart mode',
      smartDescription:
        'We first try to preserve the document structure, then test visual page compression. The smaller file is selected automatically.',
      preserveTitle: 'Preserve text',
      preserveDescription:
        'Pages are not converted into images, so text stays selectable and searchable. The size reduction may be limited for some files.',
      visualTitle: 'Visual compression',
      visualDescription:
        'Document pages are rebuilt as compressed images. This is ideal for scanned documents, but it may remove the ability to select and search the text.',
      start: 'Start compression',
      processing: 'Compressing PDF...',
      itemProcessing: 'Processing pages...',
      processingLocal: 'Processing happens entirely inside the browser.',
      page: 'Page',
      success: 'The file was compressed successfully',
      saved: 'saved',
      pageCount: 'pages',
      textPreserved: 'Text preserved',
      pagesAsImages: 'Pages as images',
      downloadResult: 'Download the compressed PDF',
      emptyHelper: 'The site supports processing several PDF files in one batch.',
      error: 'This PDF could not be compressed. Make sure the file is valid and not password protected.',
    },

    prosecution: {
      title: 'Prepare files for the Prosecution Portal',
      description:
        'Upload an image or PDF and the system will automatically compress and prepare it to be under 500KB, without any settings to configure.',
      noticeTitle: 'Fully local processing',
      noticeDescription:
        'Your files are not uploaded to Data Lynx servers. Processing runs inside your browser and the final file is created on your device.',
      formatsHint:
        'JPG · PNG · WebP · GIF · BMP · TIFF · AVIF · HEIC · and more, plus PDF files',
      requirementBadge: 'Required limit: under 500KB',
      targetBadge: 'Internal target: 480KB',
      selectedFiles: 'Selected files',
      selectedFilesHint:
        'The engine works through every file automatically until it reaches the right result.',
      start: 'Prepare files for under 500KB',
      processing: 'Preparing files...',
      itemProcessing: 'Compressing automatically...',
      overallHint: 'Several automatic attempts may be made to reach the required size.',
      processingPage: 'Processing page',
      ready: 'Ready to upload',
      newSize: 'New size:',
      saved: 'saved',
      under500: 'Under 500KB',
      unchanged: 'No re-compression needed',
      pagesAsImages: 'Pages as images',
      downloadReady: 'Download the ready file',
      failedTitle: 'The required size could not be reached',
      failedSmallest: 'Smallest result reached:',
      failedHint: '. Compressing further could seriously affect document clarity.',
      downloadFailedResult: 'Download the result under 500KB',
      batchTitle: 'Prepared',
      batchTitleSuffix: 'files',
      batchHint: 'All successful files are ready to upload.',
      emptyHelper: 'Choose an image or PDF and we will handle the rest automatically.',
      error: 'The file could not be prepared. Make sure it is valid and not protected.',
      resultMessages: {
        unchanged: 'The file was already within the required limit and was not re-compressed.',
        achieved: 'The file was prepared successfully and is within the required limit.',
        nearLimit: 'It reached under 500KB while slightly exceeding the internal margin.',
        notAchieved: 'It was not possible to reach under 500KB without extreme compression.',
      },
    },
  },

  articlesIndex: {
    badge: 'Knowledge Center',
    titleLine1: 'Practical ideas and guides',
    titleLine2: 'for handling your files',
    description:
      'Articles and guides to help you understand image compression, format conversion, PDF handling, icon creation and preparing files for real use.',
    featuredLabel: 'Featured article',
    featuredTitle: 'Start here',
    featuredBadge: 'Comprehensive guide',
    featuredDate: '8 October 2026',
    featuredCardTitle: 'Compress images, convert formats and compress PDF files online',
    featuredCardDescription:
      'A practical guide to the Data Lynx Tools services: how to compress images, change their dimensions, convert their formats, create ICO files and favicons, compress PDF files, and prepare images and documents for specific sizes such as 500KB.',
    readArticle: 'Read the article',
    categoriesLabel: 'Browse by topic',
    categoriesTitle: 'Explore the tool areas',
    categoryExplore: 'Explore the tool →',
    libraryLabel: 'Article library',
    libraryTitle: 'Latest articles',
    libraryDescription:
      'Practical guides to help you understand how to handle images and PDF files and choose the right way to process your files.',
    whyLabel: 'Why this section?',
    whyTitle: 'Tools alone are not enough',
    whyParagraph1:
      'An image compression tool helps you get the task done, but understanding why file sizes and formats differ, and how compression works, helps you pick the right setting and get a better result.',
    whyParagraph2:
      'That is why the Knowledge Center combines practical tools with educational content, so a user can move from understanding a problem straight to solving it.',
    whyCta: 'Try the Data Lynx tools',
    categories: {
      imageCompression: {
        title: 'Image compression',
        description:
          'Learn how to reduce image size while keeping the best balance between quality and file size.',
      },
      formatConverter: {
        title: 'Format conversion',
        description:
          'A guide to the different image formats and when to use JPG, PNG, WebP, AVIF and others.',
      },
      pdf: {
        title: 'PDF files',
        description:
          'Learn how to compress PDF files and scanned documents and reduce their size.',
      },
      ico: {
        title: 'ICO files',
        description:
          'Learn about ICO files and how to create favicons and multi-size icons.',
      },
    },
    articles: {
      'compress-image-500kb': {
        title: 'How do you reduce an image to less than 500KB?',
        description:
          'A practical guide to why images grow in size and how to shrink them using the right quality, dimensions and format while keeping the best possible clarity.',
        tag: 'Image compression',
      },
      'jpg-vs-webp-vs-png-avif': {
        title: 'JPG or PNG or WebP or AVIF?',
        description:
          'A practical guide to the most common image formats, comparing their uses and choosing the right one based on quality, size, transparency and the web.',
        tag: 'Image formats',
      },
    },
  },

  articleTitles: {
    'compress-image-500kb': 'How do you reduce an image to less than 500KB?',
    'jpg-vs-webp-vs-png-avif':
      'JPG or PNG or WebP or AVIF? A guide to choosing the right image format',
  },

  privacy: {
    badge: 'Your privacy matters to us',
    title: 'Privacy Policy',
    description:
      'This page explains how Data Lynx Tools handles files, technical information and cookies when you use the services on this site.',
    lastUpdated: 'Last updated: 8 October 2026',
    noticeTitle: 'Files are processed locally',
    noticeDescription:
      'Data Lynx Tools is designed to process images and PDF files inside the user\u2019s browser. We never ask you to upload your files to a Data Lynx server in order to compress or convert them.',
    backHome: 'Back to Data Lynx Tools',
    disclaimer:
      'This policy describes how Data Lynx Tools operates and what data may be processed through the services used on the site. It is not legal advice and may need to be updated when new services or technologies are added to the site.',
  },

  terms: {
    kicker: 'LEGAL',
    title: 'Terms of Use',
    description: 'This document explains the terms that govern your use of the Data Lynx Tools.',
    lastUpdated: 'Last updated: 8 October 2026',
    contentsTitle: 'Contents',
    indexLabel: 'Page index',
    backHome: '\u2190 Back to home',
  },

  articlePage: {
    tocTitle: 'Article contents',
    tryTools: 'Try the tools',
    toolCta: 'Try the Data Lynx tools',
    privacyCta: 'Read the Privacy Policy',
    updatedLabel: 'Last updated: 8 October 2026',
    updatedShort: 'Updated: 8 October 2026',
    authorLabel: 'Data Lynx Tools',
    breadcrumbGuides: 'Data Lynx Tools guide',
    breadcrumbPractical: 'Practical guide',
    breadcrumbFormats: 'Image formats guide',
    readComprehensiveGuide: 'Read the comprehensive guide',
  },

  languages: {
    ar: 'العربية',
    en: 'English',
    switchTo: 'العربية',
  },
};
