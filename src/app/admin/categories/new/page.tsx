import CategoryForm from '@/components/admin/forms/CategoryForm';

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-headingLight heading-style">
          Add New Category
        </h1>
        <p className="mt-2 text-textLight text-style">
          Create a new category for your projects
        </p>
      </div>

      {/* Category Form */}
      <CategoryForm />
    </div>
  );
}