import { type MetaFunction } from 'react-router';
import type { Route } from '.react-router/types/app/+types/root';

export const meta: MetaFunction = () => {
  return [{ title: 'Weekly Leaderboards | wemake' }, { name: 'description', content: 'Best products of the week' }];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    week: params.week,
    products: [],
  };
}

export default function WeeklyLeaderboardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Weekly Leaderboards</h1>
    </div>
  );
}
