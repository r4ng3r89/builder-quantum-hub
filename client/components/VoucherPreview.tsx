import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Gift, Calendar, Users, Percent, DollarSign } from "lucide-react";

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

interface VoucherPreviewProps {
  config: VoucherConfig;
  logoUrl?: string;
  campaignName?: string;
}

export default function VoucherPreview({
  config,
  logoUrl,
  campaignName,
}: VoucherPreviewProps) {
  const formatDiscountValue = () => {
    if (config.discountType === "percentage") {
      return `${config.discountValue}% OFF`;
    } else {
      return `$${config.discountValue} OFF`;
    }
  };

  const voucherStyle = {
    background: `linear-gradient(135deg, ${config.primaryColor} 0%, ${config.secondaryColor} 100%)`,
    color: config.textColor,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Live Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voucher Preview */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden"
              style={{ aspectRatio: "1.6/1" }}
            >
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, ${config.primaryColor} 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${config.secondaryColor} 0%, transparent 50%)`,
                }}
              />

              {/* Main Content */}
              <div className="relative p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt="Brand logo"
                        className="w-12 h-12 object-contain rounded-lg bg-white/50 p-1"
                      />
                    ) : (
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${config.primaryColor}20` }}
                      >
                        <Gift
                          className="h-6 w-6"
                          style={{ color: config.primaryColor }}
                        />
                      </div>
                    )}
                    <div>
                      <h3
                        className="font-bold text-lg"
                        style={{ color: config.textColor }}
                      >
                        {config.title || "Exclusive Reward"}
                      </h3>
                      {campaignName && (
                        <p
                          className="text-sm opacity-70"
                          style={{ color: config.textColor }}
                        >
                          {campaignName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-white font-bold text-sm"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {formatDiscountValue()}
                  </div>
                </div>

                {/* Description */}
                <div className="flex-1 mb-4">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: config.textColor }}
                  >
                    {config.description ||
                      "Thank you for being a valued customer!"}
                  </p>
                </div>

                {/* Footer */}
                <div
                  className="border-t pt-3"
                  style={{ borderColor: `${config.textColor}20` }}
                >
                  <div
                    className="flex items-center justify-between text-xs"
                    style={{ color: `${config.textColor}80` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Valid {config.validityDays} days</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>Max {config.maxRedemptions}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] opacity-60">
                        REWARD VOUCHER
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-5"
                  style={{
                    backgroundColor: config.secondaryColor,
                    transform: "translate(25%, -25%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-5"
                  style={{
                    backgroundColor: config.primaryColor,
                    transform: "translate(-25%, 25%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Terms Preview */}
          {config.termsAndConditions && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-sm mb-2 text-gray-700">
                Terms & Conditions
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {config.termsAndConditions}
              </p>
            </div>
          )}
        </div>

        {/* Configuration Summary */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-gray-700">
            Configuration Summary
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Discount:</span>
              <Badge variant="secondary" className="text-xs">
                {config.discountType === "percentage" ? (
                  <>
                    <Percent className="h-3 w-3 mr-1" />
                    {config.discountValue}%
                  </>
                ) : (
                  <>
                    <DollarSign className="h-3 w-3 mr-1" />$
                    {config.discountValue}
                  </>
                )}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Validity:</span>
              <Badge variant="secondary" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {config.validityDays} days
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Max Uses:</span>
              <Badge variant="secondary" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                {config.maxRedemptions}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-gray-600">Colors:</span>
              <div className="flex space-x-1">
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: config.primaryColor }}
                />
                <div
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: config.secondaryColor }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
