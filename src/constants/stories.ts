import { PHOTOGRAPH_IMAGE_URL } from '@/constants/assets';

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
  isAvailable: boolean;
  postedDate: string;
  markdownUrl: string;
};

export const stories: StoryMetadata[] = [
  {
    id: 'the-photograph-zs2gw7f2',
    title: 'The Photograph',
    genre: 'Horror',
    readTime: 17,
    postedDay: 'September 19, 2026',
    summary: 'Some photographs are better left forgotten.',
    image: PHOTOGRAPH_IMAGE_URL,
    chapters: [
      {
        id: 'chapter-1-huqc1c',
        title: 'The Camera',
        readTime: '3 min',
        isAvailable: true,
        postedDate: 'Sep 19, 2026',
        markdownUrl: new URL('./the-photograph/the-camera.md', import.meta.url)
          .href,
      },
      {
        id: 'chapter-2-68qw4u',
        title: 'The Figure',
        readTime: '4 min',
        isAvailable: true,
        postedDate: 'Sep 21, 2026',
        markdownUrl: new URL('./the-photograph/the-figure.md', import.meta.url)
          .href,
      },
      {
        id: 'chapter-3-3w8koa',
        title: 'Closer',
        readTime: '5 min',
        isAvailable: true,
        postedDate: 'Sep 23, 2026',
        markdownUrl: new URL('./the-photograph/closer.md', import.meta.url)
          .href,
      },
      {
        id: 'chapter-4-9x2j1b',
        title: 'Don’t Wake Her',
        readTime: '5 min',
        isAvailable: false,
        postedDate: 'Sep 24, 2026',
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
