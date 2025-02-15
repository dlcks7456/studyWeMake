import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'Monthly Leaderboards | wemake' }, { name: 'description', content: 'Best products of the month' }];
};

export default function MonthlyLeaderboardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Monthly Leaderboards</h1>
    </div>
  );
}
