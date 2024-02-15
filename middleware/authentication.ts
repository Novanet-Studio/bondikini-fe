export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();
  if (!auth.authenticated) {
    useToast().add({
      icon: 'i-ph-info',
      title: 'Help',
      description: `You need to be logged in to access this page`,
      color: 'blue',
    });
    return navigateTo('/');
  }
});
