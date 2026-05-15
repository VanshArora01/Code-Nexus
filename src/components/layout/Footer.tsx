"use client";

import Link from "next/link";
import * as analytics from "@/lib/analytics";
import type { ReactElement } from "react";

import {
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";
import { SITE_EMAIL, SITE_SOCIAL } from "@/lib/site-social";

const PAGE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

const SOCIAL = [
  { label: "Email", href: SITE_SOCIAL.email, Icon: MailIcon },
  { label: "LinkedIn", href: SITE_SOCIAL.linkedin, Icon: LinkedInIcon },
  { label: "Instagram", href: SITE_SOCIAL.instagram, Icon: InstagramIcon },
  {
    label: "WhatsApp community",
    href: SITE_SOCIAL.whatsappCommunity,
    Icon: WhatsAppIcon,
  },
] as const;

export function Footer(): ReactElement {
  return (
    <footer className="relative z-20 border-t border-white/[0.06] bg-bg py-24 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-4 md:grid-cols-12 md:gap-10 md:px-6 lg:px-8">
        <div className="md:col-span-5 lg:col-span-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 transition-transform active:scale-95"
          >
            <img 
              src="/image.png" 
              alt="The Code Nexus Logo" 
              className="h-8 w-auto" 
            />
            <span className="flex items-baseline gap-0 font-heading text-lg font-bold tracking-tight">
              <span className="text-white">The Code</span>
              <span className="bg-gradient-to-r from-pink via-fuchsia to-purple bg-clip-text text-transparent">
                Nexus
              </span>
            </span>
          </Link>
          <p className="mt-4 font-heading text-base font-semibold tracking-tight text-white">
            Automate. Build. Scale.
          </p>
          <p className="mt-3 max-w-sm font-dm text-sm leading-relaxed text-[var(--text-body)]">
            AI automation + web solutions for scaling businesses.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {SOCIAL.map(({ label, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="text-[var(--text-muted)] transition-colors duration-300 hover:text-pink"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 lg:col-span-3">
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Pages
          </p>
          <nav className="mt-6 flex flex-col gap-3" aria-label="Footer pages">
            {PAGE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group/footer w-fit font-dm text-sm text-[var(--text-muted)] transition-all duration-300 hover:translate-x-1 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:col-span-4 lg:col-span-4">
          <p className="font-dm text-[0.7rem] font-medium uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Get in touch
          </p>
          <div className="mt-6 flex flex-col gap-4 font-dm text-sm">
            <a
              href={SITE_SOCIAL.email}
              className="w-fit text-white transition-colors duration-300 hover:text-pink"
            >
              {SITE_EMAIL}
            </a>
            <a
              href={SITE_SOCIAL.whatsappCommunity}
              target="_blank"
              rel="noreferrer"
              className="w-fit text-[var(--text-muted)] transition-colors duration-300 hover:text-white"
            >
              WhatsApp community
            </a>

            <Link
              href="/contact"
              onClick={() => {
                analytics.event({
                  action: "footer_cta_click",
                  category: "Engagement",
                  label: "Book a Call",
                });
              }}
              className="group/call mt-2 inline-flex w-fit items-center gap-1 font-heading text-sm font-semibold text-white transition-colors hover:text-pink"
            >
              Book a Call
              <span className="transition-transform duration-300 group-hover/call:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1200px] border-t border-white/[0.06] px-4 pt-8 md:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 font-dm text-xs text-[#9CA3AF]/80 md:flex-row md:items-center">
          <p>© 2026 The Code Nexus. Serving Ludhiana, Punjab & India.</p>
          <p className="md:text-right">
            Engineering the future of digital automation.
          </p>
        </div>
      </div>
    </footer>
  );
}
