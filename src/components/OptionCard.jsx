import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";


export const OptionCard= ({ icon: Icon, label, isSelected, onClick }) => (
  <Card 
    className={`relative cursor-pointer transition-all ${isSelected ? '' : ''}`}
    onClick={onClick}
  >
    <CardContent className="flex flex-col items-center justify-center p-4">
      <Icon className="w-8 h-8 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </CardContent>
    {isSelected && (
      <BorderBeam
        size={150}
  
        delay={2}
      />
    )}
  </Card>
);