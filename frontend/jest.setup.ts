// TODO(fix): fix testing env issues.

// jest.setup.ts
import '@testing-library/jest-dom/extend-expect';

// Mock Mantine Notifications
jest.mock('@mantine/notifications', () => ({
  showNotification: jest.fn(),
  cleanNotifications: jest.fn(),
}));
