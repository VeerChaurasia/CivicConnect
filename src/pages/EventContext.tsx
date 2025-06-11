import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxAttendees: number;
  attendees: number;
  badgeEmoji: string;
  status: string;
  rsvpStatus: string;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id' | 'attendees' | 'status' | 'rsvpStatus'>) => void;
  registerForEvent: (id: number) => void; // ✅ add this
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Web3 Developer Meetup",
      date: "2024-12-15",
      time: "18:00",
      location: "TechHub SF",
      description: "Join fellow developers for networking and Web3 discussions.",
      maxAttendees: 200,
      attendees: 124,
      badgeEmoji: "🎯",
      status: "upcoming",
      rsvpStatus: "not-registered"
    },
    {
      id: 2,
      title: "NFT Art Exhibition",
      date: "2024-12-20",
      time: "19:30",
      location: "Crypto Gallery",
      description: "Explore the latest in digital art and NFT creations.",
      maxAttendees: 150,
      attendees: 89,
      badgeEmoji: "🎨",
      status: "upcoming",
      rsvpStatus: "registered"
    },
    {
      id: 3,
      title: "Blockchain Summit 2024",
      date: "2025-01-05",
      time: "09:00",
      location: "Convention Center",
      description: "The biggest blockchain conference of the year.",
      maxAttendees: 500,
      attendees: 456,
      badgeEmoji: "⚡",
      status: "upcoming",
      rsvpStatus: "not-registered"
    }
  ]);

  const addEvent = (eventData: Omit<Event, 'id' | 'attendees' | 'status' | 'rsvpStatus'>) => {
    const newEvent: Event = {
      ...eventData,
      id: events.length + 1,
      attendees: 0,
      status: "upcoming",
      rsvpStatus: "not-registered"
    };
    setEvents(prev => [...prev, newEvent]);
  };

  // ✅ Add RSVP function
  const registerForEvent = (id: number) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === id && event.rsvpStatus === "not-registered"
          ? {
              ...event,
              attendees: event.attendees + 1,
              rsvpStatus: "registered"
            }
          : event
      )
    );
  };

  return (
    <EventContext.Provider value={{ events, addEvent, registerForEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
