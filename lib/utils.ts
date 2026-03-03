import { Camera, Color, Layer, LayerType, PathLayer, Point, Side, XYWH } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = [
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#60A5FA",
  "#C084FC",
  "#F472B6",
];

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}

export function colorToCss(color: Color){
  return `#${color.r.toString(16).padStart(2,"0")}${color.g.toString(16).padStart(2,"0")}${color.b.toString(16).padStart(2,"0")}`
} 


export function resizeBounds(
  bounds: XYWH,
  corner: Side,
  point: Point
): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  // LEFT
  if ((corner & Side.Left) === Side.Left) {
    const right = bounds.x + bounds.width;

    result.x = Math.min(point.x, right);
    result.width = Math.abs(right - point.x);
  }

  // RIGHT
  if ((corner & Side.Right) === Side.Right) {
    result.width = Math.abs(point.x - bounds.x);
  }

  // TOP
  if ((corner & Side.Top) === Side.Top) {
    const bottom = bounds.y + bounds.height;

    result.y = Math.min(point.y, bottom);
    result.height = Math.abs(bottom - point.y);
  }

  // BOTTOM
  if ((corner & Side.Bottom) === Side.Bottom) {
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}

export function findIntersectingLayersWithRectangle(
  layerIds: readonly string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point
){
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y)
  }

  const ids = []

  for(const layerId of layerIds){
    const layer = layers.get(layerId)

    if(layer == null){
      continue
    }

    const {x, y, width, height} = layer;

    if(
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y && 
      rect.y < y + height
    ){
      ids.push(layerId)
    }

  }

  return ids;
}


export function getContastingTextColor(color: Color){
  const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b

  return luminance > 182 ? "black" : "white"
}

export function penPointsToPathLayer(
  points: number[][],
  color: Color,
) : PathLayer{
  if(points.length < 2){
    throw new Error("Cannot transfrom points with less than 2 points")
  }

  let left = Number.POSITIVE_INFINITY
  let top = Number.POSITIVE_INFINITY
  let right = Number.NEGATIVE_INFINITY
  let bottom = Number.NEGATIVE_INFINITY
  
  for(const point of points){

    const [x, y] = point;

    if(left > x){
      left = x
    }

    if(top > y){
      top = y
    }

    if(right < x){
      right = x
    }

    if(bottom < y){
      bottom = y
    }
  }

  return {
    type: LayerType.Path,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    fill: color,
    points: points.map(([x, y, pressure]) => [x - left, y- top, pressure])
  }
}

export function getSvgPathFromStroke(stroke: number[][]) {
  if (stroke.length === 0) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      if (i === arr.length - 1) return acc; // don't wrap

      const [x1, y1] = arr[i + 1];

      acc.push(
        x0,
        y0,
        (x0 + x1) / 2,
        (y0 + y1) / 2
      );

      return acc;
    },
    ["M", stroke[0][0], stroke[0][1], "Q"]
  );

  return d.join(" ");
}