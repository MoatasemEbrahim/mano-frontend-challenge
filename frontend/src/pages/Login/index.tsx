import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mantine/core';
import Logo from "../../components/Logo";
import { IconCookieMan } from '@tabler/icons-react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/StoreContext";

const Login = observer(() => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.isLoggedIn) {
      navigate('/manage-claims');
    }
  },[authStore.isLoggedIn, navigate])

  const handleLogin = () => {
    authStore.login();
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full p-4 shadow-md">
        <Logo />
      </div>
      <div className="p-4 h-full flex justify-center items-center">
        <Button
          onClick={handleLogin}
          variant="outline"
          rightSection={<IconCookieMan size={24} />}
        >
          Click me to login
        </Button>
      </div>
    </div>
  )
});

export default Login;
