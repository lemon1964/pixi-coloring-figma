"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

interface ColoringCanvasProps {
  task: ColoringTask;
  selectedColor: number;
  testSpread?: boolean;
  debugPositions?: ColoringDebugPositions;
  displayScale?: number;
}

export default function ColoringCanvas({
  task,
  selectedColor,
  testSpread = false,
  debugPositions,
  displayScale = 1,
}: ColoringCanvasProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const selectedColorRef = useRef<number>(selectedColor);
  const segmentSpritesRef = useRef<Record<string, PIXI.Sprite>>({});

  useEffect(() => {
    selectedColorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    if (!rootRef.current) return;

    const app = new PIXI.Application({
      width: task.width,
      height: task.height,
      backgroundColor: 0xe5e7eb,
      antialias: true,
    });

    appRef.current = app;
    segmentSpritesRef.current = {};

    const canvas = app.view as HTMLCanvasElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    rootRef.current.innerHTML = "";
    rootRef.current.appendChild(canvas);

    const stage = app.stage;
    stage.sortableChildren = true;

    task.segments.forEach((segment) => {
      const sprite = PIXI.Sprite.from(segment.texture);

      const debugPosition = debugPositions?.[segment.id];

      sprite.x = testSpread ? (debugPosition?.x ?? segment.x) : segment.x;
      sprite.y = testSpread ? (debugPosition?.y ?? segment.y) : segment.y;

      sprite.zIndex = segment.zIndex ?? 0;
      sprite.tint = 0xffffff;
      
      if (segment.interactive === false) {
        sprite.eventMode = "none";
        sprite.cursor = "default";
      } else {
        sprite.eventMode = "static";
        sprite.cursor = "pointer";
      
        sprite.on("pointertap", () => {
          sprite.tint = selectedColorRef.current;
        });
      }

      stage.addChild(sprite);
      segmentSpritesRef.current[segment.id] = sprite;
    });

    if (task.stroke) {
      const stroke = PIXI.Sprite.from(task.stroke);
      stroke.x = 0;
      stroke.y = 0;
      stroke.zIndex = 1000;
      stroke.eventMode = "none";
      stage.addChild(stroke);
    }

    return () => {
      Object.values(segmentSpritesRef.current).forEach((sprite) => {
        sprite.removeAllListeners();
      });

      segmentSpritesRef.current = {};
      app.destroy(true);
      appRef.current = null;
    };
  }, [task, testSpread, debugPositions]);

  const scaledWidth = task.width * displayScale;

  return (
    <div className="canvas-shell w-full">
      <div className="panel-surface w-full max-w-full p-2 sm:p-3">
        <div
          ref={rootRef}
          className="canvas-frame mx-auto"
          style={{
            width: `min(${scaledWidth}px, 100%)`,
            aspectRatio: `${task.width} / ${task.height}`,
            maxHeight: "70vh",
          }}
        />
      </div>
    </div>
  );
}