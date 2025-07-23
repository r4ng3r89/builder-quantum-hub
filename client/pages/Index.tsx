import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Gift, Palette, Settings, Eye, Save } from 'lucide-react';
import LogoUpload from '@/components/LogoUpload';
import VoucherCustomizer from '@/components/VoucherCustomizer';
import VoucherPreview from '@/components/VoucherPreview';

interface CampaignData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  logo: File | null;
  logoUrl: string;
  voucherConfig: {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    title: string;
    description: string;
    termsAndConditions: string;
    maxRedemptions: number;
    validityDays: number;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
  };
}

export default function Index() {
  const [currentTab, setCurrentTab] = useState('campaign');
  const [campaignData, setCampaignData] = useState<CampaignData>({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    logo: null,
    logoUrl: '',
    voucherConfig: {
      primaryColor: '#8B5CF6',
      secondaryColor: '#22C55E',
      textColor: '#1F2937',
      title: 'Exclusive Reward',
      description: 'Thank you for being a valued customer!',
      termsAndConditions: 'Valid for 30 days from issue date. Cannot be combined with other offers.',
      maxRedemptions: 100,
      validityDays: 30,
      discountType: 'percentage',
      discountValue: 10,
    },
  });

  const handleCampaignDataChange = (field: string, value: any) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVoucherConfigChange = (field: string, value: any) => {
    setCampaignData(prev => ({
      ...prev,
      voucherConfig: {
        ...prev.voucherConfig,
        [field]: value,
      },
    }));
  };

  const handleSaveCampaign = () => {
    console.log('Saving campaign:', campaignData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  RewardsCraft
                </h1>
                <p className="text-sm text-muted-foreground">Campaign Creation Studio</p>
              </div>
            </div>
            <Button onClick={handleSaveCampaign} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Campaign
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Campaign Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="campaign" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Campaign</span>
                </TabsTrigger>
                <TabsTrigger value="logo" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">Logo</span>
                </TabsTrigger>
                <TabsTrigger value="design" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Design</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Preview</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="campaign" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Campaign Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="campaignName">Campaign Name</Label>
                        <Input
                          id="campaignName"
                          placeholder="Enter campaign name"
                          value={campaignData.name}
                          onChange={(e) => handleCampaignDataChange('name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={campaignData.startDate}
                          onChange={(e) => handleCampaignDataChange('startDate', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={campaignData.endDate}
                          onChange={(e) => handleCampaignDataChange('endDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxRedemptions">Max Redemptions</Label>
                        <Input
                          id="maxRedemptions"
                          type="number"
                          placeholder="100"
                          value={campaignData.voucherConfig.maxRedemptions}
                          onChange={(e) => handleVoucherConfigChange('maxRedemptions', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Campaign Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your campaign..."
                        rows={3}
                        value={campaignData.description}
                        onChange={(e) => handleCampaignDataChange('description', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logo">
                <LogoUpload
                  logo={campaignData.logo}
                  logoUrl={campaignData.logoUrl}
                  onLogoChange={(file, url) => {
                    handleCampaignDataChange('logo', file);
                    handleCampaignDataChange('logoUrl', url);
                  }}
                />
              </TabsContent>

              <TabsContent value="design">
                <VoucherCustomizer
                  config={campaignData.voucherConfig}
                  onChange={handleVoucherConfigChange}
                />
              </TabsContent>

              <TabsContent value="preview" className="lg:hidden">
                <VoucherPreview
                  config={campaignData.voucherConfig}
                  logoUrl={campaignData.logoUrl}
                  campaignName={campaignData.name}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Live Preview (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <VoucherPreview
                config={campaignData.voucherConfig}
                logoUrl={campaignData.logoUrl}
                campaignName={campaignData.name}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
