import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Products | wemake' },
    { name: 'description', content: 'Discover the latest products from our community' },
  ];
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Products</h1>
    </div>
  );
}
