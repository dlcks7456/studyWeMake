import { type MetaFunction } from 'react-router';
import type { Route } from '.react-router/types/app/+types/root';

export const meta: MetaFunction = () => {
  return [{ title: 'Yearly Leaderboards | wemake' }, { name: 'description', content: 'Best products of the year' }];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    year: params.year,
    products: [],
  };
}

export default function YearlyLeaderboardsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Yearly Leaderboards</h1>
    </div>
  );
}
