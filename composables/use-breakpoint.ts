const useBreakpoint = (
  breakpoints: Record<string, number>
): Ref<string | undefined> => {
  const breakpoint = useState<string | undefined>('breakpoint', () => '');

  const handleWindowResize = () => {
    const windowWidth = window.innerWidth;

    // Encontrar el breakpoint coincidente
    const matchingBreakpoint = Object.keys(breakpoints).find(
      (key) => windowWidth <= breakpoints[key]
    );

    breakpoint.value = matchingBreakpoint;
  };

  onMounted(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleWindowResize);
  });

  return breakpoint;
};

export default useBreakpoint;
