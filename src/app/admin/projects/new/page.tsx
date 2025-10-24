import ProjectForm from '@/components/admin/forms/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-headingLight heading-style">
          Add New Project
        </h1>
        <p className="mt-2 text-textLight text-style">
          Create a new project for your portfolio
        </p>
      </div>

      {/* Project Form */}
      <ProjectForm />
    </div>
  );
}