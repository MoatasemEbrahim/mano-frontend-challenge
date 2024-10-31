import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Logo from '../components/Logo';

export default function BasicLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div className="h-screen w-full">
      <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 220,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <div className='flex justify-between p-4 items-center'>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Logo />
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <ul className="list-disc p-4">
          {/* TODO(enhancement): highlight the active link */}
          <li><Link to="/manage-claims">Manage claims</Link></li>
          <li><Link to="/list-mrf-files">List available claims</Link></li>
        </ul>
      </AppShell.Navbar>

      <AppShell.Main className='h-screen'>
        <div className='p-2 h-full'>
          <Outlet />
        </div>
      </AppShell.Main>
    </AppShell>
    </div>
  );
}
