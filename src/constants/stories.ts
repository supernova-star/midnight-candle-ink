export type StoryMetadata = {
  id: string;
  title: string;
  genre: string;
  readTime: number;
  postedDay: string;
  summary: string;
  image: string;
  chapters: ChapterMetadata[];
};

export type ChapterMetadata = {
  id: string;
  title: string;
  readTime: string;
  markdownUrl: string;
};

export const stories: StoryMetadata[] = [
  {
    id: 'the-photograph',
    title: 'The Photograph',
    genre: 'Horror',
    readTime: 8,
    postedDay: 'September 19, 2026',
    summary: 'Some photographs are better left forgotten.',
    image: '/photograph.png',
    chapters: [
      {
        id: 'the-camera',
        title: 'The Camera',
        readTime: '3 min',
        markdownUrl: new URL('./the-photograph/the-camera.md', import.meta.url)
          .href,
      },
      {
        id: 'the-figure',
        title: 'The Figure',
        readTime: '4 min',
        markdownUrl: new URL('./the-photograph/the-figure.md', import.meta.url)
          .href,
      },
      {
        id: 'closer',
        title: 'Closer',
        readTime: '5 min',
        markdownUrl: new URL('./the-photograph/closer.md', import.meta.url)
          .href,
      },
      {
        id: 'dont-wake-her',
        title: 'Don’t Wake Her',
        readTime: '5 min',
        markdownUrl: new URL(
          './the-photograph/dont-wake-her.md',
          import.meta.url,
        ).href,
      },
    ],
  },
  //   {
  //     id: 'the-last-room',
  //     title: 'The Last Room',
  //     genre: 'Mystery',
  //     readTime: 6,
  //     postedDay: 'September 16, 2026',
  //     summary: 'Some doors are better left closed.',
  //     image: '/photograph.png',
  //     chapters: [],
  //   },
  //   {
  //     id: 'a-missed-train',
  //     title: 'A Missed Train',
  //     genre: 'Slice of Life',
  //     readTime: 5,
  //     postedDay: 'September 12, 2026',
  //     summary: 'Some goodbyes never really end.',
  //     image: '/photograph.png',
  //     chapters: [],
  //   },
  //   {
  //     id: 'letters-to-kolkata',
  //     title: 'Letters to Kolkata',
  //     genre: 'Slice of Life',
  //     readTime: 7,
  //     postedDay: 'September 8, 2026',
  //     summary: 'A city, a time, and a few unspoken words.',
  //     image: '/photograph.png',
  //     chapters: [],
  //   },
  //   {
  //     id: 'the-librarian',
  //     title: 'The Librarian',
  //     genre: 'Fantasy',
  //     readTime: 9,
  //     postedDay: 'September 3, 2026',
  //     summary: 'Every book remembers someone.',
  //     image: '/photograph.png',
  //     chapters: [],
  //   },
  //   {
  //     id: 'the-same-moon',
  //     title: 'The Same Moon',
  //     genre: 'Romance',
  //     readTime: 6,
  //     postedDay: 'August 29, 2026',
  //     summary: 'Different cities. The same moon.',
  //     image: '/photograph.png',
  //     chapters: [],
  //   },
];
