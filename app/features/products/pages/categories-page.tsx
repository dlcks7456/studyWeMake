import { Link, type MetaFunction } from 'react-router';
import type { Route } from '.react-router/types/app/+types/root';

export const meta: MetaFunction = () => {
  return [{ title: 'Categories | wemake' }, { name: 'description', content: 'Browse products by category' }];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Categories</h1>
    </div>
  );
}
