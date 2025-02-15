import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'Yearly Leaderboards | wemake' }, { name: 'description', content: 'Best products of the year' }];
};

export default function YearlyLeaderboardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Yearly Leaderboards</h1>
    </div>
  );
}
