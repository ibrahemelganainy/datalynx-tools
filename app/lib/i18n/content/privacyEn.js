/*
 * English translation of the Data Lynx Tools privacy policy.
 *
 * The factual meaning of the published Arabic policy is preserved.
 * No privacy claim or capability is added that is not present in the
 * Arabic version or in the actual implementation.
 */

export const privacySections = [
  {
    id: 'overview',
    title: '1. Introduction',
    paragraphs: [
      'Welcome to Data Lynx Tools, a web platform that provides a set of tools to process images and PDF files and to convert file formats, for personal and professional use.',
      'We respect the privacy of the users of this site, and our services are designed so that file processing happens inside the user\u2019s browser wherever possible, without the need to upload files to Data Lynx servers for processing.',
      'This policy explains the nature of the data that may be processed while using the site, how the site handles user files, and the use of advertising technologies and cookies where they exist.',
    ],
  },
  {
    id: 'files',
    title: '2. Your files are processed inside the browser',
    paragraphs: [
      'Data Lynx Tools was designed around the principle of local file processing. When you choose an image or a PDF file from your device, the reading and processing is carried out using JavaScript and the programming libraries that run inside your browser.',
      'Based on the current design of the service, we do not keep copies of the files you choose in a database or storage space belonging to Data Lynx after the processing finishes.',
      'It should be noted that selecting a file from your device may make it temporarily available to browser memory or to the browser\u2019s temporary storage, according to the behaviour of the operating system and the browser in use. This mechanism is part of the user\u2019s own device environment and is not a file storage service provided by Data Lynx.',
    ],
    blocks: [
      {
        title: 'We do not need to upload your files to a Data Lynx server',
        text:
          'The image files and PDF files that you choose for the processing tools are not sent to a Data Lynx server for the purpose of compression or conversion. Processing happens locally inside the browser, and the output file is then created on your device so it can be downloaded.',
      },
    ],
  },
  {
    id: 'information',
    title: '3. Information that may be processed',
    paragraphs: [
      'Using the core tools does not require creating an account or entering a name, phone number or personal data in order to compress images, convert them or compress PDF files.',
      'When you use the site, some of the usual technical information that browsers send to web services may be processed, such as the browser type, operating system, IP address, and information about the connection and the requested page, according to the technical structure of the hosting services and the external tools used on the site.',
      'This information may be used to operate the site, for security, to detect errors, to improve performance, to measure usage of the services, or to serve advertising when it is enabled, according to the services actually used on the site.',
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies and similar technologies',
    paragraphs: [
      'The site may use cookies and similar technologies when they are necessary to operate the site, to understand how the services are used, or to serve advertising.',
      'When Google advertising services such as Google AdSense are used, Google and its partners may use cookies, web beacons, IP addresses or other identifiers to help deliver, measure and personalise advertising according to the settings and policies in effect.',
      'Personalised advertising may be based on a user\u2019s previous visits to this site or to other websites, according to Google settings and the advertising that is available.',
    ],
    links: [
      {
        title: 'Google Ads Settings',
        text:
          'Users can review the ad settings for their Google account and manage some advertising personalisation options.',
        href: 'https://adssettings.google.com/',
      },
      {
        title: 'How Google uses data',
        text:
          'Learn how Google handles data when you use the sites and services of its partners.',
        href: 'https://policies.google.com/technologies/partner-sites',
      },
    ],
  },
  {
    id: 'advertising',
    title: '5. Advertising',
    paragraphs: [
      'Advertising from Google or other advertising partners may be displayed on the site in order to support the continued delivery and development of the free tools.',
      'Advertisers may use cookies and similar technologies to deliver advertising that is relevant to the user, to measure advertising performance, and to prevent advertising fraud, according to each party\u2019s policies and the available settings.',
      'Data Lynx does not control the content of advertising that is selected automatically by advertising networks, and is not responsible for the products or services advertised through a third party.',
    ],
  },
  {
    id: 'third-party',
    title: '6. Third-party services and links',
    paragraphs: [
      'The site may contain external links or services, such as Google services, social media links, or other sites that are not operated by Data Lynx.',
      'When you move to an external site, you become subject to the privacy policy and terms of use of that site. We recommend reviewing the policies of third parties before providing them with any personal information.',
      'Data Lynx does not control the privacy practices of third-party sites.',
    ],
  },
  {
    id: 'security',
    title: '7. Data security',
    paragraphs: [
      'Because the file processing tools run locally inside the user\u2019s browser, the design of the service reduces the need to transfer personal or legal documents to a central server.',
      'However, the security of any internet-connected system cannot be guaranteed at 100%, so we recommend using a modern, up-to-date browser and operating system, and avoiding untrusted devices when processing sensitive files.',
    ],
  },
  {
    id: 'children',
    title: '8. Children\u2019s privacy',
    paragraphs: [
      'The site is a general file processing service and does not aim to collect personal information from children.',
      'If you learn that a child has unintentionally provided personal information to the site, you can contact us using the contact method shown at the end of this policy.',
    ],
  },
  {
    id: 'changes',
    title: '9. Changes to the privacy policy',
    paragraphs: [
      'We may update the privacy policy from time to time because of new services being added, changes to how the site operates, or compliance with new legal or technical requirements.',
      'The updated version will be published on this page, with the last updated date at the end of the policy changed accordingly.',
    ],
  },
  {
    id: 'contact',
    title: '10. Contact us',
    paragraphs: [
      'If you have a question about privacy, file processing or this policy, you can contact us by email:',
    ],
    mailto: 'lexoffice.datalynx@proton.me',
  },
];
