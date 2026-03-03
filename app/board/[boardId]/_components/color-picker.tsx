"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px]  mr-2  border-neutral-200">
      <ColorButton color={{r: 243,g: 82,b: 35,}} onClick={onChange}/>
      <ColorButton color={{r: 255,g: 249,b: 177,}} onClick={onChange}/>
      <ColorButton color={{r: 68,g: 202,b: 99,}} onClick={onChange}/>
      <ColorButton color={{r: 39,g: 142,b: 237,}} onClick={onChange}/>
      <ColorButton color={{r: 155,g: 105,b: 245,}} onClick={onChange}/>
      <ColorButton color={{r: 252,g: 142,b: 42,}} onClick={onChange}/>
      <ColorButton color={{ r: 254, g: 226, b: 226 }} onClick={onChange} />
      <ColorButton color={{ r: 220, g: 252, b: 231 }} onClick={onChange} />
      <ColorButton color={{ r: 219, g: 234, b: 254 }} onClick={onChange} /> 
      <ColorButton color={{ r: 243, g: 232, b: 255 }} onClick={onChange} />
      <ColorButton color={{r: 0,g: 0,b: 0,}} onClick={onChange}/>
      <ColorButton color={{r: 255,g: 255,b: 255,}} onClick={onChange}/>
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="w-5 h-5 flex items-center justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-5 w-5 rounded-sm box-border border-neutral-300"
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
};
