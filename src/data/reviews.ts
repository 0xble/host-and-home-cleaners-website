import type { ReviewsData } from '@/types/review'

export const mockReviewsData: ReviewsData = {
  overall_rating: 5.0,
  platform_ratings: [
    { platform: 'Google', rating: 5.0, total_reviews: 50 },
    { platform: 'Facebook', rating: 5.0, total_reviews: 30 },
    { platform: 'Yelp', rating: 5.0, total_reviews: 25 },
    { platform: 'Thumbtack', rating: 5.0, total_reviews: 20 },
    { platform: 'Nextdoor', rating: 5.0, total_reviews: 15 },
  ],
  reviews: [
    {
      id: '1',
      rating: 5,
      text: 'What an amazing job Candace did on our home. I don\'t think it was ever this clean when we moved in.. this girl is sweet and one of the best cleaners I\'ve ever had.',
      author: {
        name: 'Richard p.',
      },
      platform: 'Google',
      date: '3 days ago',
    },
    {
      id: '2',
      rating: 5,
      text: 'Host and Home has really come through for us and our Airbnb. We had a previous cleaner that wasn\'t meeting our standards and we needed a change.',
      author: {
        name: 'Hope B.',
      },
      platform: 'Google',
      date: '3 days ago',
    },
    {
      id: '3',
      rating: 5,
      text: 'Great experience! Our cleaner, Robin, was on time and did a great job before my move in. Would highly recommend',
      author: {
        name: 'Matthew D.',
      },
      platform: 'Google',
      date: '5 days ago',
    },
    {
      id: '4',
      rating: 5,
      text: 'Host & Home Cleaners was extremely good at communicating their arrival and departure cleaning our new home. Nidya was our cleaner and she did an amazing job.',
      author: {
        name: 'Amanda H.',
      },
      platform: 'Google',
      date: '6 days ago',
    },
    {
      id: '5',
      rating: 5,
      text: 'Used Host & Home Cleaners due to good reviews And I wasn\'t disappointed. Niyda got there and went right to work.',
      author: {
        name: 'Raye S.',
      },
      platform: 'Google',
      date: '8 days ago',
    },
  ],
}
