import { type MetaFunction } from 'react-router';
import type { Route } from '.react-router/types/app/+types/root';

export const meta: MetaFunction = () => {
  return [{ title: 'Submit Product | wemake' }, { name: 'description', content: 'Submit your product to wemake' }];
};

export function loader({ request }: Route.LoaderArgs) {
  return {
    categories: [],
  };
}

export default function SubmitPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Submit Product</h1>
    </div>
  );
}
