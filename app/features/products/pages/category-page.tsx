import { type MetaFunction } from 'react-router';
import type { Route } from '.react-router/types/app/+types/root';

export const meta: MetaFunction = () => {
  return [{ title: 'Category | wemake' }, { name: 'description', content: 'Products in this category' }];
};

export function loader({ request, params }: Route.LoaderArgs) {
  return {
    category: params.category,
    products: [],
  };
}

export default function CategoryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Category</h1>
    </div>
  );
}
