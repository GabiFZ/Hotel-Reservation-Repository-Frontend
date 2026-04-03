import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const handleSuccess = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <LoginForm onLoginSuccess={handleSuccess} />
      </div>
    </div>
  );
}