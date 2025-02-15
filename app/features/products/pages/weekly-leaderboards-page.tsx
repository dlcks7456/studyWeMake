import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'Weekly Leaderboards | wemake' }, { name: 'description', content: 'Best products of the week' }];
};

export default function WeeklyLeaderboardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Weekly Leaderboards</h1>
    </div>
  );
}
