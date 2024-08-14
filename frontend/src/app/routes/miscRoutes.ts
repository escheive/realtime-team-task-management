
export const dashboardRoute = {
  path: '',
  lazy: async () => {
    const { Dashboard } = await import('~dashboard/routes');
    return { Component: Dashboard };
  }
}