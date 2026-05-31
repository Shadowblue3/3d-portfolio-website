"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Home, User, Cpu, Briefcase, Mail } from 'lucide-react';
import { cn } from "@/lib/utils";

type IconComponentType = React.ElementType<{ className?: string }>;

export interface InteractiveMenuItem {
  label: string;
  icon: IconComponentType;
  id: string;
}

export interface InteractiveMenuProps {
  accentColor?: string;
}

const menuItems: InteractiveMenuItem[] = [
    { label: 'home', icon: Home, id: 'home' },
    { label: 'about', icon: User, id: 'about' },
    { label: 'skills', icon: Cpu, id: 'skills' },
    { label: 'projects', icon: Briefcase, id: 'projects' },
    { label: 'contact', icon: Mail, id: 'contact' },
];

const InteractiveMenu: React.FC<InteractiveMenuProps> = ({ accentColor }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingRef = useRef(false);

  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Update active index on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Center of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = menuItems.findIndex((item) => item.id === entry.target.id);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    menuItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const setLineWidth = () => {
      const activeTextElement = textRefs.current[activeIndex];
      const activeItemElement = itemRefs.current[activeIndex];

      if (activeTextElement && activeItemElement) {
        // Measure text without clipping to get accurate width
        activeTextElement.style.maxWidth = 'none';
        const textWidth = activeTextElement.scrollWidth;
        activeTextElement.style.maxWidth = ''; // Reset to follow CSS
        
        activeItemElement.style.setProperty('--lineWidth', `${textWidth}px`);
      }
    };

    // Run after a short delay to ensure rendering and fonts are ready
    const timeoutId = setTimeout(setLineWidth, 100);
    
    window.addEventListener('resize', setLineWidth);
    return () => {
      window.removeEventListener('resize', setLineWidth);
      clearTimeout(timeoutId);
    };
  }, [activeIndex]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    isScrollingRef.current = true;
    
    const element = document.getElementById(menuItems[index].id);
    if (element) {
      // Add a slight offset for the fixed navbar
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Unlock observer after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  const navStyle = useMemo(() => {
      return { '--component-active-color': accentColor || '#3b82f6' } as React.CSSProperties;
  }, [accentColor]); 

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-fit">
      <nav
        className="menu"
        role="navigation"
        style={navStyle}
      >
        {menuItems.map((item, index) => {
          const isActive = index === activeIndex;
          const IconComponent = item.icon;

          return (
            <button
              key={item.label}
              className={cn("menu__item", isActive && "active")}
              onClick={() => handleItemClick(index)}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              style={{ '--lineWidth': '0px' } as React.CSSProperties} 
            >
              <div className="menu__icon">
                <IconComponent className="icon w-5 h-5" />
              </div>
              <strong
                className={cn("menu__text", isActive && "active")}
                ref={(el) => {
                  textRefs.current[index] = el;
                }}
              >
                {item.label}
              </strong>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export { InteractiveMenu };
