import {
  PHOTOGRAPH_IMAGE_URL,
  THE_LAST_GIFT_IMAGE_URL,
  THREE_SEVENTEEN_IMAGE_URL,
} from '@/constants/assets';

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
        isAvailable: true,
        postedDate: 'Sep 24, 2026',
        markdownUrl: new URL(
          './the-photograph/dont-wake-her.md',
          import.meta.url,
        ).href,
      },
    ],
  },
  // {
  //   id: '3-17-am-6q8m2r',
  //   title: '3:17 AM',
  //   genre: 'Mystery',
  //   readTime: 18,
  //   postedDay: 'September 28, 2026',
  //   summary: 'One passenger. One ride. One unfinished night.',
  //   image: THREE_SEVENTEEN_IMAGE_URL,
  //   chapters: [
  //     {
  //       id: 'chapter-1-3v7k1x',
  //       title: 'The Last Shift',
  //       readTime: '5 min',
  //       isAvailable: false,
  //       postedDate: 'Sep 28, 2026',
  //       markdownUrl: new URL(
  //         './three-seventeen/the-last-shift.md',
  //         import.meta.url,
  //       ).href,
  //     },
  //     {
  //       id: 'chapter-2-2p6r1t',
  //       title: 'The Passenger',
  //       readTime: '4 min',
  //       isAvailable: false,
  //       postedDate: 'Sep 30, 2026',
  //       markdownUrl: new URL(
  //         './three-seventeen/the-passenger.md',
  //         import.meta.url,
  //       ).href,
  //     },
  //     {
  //       id: 'chapter-3-8v3n5c',
  //       title: 'The Unpaid Fare',
  //       readTime: '4 min',
  //       isAvailable: false,
  //       postedDate: 'Oct 02, 2026',
  //       markdownUrl: new URL(
  //         './three-seventeen/the-unpaid-fare.md',
  //         import.meta.url,
  //       ).href,
  //     },
  //     {
  //       id: 'chapter-4-7h1z9w',
  //       title: 'The Return',
  //       readTime: '5 min',
  //       isAvailable: false,
  //       postedDate: 'Oct 04, 2026',
  //       markdownUrl: new URL('./three-seventeen/the-return.md', import.meta.url)
  //         .href,
  //     },
  //   ],
  // },
  {
    id: 'the-last-gift-1c2d6g',
    title: 'The Last Gift',
    genre: 'Emotional',
    readTime: 17,
    postedDay: 'September 28, 2026',
    summary: 'Some gifts are more than they seem.',
    image: THE_LAST_GIFT_IMAGE_URL,
    chapters: [
      // {
      //   id: 'chapter-1-56ag56',
      //   title: 'The Brass Arm',
      //   readTime: '3 min',
      //   isAvailable: false,
      //   postedDate: 'Sep 28, 2026',
      //   markdownUrl: new URL(
      //     './the-last-gift/the-brass-arm.md',
      //     import.meta.url,
      //   ).href,
      // },
      // {
      //   id: 'chapter-2-xlp8np',
      //   title: 'The Mahogany Block',
      //   readTime: '3 min',
      //   isAvailable: false,
      //   postedDate: 'Sep 29, 2026',
      //   markdownUrl: new URL(
      //     './the-last-gift/the-mahogany-block.md',
      //     import.meta.url,
      //   ).href,
      // },
      // {
      //   id: 'chapter-3-5tev8o',
      //   title: 'The Coiled Spring',
      //   readTime: '3 min',
      //   isAvailable: false,
      //   postedDate: 'Sep 30, 2026',
      //   markdownUrl: new URL(
      //     './the-last-gift/the-coiled-spring.md',
      //     import.meta.url,
      //   ).href,
      // },
      // {
      //   id: 'chapter-4-wi3dt5',
      //   title: 'The Bell, Key, and Screw',
      //   readTime: '4 min',
      //   isAvailable: false,
      //   postedDate: 'Oct 1, 2026',
      //   markdownUrl: new URL('./the-last-gift/the-bell.md', import.meta.url)
      //     .href,
      // },
      // {
      //   id: 'chapter-4-r5v8nd',
      //   title: 'The final letter',
      //   readTime: '4 min',
      //   isAvailable: false,
      //   postedDate: 'Oct 2, 2026',
      //   markdownUrl: new URL(
      //     './the-last-gift/the-final-letter.md',
      //     import.meta.url,
      //   ).href,
      // },
    ],
  },
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
