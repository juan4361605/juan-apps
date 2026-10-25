/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { TopHeader, BottomTabBar, TabType } from './components/Navigation';
import { DiscoverTab } from './components/DiscoverTab';
import { WorldMapTab } from './components/WorldMapTab';
import { ChatTab } from './components/ChatTab';
import { EventsTab } from './components/EventsTab';
import { ProfileTab } from './components/ProfileTab';
import { VideoCallModal } from './components/VideoCallModal';
import { VirtualDateModal } from './components/VirtualDateModal';
import { DossierModal } from './components/DossierModal';
import { UserProfile, MatchConversation, UserPassportData } from './types';
import { INITIAL_CONVERSATIONS, INITIAL_PASSPORT, PROFILES_CATALOG } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isPhoneView, setIsPhoneView] = useState<boolean>(true);

  // App core state
  const [conversations, setConversations] = useState<MatchConversation[]>(INITIAL_CONVERSATIONS);
  const [passport, setPassport] = useState<UserPassportData>(INITIAL_PASSPORT);
  const [activeChatProfile, setActiveChatProfile] = useState<UserProfile | null>(null);

  // Modal states
  const [videoCallProfile, setVideoCallProfile] = useState<UserProfile | null>(null);
  const [virtualDateProfile, setVirtualDateProfile] = useState<UserProfile | null>(null);
  const [showDossier, setShowDossier] = useState<boolean>(false);

  const totalUnread = conversations.reduce((acc, curr) => acc + curr.unreadCount, 0);

  const handleMatch = (profile: UserProfile) => {
    // Add to conversations if not already there
    setConversations((prev) => {
      const exists = prev.some((c) => c.profile.id === profile.id);
      if (exists) return prev;

      const newConv: MatchConversation = {
        id: `conv_${profile.id}`,
        profile,
        lastMessage: '¡Nuevo Match Mundial! Di hola con el rompehielos IA.',
        lastMessageTime: 'Ahora',
        unreadCount: 1,
        compatibilityScore: 94,
        messages: []
      };

      return [newConv, ...prev];
    });

    // Update passport stamps
    if (!passport.visitedCountries.includes(profile.country)) {
      setPassport((prev) => ({
        ...prev,
        stampsCount: prev.stampsCount + 1,
        xp: prev.xp + 250,
        visitedCountries: [...prev.visitedCountries, profile.country]
      }));
    }
  };

  const handleOpenChatWith = (profile: UserProfile) => {
    setActiveChatProfile(profile);
    setActiveTab('chat');
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <PhoneFrame
        isPhoneView={isPhoneView}
        onToggleView={() => setIsPhoneView(!isPhoneView)}
        isDarkMode={isDarkMode}
      >
        <div className={`flex-1 flex flex-col min-h-full transition-colors duration-200 ${
          isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}>
          {/* Top Header */}
          <TopHeader
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onOpenDossier={() => setShowDossier(true)}
          />

          {/* Active Tab Screen */}
          <main className="flex-1 flex flex-col relative overflow-hidden">
            {activeTab === 'discover' && (
              <DiscoverTab
                onMatch={handleMatch}
                onOpenChatWith={handleOpenChatWith}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'world' && (
              <WorldMapTab
                onSelectProfile={(profile) => {
                  handleMatch(profile);
                  handleOpenChatWith(profile);
                }}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'chat' && (
              <ChatTab
                conversations={conversations}
                activeChatProfile={activeChatProfile}
                onSelectChat={(conv) => setActiveChatProfile(conv.profile)}
                onBackToList={() => setActiveChatProfile(null)}
                onStartVideoCall={(profile) => setVideoCallProfile(profile)}
                onStartVirtualDate={(profile) => setVirtualDateProfile(profile)}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'events' && (
              <EventsTab
                onStartVirtualDateWith={(profile) => setVirtualDateProfile(profile)}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileTab
                passport={passport}
                onUpdatePassport={setPassport}
                isDarkMode={isDarkMode}
              />
            )}
          </main>

          {/* Bottom Tab Bar */}
          <BottomTabBar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab !== 'chat') {
                setActiveChatProfile(null);
              }
            }}
            unreadCount={totalUnread}
            isDarkMode={isDarkMode}
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
            onOpenDossier={() => setShowDossier(true)}
            isPhoneView={isPhoneView}
          />
        </div>
      </PhoneFrame>

      {/* Video Call Modal */}
      {videoCallProfile && (
        <VideoCallModal
          profile={videoCallProfile}
          onClose={() => setVideoCallProfile(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Virtual Date Modal */}
      {virtualDateProfile && (
        <VirtualDateModal
          profile={virtualDateProfile}
          onClose={() => setVirtualDateProfile(null)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Complete Executive & Architecture Dossier */}
      {showDossier && (
        <DossierModal
          onClose={() => setShowDossier(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
