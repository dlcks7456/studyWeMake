import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'Category | wemake' }, { name: 'description', content: 'Products in this category' }];
};

export default function CategoryPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Category</h1>
    </div>
  );
}
