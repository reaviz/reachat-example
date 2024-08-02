import { chatTheme as defaultTheme, ChatTheme } from 'reachat';
import { twMerge } from 'tailwind-merge';

export const chatTheme: ChatTheme = {
  ...defaultTheme,
  sessions: {
    ...defaultTheme.sessions,
    console: twMerge(defaultTheme.sessions.console, 'min-w-[300px]'),
    session: {
      ...defaultTheme.sessions.session,
      delete: '[&>svg]:w-4 [&>svg]:h-4 opacity-70 hover:opacity-100 transition-opacity',
    }
  },
  messages: {
    ...defaultTheme.messages,
    base: 'py-4 pr-4',
    message: {
      ...defaultTheme.messages.message,
      question: twMerge(defaultTheme.messages.message.question, 'text-purple-300 text-lg'),
      response: 'border-l border-purple-300 pl-4'
    } 
  }
};
