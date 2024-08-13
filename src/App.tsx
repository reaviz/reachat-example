import { useState } from 'react';
import './App.css';
import {
  Chat,
  ChatInput,
  Conversation,
  NewSessionButton,
  Session,
  SessionGroups,
  SessionMessagePanel,
  SessionMessages,
  SessionMessagesHeader,
  SessionsList
} from 'reachat';
import { chatTheme } from './theme';

function App() {
  const [activeId, setActiveId] = useState<string>();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(sessions.length + 1);

  const handleNewSession = () => {
    const newId = count.toLocaleString();
    setSessions([
      ...sessions,
      {
        id: newId,
        title: `New Session #${newId}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        conversations: []
      }
    ]);
    setActiveId(newId);
    setCount(count + 1);
  };

  const handleDelete = (id: string) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions([...updated]);
  };

  const handleNewMessage = (message: string) => {
    setLoading(true);
    const curr = sessions.find((s) => s.id === activeId);
    if (curr) {
      const newMessage: Conversation = {
        id: `${curr.id}-${curr.conversations.length}`,
        question: message,
        response: 'this is an example response',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const updated = {
        ...curr,
        conversations: [...curr.conversations, newMessage]
      };
      setSessions([...sessions.filter((s) => s.id !== activeId), updated]);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen p-2">
      <Chat
        sessions={sessions}
        activeSessionId={activeId}
        isLoading={loading}
        onNewSession={handleNewSession}
        onSelectSession={setActiveId}
        onDeleteSession={handleDelete}
        onSendMessage={handleNewMessage}
        theme={chatTheme}
      >
        <SessionsList>
          <NewSessionButton />
          <SessionGroups />
        </SessionsList>
        <SessionMessagePanel>
          <SessionMessagesHeader />
          <SessionMessages />
          <ChatInput />
        </SessionMessagePanel>
      </Chat>
    </div>
  );
}

export default App;
