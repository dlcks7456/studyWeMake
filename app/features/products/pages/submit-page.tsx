import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
  return [{ title: 'Submit Product | wemake' }, { name: 'description', content: 'Submit your product to wemake' }];
};

export default function SubmitPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold">Submit Product</h1>
    </div>
  );
}
