import { AppShell } from '@mantine/core';

export function SectionContainer({ children, ...props }) {
  return (
    <AppShell.Section
      mx="auto"
      px="md"
      style={{ maxWidth: 1440 }}
      {...props}
    >
      {children}
    </AppShell.Section>
  );
}
