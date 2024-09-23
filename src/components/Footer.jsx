import React from 'react';
import Image from "next/image";
import { Twitter, Facebook, Youtube, Instagram } from "lucide-react";

const FooterLink = ({ href, children }) => (
  <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
    {children}
  </a>
);

const FooterSection = ({ title, links }) => (
  <div>
    <h3 className="font-bold text-foreground mb-3">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <FooterLink href={link.href}>{link.text}</FooterLink>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLink = ({ href, icon: Icon, label }) => (
  <a href={href} className="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2">
    <Icon size={18} />
    <span className="text-sm">{label}</span>
  </a>
);

const Footer = () => (
  <footer className="bg-muted/50 border-t border-border">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <div className="space-y-4">
          <Image alt="Logo" src="/images/logo.svg" width={150} height={75} />
          
          <p className="text-sm text-muted-foreground">
             &copy; 2024 Jannat Khan.
          </p>
        </div>

        <FooterSection
          title="Product"
          links={[
            { href: "/plan", text: "Plan" },
            { href: "/features", text: "Features" },
            { href: "/how-to-use", text: "How to use" }
          ]}
        />

        <FooterSection
          title="Company"
          links={[
            { href: "/privacy", text: "Privacy Policy" },
            { href: "/tos", text: "Terms of Service" },
            { href: "/faq", text: "FAQ" },
          ]}
        />
        
        <FooterSection
          title="Support"
          links={[
            { href: "/contact", text: "Contact" },
            { href: "/api", text: "API" },
            { href: "/news", text: "News" },
          ]}
        />

        <div>
          <h3 className="font-bold text-foreground mb-3">Follow Us</h3>
          <div className="mt-4 space-y-2">
            <SocialLink href="https://facebook.com/TravelifyAITool" icon={Facebook} label="Facebook" />
            <SocialLink href="https://x.com/TravelifyAITool" icon={Twitter} label="X" />
            <SocialLink href="https://instagram.com/TravelifyAITool" icon={Instagram} label="Instagram" />
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
