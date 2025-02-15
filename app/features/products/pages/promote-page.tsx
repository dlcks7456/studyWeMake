import { Link, type MetaFunction } from 'react-router';
import type { Route } from '../../../+types/routes';

export const meta: MetaFunction = () => {
  return [{ title: 'Promote Product | wemake' }, { name: 'description', content: 'Promote your product on wemake' }];
};

export default function PromotePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Promote Product</h1>
    </div>
  );
}
