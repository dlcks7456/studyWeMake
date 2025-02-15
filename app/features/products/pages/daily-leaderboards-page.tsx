import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'Daily Leaderboards | wemake' }, { name: 'description', content: 'Best products of the day' }];
};

export default function DailyLeaderboardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Daily Leaderboards</h1>
    </div>
  );
}
