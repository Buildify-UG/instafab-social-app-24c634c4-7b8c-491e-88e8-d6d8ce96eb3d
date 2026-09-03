import React, { useState } from 'react';
import { Home, Film, MessageCircle, Users, Heart, Share2, MessageSquare, Search, Settings, ShoppingBag, Lock, Zap, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import instafabLogo from '@/assets/instafab-logo.png';

const USERS = [
  { id: 1, name: 'Aris Ahmed', username: '@arisahmed', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 2, name: 'Sarah Johnson', username: '@sarahjohnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { id: 3, name: 'Alex Martinez', username: '@alexmartinez', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { id: 4, name: 'Emma Wilson', username: '@emmawilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { id: 5, name: 'Jordan Lee', username: '@jordanlee', avatar: 'https://images.unsplash.com/photo-1507009466046-a46f489acac3?w=400&h=400&fit=crop' },
];

const POSTS = [
  {
    id: 1,
    author: USERS[0],
    content: 'Just launched my new project! Check it out and let me know what you think 🚀',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    likes: 1243,
    comments: 89,
    shares: 34,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    author: USERS[1],
    content: 'Beautiful sunset at the beach today! Nature is amazing ✨',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    likes: 2891,
    comments: 156,
    shares: 89,
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    author: USERS[2],
    content: 'Coffee and code - the perfect combination ☕💻',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    likes: 876,
    comments: 45,
    shares: 23,
    timestamp: '6 hours ago',
  },
];

const STORIES = [
  { id: 1, user: USERS[0], viewed: false },
  { id: 2, user: USERS[1], viewed: true },
  { id: 3, user: USERS[2], viewed: false },
  { id: 4, user: USERS[3], viewed: true },
  { id: 5, user: USERS[4], viewed: false },
];

const FRIENDS = [
  { id: 1, ...USERS[0], status: 'online' },
  { id: 2, ...USERS[1], status: 'offline' },
  { id: 3, ...USERS[2], status: 'online' },
];

const SUGGESTIONS = [
  { id: 1, ...USERS[3], mutualFriends: 12 },
  { id: 2, ...USERS[4], mutualFriends: 8 },
];

const MESSAGES = [
  { id: 1, user: USERS[0], lastMessage: 'That sounds great! Let\'s catch up soon', unread: 2, timestamp: '5m' },
  { id: 2, user: USERS[1], lastMessage: 'Thanks for the recommendation!', unread: 0, timestamp: '1h' },
  { id: 3, user: USERS[2], lastMessage: 'See you tomorrow!', unread: 1, timestamp: '3h' },
];

const FeedPost = ({ post }: { post: typeof POSTS[0] }) => (
  <Card className="mb-6 bg-card border-border overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-shadow">
    <div className="p-4 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">⋯</Button>
      </div>
    </div>
    <p className="p-4 text-foreground">{post.content}</p>
    {post.image && <img src={post.image} alt="post" className="w-full h-96 object-cover" />}
    <div className="p-4 border-t border-border">
      <div className="flex justify-between text-sm text-muted-foreground mb-4">
        <span>{post.likes} likes</span>
        <span>{post.comments} comments</span>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-primary">
          <Heart className="w-4 h-4 mr-2" /> Like
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-primary">
          <MessageSquare className="w-4 h-4 mr-2" /> Comment
        </Button>
        <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-primary">
          <Share2 className="w-4 h-4 mr-2" /> Share
        </Button>
      </div>
    </div>
  </Card>
);

const StoryBubble = ({ story }: { story: typeof STORIES[0] }) => (
  <div className="flex flex-col items-center gap-2 cursor-pointer group">
    <div className={`w-20 h-20 rounded-full p-1 transition-all ${story.viewed ? 'border-2 border-muted' : 'border-2 border-primary shadow-lg shadow-primary/50'}`}>
      <Avatar className="w-full h-full">
        <AvatarImage src={story.user.avatar} />
        <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
    <p className="text-xs text-center text-foreground truncate w-20">{story.user.name.split(' ')[0]}</p>
  </div>
);

const FriendCard = ({ friend }: { friend: typeof FRIENDS[0] }) => (
  <Card className="p-4 bg-card border-border text-center hover:shadow-lg hover:shadow-primary/20 transition-shadow">
    <div className="relative mb-3">
      <Avatar className="w-16 h-16 mx-auto">
        <AvatarImage src={friend.avatar} />
        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className={`absolute bottom-0 right-6 w-4 h-4 rounded-full border-2 border-card ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
    </div>
    <p className="font-semibold text-foreground text-sm">{friend.name}</p>
    <p className="text-xs text-muted-foreground mb-3">{friend.username}</p>
    <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Message</Button>
  </Card>
);

const SuggestionCard = ({ suggestion }: { suggestion: typeof SUGGESTIONS[0] }) => (
  <Card className="p-4 bg-card border-border hover:shadow-lg hover:shadow-primary/20 transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={suggestion.avatar} />
          <AvatarFallback>{suggestion.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground text-sm">{suggestion.name}</p>
          <p className="text-xs text-muted-foreground">{suggestion.mutualFriends} mutual friends</p>
        </div>
      </div>
    </div>
    <div className="flex gap-2">
      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">Add</Button>
      <Button size="sm" variant="outline">Skip</Button>
    </div>
  </Card>
);

const MessageItem = ({ message }: { message: typeof MESSAGES[0] }) => (
  <Card className="p-4 bg-card border-border cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={message.user.avatar} />
            <AvatarFallback>{message.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{message.user.name}</p>
          <p className="text-xs text-muted-foreground truncate max-w-xs">{message.lastMessage}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
        {message.unread > 0 && <div className="mt-1 bg-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-primary-foreground">{message.unread}</div>}
      </div>
    </div>
  </Card>
);

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border backdrop-blur-sm bg-card/80">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-lg">I</div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">InstaFab</span>
          </div>
          <div className="hidden md:flex flex-1 max-w-sm mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 bg-input border-border text-foreground" />
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-5 mb-8 bg-card border border-border">
            <TabsTrigger value="feed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Home className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="stories" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="friends" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Share2 className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageCircle className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <Card className="p-4 bg-card border-border mb-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={USERS[0].avatar} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <Input placeholder="What's on your mind?" className="bg-input border-border text-foreground" />
                </div>
              </Card>
              {POSTS.map(post => <FeedPost key={post.id} post={post} />)}
            </div>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Your Stories</h2>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {STORIES.map(story => <StoryBubble key={story.id} story={story} />)}
              </div>
            </div>
          </TabsContent>

          {/* Friends Tab */}
          <TabsContent value="friends">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Your Friends ({FRIENDS.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FRIENDS.map(friend => <FriendCard key={friend.id} friend={friend} />)}
              </div>
            </div>
          </TabsContent>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Friend Suggestions</h2>
              <div className="space-y-4">
                {SUGGESTIONS.map(suggestion => <SuggestionCard key={suggestion.id} suggestion={suggestion} />)}
              </div>
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Messages</h2>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">New Chat</Button>
              </div>
              <div className="space-y-3">
                {MESSAGES.map(message => <MessageItem key={message.id} message={message} />)}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 InstaFab. All rights reserved. | <a href="#" className="hover:text-primary">Privacy</a> | <a href="#" className="hover:text-primary">Terms</a> | <a href="#" className="hover:text-primary">Security</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
