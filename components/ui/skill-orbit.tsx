"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkillItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface SkillOrbitProps {
  items: SkillItem[];
  radius?: number;
  className?: string;
}

export function SkillOrbit({
  items,
  radius = 140,
  className,
}: SkillOrbitProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const animate = (time: number) => {
      if (previousTimeRef.current !== null && autoRotate) {
        const deltaTime = time - previousTimeRef.current;
        // Adjust speed for smoothness
        setRotationAngle((prev) => (prev + 0.03 * deltaTime) % 360);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [autoRotate]);

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      // Close others
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });

      newState[id] = !prev[id];

      if (newState[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        // Logic for related items pulse
        const currentItem = items.find((item) => item.id === id);
        const relatedItems = currentItem ? currentItem.relatedIds : [];
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  const calculatePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = Number((radius * Math.cos(radian)).toFixed(2));
    const y = Number((radius * Math.sin(radian)).toFixed(2));

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Number(Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    ).toFixed(3));

    return { x, y, angle, zIndex, opacity };
  };

  const getStatusStyles = (status: SkillItem["status"]): string => {
    switch (status) {
      case "completed": return "text-white bg-black border-white";
      case "in-progress": return "text-black bg-white border-black";
      case "pending": return "text-white bg-black/40 border-white/50";
      default: return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className={cn("relative w-full aspect-square flex items-center justify-center", className)}
      ref={containerRef}
      onClick={() => {
        setExpandedItems({});
        setActiveNodeId(null);
        setPulseEffect({});
        setAutoRotate(true);
      }}
    >
      {/* Center Pulse Circle */}
      <div className="absolute z-10 flex items-center justify-center pointer-events-none">
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
          <div className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50" style={{ animationDelay: "0.5s" }}></div>
          <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
        </div>
      </div>

      {/* Orbit Ring */}
      <div 
        className="absolute rounded-full border border-white/10 pointer-events-none"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {isMounted && items.map((item, index) => {
        const pos = calculatePosition(index, items.length);
        const isExpanded = expandedItems[item.id];
        const isRelated = activeNodeId ? items.find(a => a.id === activeNodeId)?.relatedIds.includes(item.id) : false;
        const isPulsing = pulseEffect[item.id];
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            ref={(el) => { nodeRefs.current[item.id] = el; }}
            className="absolute transition-all duration-700 cursor-pointer"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              zIndex: isExpanded ? 200 : pos.zIndex,
              opacity: isExpanded ? 1 : pos.opacity,
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleItem(item.id);
            }}
          >
            {/* Energy Aura */}
            <div
              className={cn(
                "absolute rounded-full -inset-1",
                isPulsing && "animate-pulse duration-1000"
              )}
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                width: `${item.energy * 0.5 + 40}px`,
                height: `${item.energy * 0.5 + 40}px`,
                left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
              }}
            />

            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform border-2",
                isExpanded ? "bg-white text-black scale-150 border-white shadow-lg shadow-white/30" : 
                isRelated ? "bg-white/50 text-black border-white animate-pulse" : 
                "bg-black text-white border-white/40"
              )}
            >
              <Icon size={18} />
            </div>

            {/* Title Label */}
            <div className={cn(
              "absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-wider transition-all duration-300",
              isExpanded ? "text-white scale-125" : "text-white/70"
            )}>
              {item.title}
            </div>

            {isExpanded && (
              <Card className="absolute top-24 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 z-50">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50" />
                <CardHeader className="pb-2 p-4">
                  <div className="flex justify-between items-center">
                    <Badge className={cn("px-2 text-[10px]", getStatusStyles(item.status))}>
                      {item.status.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] font-mono text-white/50">{item.date}</span>
                  </div>
                  <CardTitle className="text-sm mt-2 text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-xs text-white/80">
                  <p>{item.content}</p>

                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="flex justify-between items-center text-[10px] mb-1">
                      <span className="flex items-center">
                        <Zap size={10} className="mr-1" />
                        Energy Level
                      </span>
                      <span className="font-mono">{item.energy}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${item.energy}%` }}
                      />
                    </div>
                  </div>

                  {item.relatedIds.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="flex items-center mb-2 text-white/70">
                        <Link size={10} className="mr-1" />
                        <h4 className="text-[10px] uppercase tracking-wider font-medium">
                          Connected Skills
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.relatedIds.map((relatedId) => {
                          const relatedItem = items.find(i => i.id === relatedId);
                          return (
                            <Button
                              key={relatedId}
                              variant="outline"
                              size="sm"
                              className="h-5 px-2 py-0 text-[9px] rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 transition-all"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleItem(relatedId);
                              }}
                            >
                              {relatedItem?.title}
                              <ArrowRight size={8} className="ml-1 opacity-60" />
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
}
