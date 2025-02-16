import { type MetaFunction } from 'react-router';
import type { Route } from '.react-router/types/app/+types/root';

export const meta: MetaFunction = () => {
  return [{ title: 'Search Products | wemake' }, { name: 'description', content: 'Search for products' }];
};

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';

  return {
    query,
    results: [],
  };
}

export default function SearchPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Search Products</h1>
    </div>
  );
}
