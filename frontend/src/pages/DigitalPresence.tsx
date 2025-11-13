import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Share2, 
  Video, 
  Instagram,
  Youtube,
  Smartphone,
  TrendingUp,
  Hash,
  FileText,
  Users,
  Sparkles,
  Copy,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface ContentIdea {
  id: string;
  type: 'video' | 'reel' | 'post';
  title: string;
  description: string;
  hashtags: string[];
  script?: string;
  caption: string;
  season?: string;
}

interface Vlogger {
  id: string;
  name: string;
  platform: 'Instagram' | 'YouTube' | 'Both';
  followers: string;
  specialty: string;
  contact: string;
  rating: number;
}

const DigitalPresence = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<'onboarding' | 'content' | 'vloggers' | 'promotions'>('onboarding');
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentIdea | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    businessName: '',
    cuisine: '',
    location: '',
    specialties: '',
    phone: '',
    email: ''
  });

  const contentIdeas: ContentIdea[] = [
    {
      id: '1',
      type: 'reel',
      title: 'Quick Recipe Reel',
      description: 'Show your signature dish being prepared in 30 seconds',
      hashtags: ['#StreetFood', '#FoodVendor', '#LocalFood', '#Foodie', '#Delicious'],
      script: 'Start with raw ingredients → Show cooking process → Final dish presentation → Price tag',
      caption: '🔥 Fresh, hot, and made with love! Our signature dish is ready in minutes. Come taste the difference! 🍛✨',
      season: 'All Year'
    },
    {
      id: '2',
      type: 'video',
      title: 'Behind the Scenes',
      description: 'Show your daily routine, ingredient sourcing, and preparation',
      hashtags: ['#BehindTheScenes', '#StreetFood', '#FoodBusiness', '#LocalVendor'],
      script: 'Morning prep → Market visit → Cooking process → Customer interactions → Closing',
      caption: 'A day in the life of a street food vendor! From fresh ingredients to happy customers, this is what passion looks like! 💪',
      season: 'All Year'
    },
    {
      id: '3',
      type: 'reel',
      title: 'Festival Special',
      description: 'Create seasonal content for festivals (Diwali, Holi, etc.)',
      hashtags: ['#FestivalFood', '#Diwali', '#Holi', '#TraditionalFood', '#Celebration'],
      script: 'Festival decoration → Special dish preparation → Traditional presentation',
      caption: '🎉 Festival special menu is here! Traditional flavors, modern presentation. Limited time only!',
      season: 'Festival Season'
    },
    {
      id: '4',
      type: 'post',
      title: 'Customer Testimonial',
      description: 'Share customer reviews and happy moments',
      hashtags: ['#CustomerLove', '#Reviews', '#HappyCustomers', '#StreetFood'],
      caption: 'Nothing makes us happier than seeing our customers smile! 😊 Thank you for your love and support! 🙏',
      season: 'All Year'
    }
  ];

  const vloggers: Vlogger[] = [
    {
      id: '1',
      name: 'Foodie Mumbai',
      platform: 'Instagram',
      followers: '250K',
      specialty: 'Street Food Reviews',
      contact: '@foodiemumbai',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Delhi Street Eats',
      platform: 'YouTube',
      followers: '180K',
      specialty: 'Local Vendor Features',
      contact: 'delhistreeteats@gmail.com',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Spice Trail',
      platform: 'Both',
      followers: '320K',
      specialty: 'Food Vlogging',
      contact: '@spicetrailofficial',
      rating: 4.7
    }
  ];

  const onboardingSteps = [
    {
      platform: 'Zomato',
      steps: [
        'Visit partner.zomato.com',
        'Click "Add Your Restaurant"',
        'Fill business details',
        'Upload menu and photos',
        'Complete verification',
        'Go live!'
      ],
      benefits: ['Reach 50M+ customers', 'Free listing', 'Easy order management']
    },
    {
      platform: 'Swiggy',
      steps: [
        'Visit partner.swiggy.com',
        'Click "Register Restaurant"',
        'Provide business information',
        'Upload menu and images',
        'Complete onboarding',
        'Start receiving orders!'
      ],
      benefits: ['Wide customer base', 'Real-time orders', 'Marketing support']
    }
  ];

  const handleGenerateContent = (idea: ContentIdea) => {
    setSelectedContent(idea);
    setIsContentDialogOpen(true);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    toast({
      title: 'Copied!',
      description: `${type} copied to clipboard`,
    });
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleContactVlogger = (vlogger: Vlogger) => {
    toast({
      title: 'Contact Information',
      description: `Reach out to ${vlogger.name} at ${vlogger.contact}`,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-900 to-black border-b border-pink-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Share2 className="h-8 w-8 text-pink-400" />
          <div>
            <h1 className="text-2xl font-bold text-pink-400">Digital Presence & Marketing</h1>
            <p className="text-sm text-pink-200">Grow your online visibility and customer base</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-pink-900/30 to-black border-pink-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Content Ideas</p>
                <Sparkles className="h-5 w-5 text-pink-400" />
              </div>
              <p className="text-2xl font-bold text-white">{contentIdeas.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-black border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Vloggers</p>
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white">{vloggers.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-black border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Platforms</p>
                <Smartphone className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-white">2</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/30 to-black border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">Reach Potential</p>
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <p className="text-2xl font-bold text-white">50M+</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'onboarding' | 'content' | 'vloggers' | 'promotions')} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 border-pink-700">
            <TabsTrigger value="onboarding" className="data-[state=active]:bg-pink-600">🚀 Onboarding</TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-pink-600">📱 Content Ideas</TabsTrigger>
            <TabsTrigger value="vloggers" className="data-[state=active]:bg-pink-600">👥 Vloggers</TabsTrigger>
            <TabsTrigger value="promotions" className="data-[state=active]:bg-pink-600">🎯 Promotions</TabsTrigger>
          </TabsList>

          {/* Onboarding Tab */}
          <TabsContent value="onboarding" className="space-y-4">
            {onboardingSteps.map((platform, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-pink-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      {platform.platform === 'Zomato' ? '🍽️' : '🚀'} {platform.platform}
                    </CardTitle>
                    <Badge className="bg-green-600">Free Listing</Badge>
                  </div>
                  <CardDescription className="text-gray-400">Get onboarded to reach millions of customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-pink-400 mb-2">Step-by-Step Guide:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                      {platform.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-pink-400 mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {platform.benefits.map((benefit, i) => (
                        <Badge key={i} className="bg-pink-600">{benefit}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    Start Onboarding →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Content Ideas Tab */}
          <TabsContent value="content" className="space-y-4">
            {contentIdeas.map((idea) => (
              <Card key={idea.id} className="bg-gradient-to-br from-gray-900 to-black border-pink-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        {idea.type === 'reel' ? <Instagram className="h-5 w-5 text-pink-400" /> : 
                         idea.type === 'video' ? <Youtube className="h-5 w-5 text-red-400" /> :
                         <FileText className="h-5 w-5 text-blue-400" />}
                        {idea.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400">{idea.description}</CardDescription>
                    </div>
                    {idea.season && (
                      <Badge className="bg-orange-600">{idea.season}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-gray-300 mb-2">{idea.caption}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {idea.hashtags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-pink-600 text-pink-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {idea.script && (
                      <div className="bg-gray-800 p-3 rounded-lg mb-3">
                        <p className="text-xs text-gray-400 mb-1">Script Outline:</p>
                        <p className="text-sm text-gray-300">{idea.script}</p>
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={() => handleGenerateContent(idea)}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Generate Full Content
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Vloggers Tab */}
          <TabsContent value="vloggers" className="space-y-4">
            {vloggers.map((vlogger) => (
              <Card key={vlogger.id} className="bg-gradient-to-br from-gray-900 to-black border-pink-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{vlogger.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {vlogger.platform} • {vlogger.followers} followers
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Rating</p>
                      <p className="text-xl font-bold text-yellow-400">⭐ {vlogger.rating}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-gray-300 mb-2">
                      <strong>Specialty:</strong> {vlogger.specialty}
                    </p>
                    <p className="text-sm text-gray-300">
                      <strong>Contact:</strong> {vlogger.contact}
                    </p>
                  </div>
                  <Button 
                    onClick={() => handleContactVlogger(vlogger)}
                    className="w-full bg-pink-600 hover:bg-pink-700"
                  >
                    Contact Vlogger
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Promotions Tab */}
          <TabsContent value="promotions" className="space-y-4">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-pink-700">
              <CardHeader>
                <CardTitle className="text-white">Seasonal Promotional Content</CardTitle>
                <CardDescription className="text-gray-400">Generate captions, hashtags, and scripts for seasonal campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-pink-200 mb-2 block">Select Season/Festival</label>
                    <select className="w-full bg-gray-800 border border-pink-700 text-white rounded-md px-3 py-2">
                      <option>Diwali</option>
                      <option>Holi</option>
                      <option>Eid</option>
                      <option>Christmas</option>
                      <option>Summer Special</option>
                      <option>Monsoon Special</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-pink-200 mb-2 block">Your Business Name</label>
                    <Input
                      placeholder="Enter business name"
                      className="bg-gray-800 border-pink-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-pink-200 mb-2 block">Special Offer (if any)</label>
                    <Input
                      placeholder="e.g., 20% off, Buy 1 Get 1"
                      className="bg-gray-800 border-pink-700 text-white"
                    />
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Promotional Content
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900 to-black border-pink-700">
              <CardHeader>
                <CardTitle className="text-white">Hashtag Generator</CardTitle>
                <CardDescription className="text-gray-400">Get trending hashtags for your posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-pink-200 mb-2 block">Content Type</label>
                    <select className="w-full bg-gray-800 border border-pink-700 text-white rounded-md px-3 py-2">
                      <option>Food Post</option>
                      <option>Recipe Video</option>
                      <option>Customer Review</option>
                      <option>Behind the Scenes</option>
                      <option>Festival Special</option>
                    </select>
                  </div>
                  <Button className="w-full bg-pink-600 hover:bg-pink-700">
                    <Hash className="h-4 w-4 mr-2" />
                    Generate Hashtags
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Content Dialog */}
      <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-pink-700 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedContent?.title}</DialogTitle>
          </DialogHeader>
          {selectedContent && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-pink-200">Caption</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(selectedContent.caption, 'Caption')}
                    className="border-pink-600 text-pink-400"
                  >
                    {copiedText === 'Caption' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <Textarea
                  value={selectedContent.caption}
                  readOnly
                  className="bg-gray-800 border-pink-700 text-white"
                  rows={3}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-pink-200">Hashtags</label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(selectedContent.hashtags.join(' '), 'Hashtags')}
                    className="border-pink-600 text-pink-400"
                  >
                    {copiedText === 'Hashtags' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 p-3 bg-gray-800 rounded-lg">
                  {selectedContent.hashtags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="border-pink-600 text-pink-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {selectedContent.script && (
                <div>
                  <label className="text-sm text-pink-200 mb-2 block">Script</label>
                  <Textarea
                    value={selectedContent.script}
                    readOnly
                    className="bg-gray-800 border-pink-700 text-white"
                    rows={4}
                  />
                </div>
              )}
              <Button onClick={() => setIsContentDialogOpen(false)} className="w-full bg-pink-600 hover:bg-pink-700">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DigitalPresence;

