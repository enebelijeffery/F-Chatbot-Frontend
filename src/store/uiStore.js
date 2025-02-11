import {create} from 'zustand';

export const useUiStore = create((set) => ({
  activeChat:  null,  // Fetch token from localStorage if exists
    savedChats: [],  // Store user data here
    newSavedChatTitle: '',  // Store user data here
    isStartNewChat: false,  // Store user data here
    selectedChatId: null,  // Store user data here
    theme: null,  // Store user data here
    colors: null,  // Store user data here
    savedConversations: [],  // Store user data here
    newlyCreatedChatTitle: null,  // Store user data here
    openMenu:false,
    setAtiveChat: (activeChat) => set({ activeChat }),
    setSavedChats: (savedChats) => set({ savedChats }),
    setNewSavedChatTitle: (newSavedChatTitle) => set({ newSavedChatTitle }),
    setIsStartNewChat: (isStartNewChat) => set({ isStartNewChat }),
    setSelectedChatId: (selectedChatId) => set({ selectedChatId }),
    setTheme: (theme) => set({ theme }),
    setColors: (colors) => set({ colors }),
    setNewlyCreatedChatTitle: (newlyCreatedChatTitle) => set({ newlyCreatedChatTitle }),
    setSavedConversations: (savedConversations) => set({ savedConversations }),
    setOpenMenu: (openMenu) => set({ openMenu }),
}));
