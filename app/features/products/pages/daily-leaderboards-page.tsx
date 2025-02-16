import { type MetaFunction } from 'react-router';
import type { Route } from '.react-router/types/app/+types/root';

export const meta: MetaFunction = () => {
  return [{ title: 'Daily Leaderboards | wemake' }, { name: 'description', content: 'Best products of the day' }];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    day: params.day,
    products: [],
  };
}

export default function DailyLeaderboardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Daily Leaderboards</h1>
    </div>
  );
}
