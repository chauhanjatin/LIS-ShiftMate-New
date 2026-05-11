import LoginForm from "@/Component/Auth/LoginForm";
import AuthMarketingLayout from "@/Component/Auth/AuthMarketingLayout";

export default function Home() {
  return (
    <AuthMarketingLayout>
      <LoginForm />
    </AuthMarketingLayout>
  );
}
