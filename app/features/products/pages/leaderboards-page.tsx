import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'Leaderboards | wemake' }, { name: 'description', content: 'Top products on wemake' }];
};

export default function LeaderboardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Leaderboards</h1>
    </div>
  );
}
