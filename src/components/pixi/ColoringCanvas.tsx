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

type TextureCanvasCacheItem = {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
};

const textureCanvasCache = new Map<string, TextureCanvasCacheItem>();

function getTextureCacheKey(texture: PIXI.Texture): string {
  const resource = texture.baseTexture.resource as
    | { source?: CanvasImageSource }
    | undefined;

  const source = resource?.source;

  const sourceId =
    source &&
    "src" in source &&
    typeof (source as HTMLImageElement).src === "string"
      ? (source as HTMLImageElement).src
      : `bt-${texture.baseTexture.uid}`;

  return [
    sourceId,
    texture.frame.x,
    texture.frame.y,
    texture.frame.width,
    texture.frame.height,
  ].join(":");
}

function getTextureCanvas(texture: PIXI.Texture): TextureCanvasCacheItem | null {
  const cacheKey = getTextureCacheKey(texture);

  const cached = textureCanvasCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const resource = texture.baseTexture.resource as
    | { source?: CanvasImageSource }
    | undefined;

  const source = resource?.source;
  if (!source) {
    return null;
  }

  const frame = texture.frame;
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(frame.width));
  canvas.height = Math.max(1, Math.round(frame.height));

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) {
    return null;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    source,
    frame.x,
    frame.y,
    frame.width,
    frame.height,
    0,
    0,
    frame.width,
    frame.height
  );

  const result = { canvas, context };
  textureCanvasCache.set(cacheKey, result);

  return result;
}

function enableAlphaHitTesting(
  sprite: PIXI.Sprite,
  alphaThreshold = 10
): void {
  const originalContainsPoint = sprite.containsPoint.bind(sprite);

  sprite.containsPoint = (point: PIXI.IPointData): boolean => {
    if (!originalContainsPoint(point)) {
      return false;
    }

    const localPoint = sprite.worldTransform.applyInverse(
      point,
      new PIXI.Point()
    );

    const x = Math.floor(localPoint.x);
    const y = Math.floor(localPoint.y);

    if (x < 0 || y < 0 || x >= sprite.width || y >= sprite.height) {
      return false;
    }

    const textureCanvas = getTextureCanvas(sprite.texture);
    if (!textureCanvas) {
      return true;
    }

    const pixel = textureCanvas.context.getImageData(x, y, 1, 1).data;
    const alpha = pixel[3];

    return alpha >= alphaThreshold;
  };
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

        enableAlphaHitTesting(sprite);

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