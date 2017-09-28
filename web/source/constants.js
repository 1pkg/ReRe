// @flow

export const ACT_STATUS_NONE: string                =   'none';
export const ACT_STATUS_PROCESS: string             =   'process';
export const ACT_STATUS_RESULT: string              =   'result';

export const ACT_PROCESS_DURATION: number           =   30;
export const ACT_PROCESS_DURATION_WARNING: number   =   10;

export const ASSIT_NAME_REDO: string                =    'redo';
export const ASSIT_NAME_INFINITE: string            =    'infinite';
export const ASSIT_NAME_REDUCE: string              =    'reduce';
export const ASSIT_NAME_STATS: string               =    'stats';
export const ASSIT_NAME_SKIP: string                =    'skip';
export const ASSIT_NAME_HELP: string                =    'help';

export const EFFECT_NAME_BLEACHED: string           =    'bleached';
export const EFFECT_NAME_BLOOM: string              =    'bloom';
export const EFFECT_NAME_BLUR_HORIZONTAL: string    =    'blur-horizontal';
export const EFFECT_NAME_BLUR_VERTICAL: string      =    'blur-vertical';
export const EFFECT_NAME_CROSSHATCH: string         =    'crosshatch';
export const EFFECT_NAME_FUNNEL: string             =    'funnel';
export const EFFECT_NAME_PIXELATION: string         =    'pixelation';
export const EFFECT_NAME_RIPPLE: string             =    'ripple';
export const EFFECT_NAME_SEPIA: string              =    'sepia';
export const EFFECT_NAME_WAVE_HORIZONTAL: string    =    'wave-horizontal';
export const EFFECT_NAME_WAVE_VERTICAL: string      =    'wave-vertical';

export const EFFECT_LIST: Array<string>               =    [
  EFFECT_NAME_BLEACHED,
  EFFECT_NAME_BLOOM,
  EFFECT_NAME_BLUR_HORIZONTAL,
  EFFECT_NAME_BLUR_VERTICAL,
  EFFECT_NAME_CROSSHATCH,
  EFFECT_NAME_FUNNEL,
  EFFECT_NAME_PIXELATION,
  EFFECT_NAME_RIPPLE,
  EFFECT_NAME_SEPIA,
  EFFECT_NAME_WAVE_HORIZONTAL,
  EFFECT_NAME_WAVE_VERTICAL,
];

export const COLOR_MAIN: string                     =   '#A9A9A9';
export const COLOR_SECOND: string                   =   '#D3D3D3';
export const COLOR_HOVER: string                    =   '#87CEEB';
export const COLOR_FAIL: string                     =   '#FA8072';
export const COLOR_CORRECT: string                  =   '#90EE90';
