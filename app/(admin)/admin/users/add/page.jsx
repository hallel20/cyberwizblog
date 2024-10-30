import UserForm from "./UserForm";

const Page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-2xl font-bold mb-6 text-center">Add New User</div>

      {/* Form Container */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <UserForm />
      </div>
    </div>
  );
};

export default Page;
