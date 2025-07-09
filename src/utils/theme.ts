

export const getTodoFormTheme = (isDarkMode: boolean) => {
  return {
    container: `flex flex-col items-center gap-4 w-[90%] lg:w-[40%] min-h-[70vh] max-h-[90vh] rounded-2xl p-4
      ${isDarkMode ? 'bg-[#121E33] ' : 'bg-white '}`,

    title: `text-3xl font-bold pt-2 ${isDarkMode ? 'text-white' : 'text-black'}`,
    subTitle: `text-xl font-bold pt-2 ${isDarkMode ? 'text-white' : 'text-black'}`,
  };
};

export const textTheme = (isDarkMode: boolean) => (isDarkMode ? 'text-black' : 'text-black');

export const inputTheme = (isDarkMode: boolean) => (isDarkMode ? 'text-white' : 'bg-white text-black');