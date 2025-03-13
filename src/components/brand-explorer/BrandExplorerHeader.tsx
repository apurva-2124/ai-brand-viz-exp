
import React from "react";

interface BrandExplorerHeaderProps {
  title: string;
  description: string;
}

export const BrandExplorerHeader = ({ title, description }: BrandExplorerHeaderProps) => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
