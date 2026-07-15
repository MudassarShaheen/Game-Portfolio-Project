export interface GddSubsection {
  title: string;
  content: string | string[];
}

export interface GddSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  subsections: GddSubsection[];
}

export const ZANTHALAR_GDD: GddSection[] = [
  {
    id: 'overview',
    title: 'Overview & Objectives',
    icon: 'Compass',
    description: 'An introduction to the strategic fantasy world of Zanthalar and its victory conditions.',
    subsections: [
      {
        title: 'Core Concept',
        content: 'Zanthalar is a strategic card-based game where players compete to explore a fantasy world and be the first to reach 10 Expedition Points. Players select a unique hero, manage their gold resources, purchase and play tactical cards, and outmaneuver opponents in a real-time multiplayer setting.'
      },
      {
        title: 'Gameplay Objective',
        content: [
          'Be the first player to reach 10 Expedition Points.',
          'Earn points by completing challenging fantasy Quests.',
          'Purchase Expedition Points with gold accumulated through strategic play.',
          'Manage resource generation (gold) and card economy to out-tempo opponents.'
        ]
      },
      {
        title: 'Hero Selection',
        content: 'At the start of the game, each player chooses a unique hero with a special active or passive ability. This choice dictates the player\'s strategic direction, deck synergy, and overall playstyle throughout the match.'
      }
    ]
  },
  {
    id: 'turn-phases',
    title: 'Turn Structure',
    icon: 'RefreshCw',
    description: 'The rigid four-phase turn loop designed for strategic planning and tempo.',
    subsections: [
      {
        title: 'Phase 1: Start of Turn (Resource & Quest)',
        content: [
          'Gain 20 Gold automatically as a base income.',
          'Draw and immediately put into play a Quest Card to define your immediate turn goals.'
        ]
      },
      {
        title: 'Phase 2: Spending Phase (Market & Investment)',
        content: [
          'Use accumulated gold to purchase cards (Treasure, Trade, Reaction, or Destination) from the common board pools.',
          'Invest gold into progress: Purchase 1 Expedition Point for 50 Gold (maximum of 9 points can be purchased; the final 10th point must be earned through active gameplay achievement).',
          'Note: Purchases must be made all at once in this phase (no partial buying or mid-action purchasing).'
        ]
      },
      {
        title: 'Phase 3: Action Phase (Tactical Plays)',
        content: [
          'Choose and execute exactly one of the following tactical actions:',
          '• Play a Trade Card or a Treasure Card directly from your hand to resolve its effects.',
          '• Draw and resolve a randomized, high-risk Event Card.'
        ]
      },
      {
        title: 'Phase 4: Bartering Phase (Discard & Trade-in)',
        content: 'Discard up to one card from your hand to the common pile to earn a quick 30 Gold, reinforcing your resource pool for the upcoming turn cycles.'
      }
    ]
  },
  {
    id: 'card-types',
    title: 'Card Classification',
    icon: 'Layers',
    description: 'The six distinctive card types categorized into Hand Cards and Immediate Play Cards.',
    subsections: [
      {
        title: 'Top Row: Hand Cards (Drawn to Hand)',
        content: [
          'Treasure Cards (Cost: 30 Gold) — Played during the Action Phase. These provide immediate, powerful positive benefits and resource generation.',
          'Trade Cards (Cost: 10 Gold) — Offer immense flexibility and a wide variety of utility options, but require additional play costs and may not always be useful depending on current board state.',
          'Reaction Cards (Cost: 20 Gold) — Can be played at any time (even on opponent turns) when their specific "trigger" conditions are met. Ideal for disrupting opponent strategies and stealing resources.'
        ]
      },
      {
        title: 'Bottom Row: Immediate Play Cards (Triggered On Draw)',
        content: [
          'Destination Cards (Cost: 80 Gold) — Powerful geographic spots that provide permanent, passive bonuses applying to every single turn. Limited to a maximum of 3 active Destination Cards per player.',
          'Event Cards (Non-purchasable) — Feature randomized effects that can be highly positive or detrimental. Usually drawn during the Action Phase as a tactical gamble.',
          'Quest Cards (Non-purchasable) — Played automatically at the start of your turn. Once objectives are completed, the quest is discarded, and the player is awarded gold based on the difficulty rating. Max 3 active quests at any time.'
        ]
      }
    ]
  },
  {
    id: 'gameplay-rules',
    title: 'Rules & Setup',
    icon: 'BookOpen',
    description: 'Setup guidelines and system rules governing hands, discards, and victory thresholds.',
    subsections: [
      {
        title: 'Board Setup & Card Layout',
        content: [
          'Decks are divided into two face-down rows on the common board:',
          '• Top Row (left to right): Treasure Cards, Trade Cards, Quest Cards.',
          '• Bottom Row (left to right): Destination Cards, Event Cards, Quest Cards.',
          'Active cards in front of each player are organized in two separate rows:',
          '• Player Top Row: Active Quests (Max 3).',
          '• Player Bottom Row: Active Destinations (Max 3).',
          'If a player acquires a 4th card in either row, they must immediately discard one to keep within boundaries.'
        ]
      },
      {
        title: 'Hand Size Constraints',
        content: 'Players can hold a maximum of 8 cards in their hand at the end of their turn. If hand size exceeds this limit, they must discard down to 8 immediately.'
      },
      {
        title: 'The Discard Pile',
        content: 'All discarded cards are placed into a single shared face-up discard pile. If a card deck is completely depleted, the discard pile is shuffled thoroughly and placed back as a new face-down draw deck.'
      },
      {
        title: 'The Victory Condition (Expedition Points)',
        content: 'To secure victory, a player must reach 10 Expedition Points. While up to 9 points can be purchased for 50 Gold each, the definitive 10th victory point MUST be earned dynamically through gameplay achievements (completing difficult quests).'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Socket Server Backend',
    icon: 'Cpu',
    description: 'Details of the custom real-time socket-based multiplayer synchronization engine.',
    subsections: [
      {
        title: 'Real-Time TCP/WebSocket Layer',
        content: 'Unlike turn-based games relying on slow HTTP requests, Zanthalar features a custom socket server architecture that maintains a persistent duplex connection with all active clients, providing instant action transmission and responsive feedback loops.'
      },
      {
        title: 'State Authoritative Server',
        content: 'To prevent client-side manipulation and hacking, the server acts as the absolute authority on the game state. Every draw, card purchase, gold transaction, and quest completion is fully validated on the custom backend prior to broadcasting the updated state to clients.'
      },
      {
        title: 'Matchmaking & Room Management',
        content: [
          'Dynamic creation and joining of distinct game rooms.',
          'Lightweight lobby management that coordinates 2 to 4 players per match.',
          'Automatic cleanup of empty lobbies and inactive connections to optimize resource usage.'
        ]
      },
      {
        title: 'Synchronization & Fault Tolerance',
        content: [
          'Turn timer synchronization: Server-enforced turn limits broadcasted in real-time to avoid stagnant matches.',
          'Graceful client disconnection handling: Automated pausing or replacement with basic AI if connection is dropped temporarily.',
          'Fast JSON payload structures ensuring sub-50ms latency for card interactions and state updates.'
        ]
      }
    ]
  },
  {
    id: 'modes',
    title: 'Gameplay Modes',
    icon: 'Gamepad2',
    description: 'Multiple ways to play, track progression, and experience the tactical card battle.',
    subsections: [
      {
        title: 'Adventure Mode (Campaign)',
        content: 'The core story-driven campaign where players progress through increasingly difficult levels. Experience text-based visual novel style storytelling and cutscenes featuring the rich card art as background assets, unlocking new cards and heroes upon completing chapters.'
      },
      {
        title: 'Battle Mode (Skirmish)',
        content: 'Jump directly into custom sandbox battles! Players select their desired difficulty level (ranging from 1 to 10) and the number of opponents (2 to 4) to fight against random heroes from their unlocked pool on randomly generated fantasy backdrops.'
      },
      {
        title: 'My Collection',
        content: 'Browse all unlocked cards, read detailed card lore, inspect mechanics, and change your default active Hero for upcoming battles.'
      },
      {
        title: 'Achievements & Settings',
        content: [
          'Achievements system: Completing milestones unlocks premium cards (1 new card unlocked for every 5 achievements completed).',
          'Settings parameters: Detailed options for game audio (master, music, SFX, dialogue), framerate caps, and custom interface configurations.'
        ]
      }
    ]
  }
];
