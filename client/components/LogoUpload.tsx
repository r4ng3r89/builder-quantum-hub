import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoUploadProps {
  logo: File | null;
  logoUrl: string;
  onLogoChange: (file: File | null, url: string) => void;
}

export default function LogoUpload({ logo, logoUrl, onLogoChange }: LogoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      onLogoChange(file, url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveLogo = () => {
    if (logoUrl) {
      URL.revokeObjectURL(logoUrl);
    }
    onLogoChange(null, '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Brand Logo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {logoUrl ? (
          <div className="space-y-4">
            <div className="relative bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
              <div className="flex items-center justify-center">
                <img
                  src={logoUrl}
                  alt="Campaign logo"
                  className="max-h-32 max-w-full object-contain rounded"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemoveLogo}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{logo?.name}</span>
              <span>{logo && (logo.size / 1024).toFixed(1)} KB</span>
            </div>
            <Button
              variant="outline"
              onClick={triggerFileInput}
              className="w-full"
            >
              <Upload className="h-4 w-4 mr-2" />
              Replace Logo
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={triggerFileInput}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-primary/10 p-4 rounded-full">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Upload your brand logo</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your logo here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supports PNG, JPG, SVG (max 5MB)
                </p>
              </div>
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Recommended size: 200x200px or larger</p>
          <p>• Logo will appear on your reward vouchers</p>
          <p>• For best results, use a transparent background</p>
        </div>
      </CardContent>
    </Card>
  );
}
