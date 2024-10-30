import { useMediaQuery } from '@mantine/hooks';
import { Link } from "react-router-dom";

const Logo = () => {
  const isMobile = useMediaQuery('(max-width: 400px)');

  return (
    <Link to="/" className="flex gap-2 items-center">
      <img width={28} height={28} alt="Mano health logo" src="https://media.licdn.com/dms/image/v2/D4E0BAQEEt9Zw0UMjmg/company-logo_200_200/company-logo_200_200/0/1720542183380/manoclaims_logo?e=2147483647&v=beta&t=FvVB8b2aDVmC2m4F2SsmLo-tTpTzCAa_bO1SwLfrtFc" />
      {!isMobile && (
        <h3 className='font-semibold'>
          Mano health
        </h3>
      )}
    </Link>
  )
}

export default Logo;
