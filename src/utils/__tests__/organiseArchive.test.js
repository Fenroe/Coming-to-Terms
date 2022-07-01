import { organiseArchive } from '../index'

const mockPostData = [
  {
    yearAndMonthPublished: 'June 2022',
    datePublished: new Date(2022, 5)
  },
  {
    yearAndMonthPublished: 'April 2022',
    datePublished: new Date(2022, 3)
  },
  {
    yearAndMonthPublished: 'May 2022',
    datePublished: new Date(2022, 4)
  },
  {
    yearAndMonthPublished: 'June 2021',
    datePublished: new Date(2021, 5)
  },
  {
    yearAndMonthPublished: 'February 2022',
    datePublished: new Date(2022, 1)
  },
  {
    yearAndMonthPublished: 'December 2021',
    datePublished: new Date(2021, 11)
  },
  {
    yearAndMonthPublished: 'June 2022',
    datePublished: new Date(2022, 5)
  },
  {
    yearAndMonthPublished: 'May 2022',
    datePublished: new Date(2022, 4)
  },
  {
    yearAndMonthPublished: 'May 2022',
    datePublished: new Date(2022, 4)
  }
]

const mockArchive = [
  [
    {
      yearAndMonthPublished: 'June 2022',
      datePublished: new Date(2022, 5)
    },
    {
      yearAndMonthPublished: 'June 2022',
      datePublished: new Date(2022, 5)
    }
  ],
  [
    {
      yearAndMonthPublished: 'May 2022',
      datePublished: new Date(2022, 4)
    },
    {
      yearAndMonthPublished: 'May 2022',
      datePublished: new Date(2022, 4)
    },
    {
      yearAndMonthPublished: 'May 2022',
      datePublished: new Date(2022, 4)
    }
  ],
  [
    {
      yearAndMonthPublished: 'April 2022',
      datePublished: new Date(2022, 3)
    }
  ],
  [
    {
      yearAndMonthPublished: 'February 2022',
      datePublished: new Date(2022, 1)
    }
  ],
  [
    {
      yearAndMonthPublished: 'December 2021',
      datePublished: new Date(2021, 11)
    }
  ],
  [
    {
      yearAndMonthPublished: 'June 2021',
      datePublished: new Date(2021, 5)
    }
  ]
]

test('returns something', () => {
  expect(typeof organiseArchive(mockPostData)).toBe('object')
})

test('returns array', () => {
  expect(organiseArchive(mockPostData)).toBeInstanceOf(Array)
})

test('returns correct length array', () => {
  expect(organiseArchive(mockPostData).length).toBe(6)
})

test('returns array of arrays', () => {
  expect(organiseArchive(mockPostData)).toEqual(mockArchive)
})
