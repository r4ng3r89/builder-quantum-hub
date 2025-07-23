import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette, Type, Clock, Percent } from "lucide-react";

interface VoucherConfig {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  title: string;
  description: string;
  termsAndConditions: string;
  maxRedemptions: number;
  validityDays: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

interface VoucherCustomizerProps {
  config: VoucherConfig;
  onChange: (field: string, value: any) => void;
}

const colorPresets = [
  { name: "Purple Gradient", primary: "#8B5CF6", secondary: "#22C55E" },
  { name: "Blue Ocean", primary: "#3B82F6", secondary: "#06B6D4" },
  { name: "Sunset", primary: "#F59E0B", secondary: "#EF4444" },
  { name: "Forest", primary: "#10B981", secondary: "#059669" },
  { name: "Rose Gold", primary: "#EC4899", secondary: "#F97316" },
  { name: "Midnight", primary: "#1F2937", secondary: "#6B7280" },
];

export default function VoucherCustomizer({
  config,
  onChange,
}: VoucherCustomizerProps) {
  const handleColorPresetSelect = (preset: {
    primary: string;
    secondary: string;
  }) => {
    onChange("primaryColor", preset.primary);
    onChange("secondaryColor", preset.secondary);
  };

  return (
    <div className="space-y-6">
      {/* Color Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Colors & Styling
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Presets */}
          <div className="space-y-3">
            <Label>Color Presets</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {colorPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleColorPresetSelect(preset)}
                  className="p-3 rounded-lg border-2 border-gray-200 hover:border-primary transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: preset.secondary }}
                      />
                    </div>
                    <span className="text-xs font-medium group-hover:text-primary">
                      {preset.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="primaryColor"
                  value={config.primaryColor}
                  onChange={(e) => onChange("primaryColor", e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <Input
                  value={config.primaryColor}
                  onChange={(e) => onChange("primaryColor", e.target.value)}
                  placeholder="#8B5CF6"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="secondaryColor"
                  value={config.secondaryColor}
                  onChange={(e) => onChange("secondaryColor", e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <Input
                  value={config.secondaryColor}
                  onChange={(e) => onChange("secondaryColor", e.target.value)}
                  placeholder="#22C55E"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="textColor">Text Color</Label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="textColor"
                  value={config.textColor}
                  onChange={(e) => onChange("textColor", e.target.value)}
                  className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                />
                <Input
                  value={config.textColor}
                  onChange={(e) => onChange("textColor", e.target.value)}
                  placeholder="#1F2937"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Voucher Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Voucher Title</Label>
            <Input
              id="title"
              value={config.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Exclusive Reward"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={config.description}
              onChange={(e) => onChange("description", e.target.value)}
              placeholder="Thank you for being a valued customer!"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="termsAndConditions">Terms & Conditions</Label>
            <Textarea
              id="termsAndConditions"
              value={config.termsAndConditions}
              onChange={(e) => onChange("termsAndConditions", e.target.value)}
              placeholder="Valid for 30 days from issue date..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Discount Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Discount Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discountType">Discount Type</Label>
              <Select
                value={config.discountType}
                onValueChange={(value: "percentage" | "fixed") =>
                  onChange("discountType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountValue">
                Discount Value (
                {config.discountType === "percentage" ? "%" : "$"})
              </Label>
              <Input
                id="discountValue"
                type="number"
                value={config.discountValue}
                onChange={(e) =>
                  onChange("discountValue", parseFloat(e.target.value) || 0)
                }
                placeholder={config.discountType === "percentage" ? "10" : "25"}
                min="0"
                max={config.discountType === "percentage" ? 100 : undefined}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validity & Limits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Validity & Limits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validityDays">Validity Period (Days)</Label>
              <Input
                id="validityDays"
                type="number"
                value={config.validityDays}
                onChange={(e) =>
                  onChange("validityDays", parseInt(e.target.value) || 0)
                }
                placeholder="30"
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxRedemptions">Max Redemptions</Label>
              <Input
                id="maxRedemptions"
                type="number"
                value={config.maxRedemptions}
                onChange={(e) =>
                  onChange("maxRedemptions", parseInt(e.target.value) || 0)
                }
                placeholder="100"
                min="1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
