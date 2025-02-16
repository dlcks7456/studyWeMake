import { type MetaFunction } from 'react-router';
import type { Route } from '.react-router/types/app/+types/root';

export const meta: MetaFunction = () => {
  return [{ title: 'Monthly Leaderboards | wemake' }, { name: 'description', content: 'Best products of the month' }];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    month: params.month,
    products: [],
  };
}

export default function MonthlyLeaderboardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Monthly Leaderboards</h1>
    </div>
  );
}
