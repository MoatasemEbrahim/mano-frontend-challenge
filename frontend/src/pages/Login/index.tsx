import Logo from "../../components/Logo";

const Login = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full p-4 shadow-md">
        <Logo />
      </div>
      <div className="p-4 h-full flex justify-center items-center">
        Login form
      </div>
    </div>
  )
}

export default Login;
