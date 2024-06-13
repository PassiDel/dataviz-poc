import type { Chart, ChartComponentLike, ChartDataset } from 'chart.js';
import { DoughnutController, PolarAreaController } from 'chart.js';

// Source: https://github.com/chartjs/Chart.js/blob/master/src/plugins/plugin.colors.ts
// The MIT License (MIT)
//
// Copyright (c) 2014-2024 Chart.js Contributors
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

export interface ColorsPluginOptions {
  enabled?: boolean;
  forceOverride?: boolean;
}

interface ColorsDescriptor {
  backgroundColor?: unknown;
  borderColor?: unknown;
}

export const BORDER_COLORS = [
  'rgb(10, 85, 140)', // Blau
  'rgb(50, 180, 200)', // Türkis
  'rgb(0, 145, 90)', // Grün
  'rgb(110, 165, 60)', // Hellgrün
  'rgb(250, 190, 0)', // Geld
  'rgb(240, 120, 35)', // Orange
  'rgb(195, 5, 50)', // Rot
  'rgb(120, 100, 165)' // Violett
] as const;

// Border colors with 50% transparency
export const BACKGROUND_COLORS = /* #__PURE__ */ BORDER_COLORS.map((color) =>
  color.replace('rgb(', 'rgba(').replace(')', ', 0.5)')
);

function getBorderColor(i: number) {
  return BORDER_COLORS[i % BORDER_COLORS.length];
}

function getBackgroundColor(i: number) {
  return BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
}

function colorizeDefaultDataset(dataset: ChartDataset, i: number) {
  dataset.borderColor = getBorderColor(i);
  dataset.backgroundColor = getBackgroundColor(i);

  return ++i;
}

function colorizeDoughnutDataset(dataset: ChartDataset, i: number) {
  dataset.backgroundColor = dataset.data.map(() => getBorderColor(i++));

  return i;
}

function colorizePolarAreaDataset(dataset: ChartDataset, i: number) {
  dataset.backgroundColor = dataset.data.map(() => getBackgroundColor(i++));

  return i;
}

function getColorizer(chart: Chart) {
  let i = 0;

  return (dataset: ChartDataset, datasetIndex: number) => {
    const controller = chart.getDatasetMeta(datasetIndex).controller;

    if (controller instanceof DoughnutController) {
      i = colorizeDoughnutDataset(dataset, i);
    } else if (controller instanceof PolarAreaController) {
      i = colorizePolarAreaDataset(dataset, i);
    } else if (controller) {
      i = colorizeDefaultDataset(dataset, i);
    }
  };
}

function containsColorsDefinitions(
  descriptors: ColorsDescriptor[] | Record<string, ColorsDescriptor>
) {
  let k: number | string;

  for (k in descriptors) {
    // @ts-ignore
    if (descriptors[k].borderColor || descriptors[k].backgroundColor) {
      return true;
    }
  }

  return false;
}

function containsColorsDefinition(descriptor: ColorsDescriptor) {
  return descriptor && (descriptor.borderColor || descriptor.backgroundColor);
}

export default {
  id: 'hsb-colors',

  defaults: {
    enabled: true,
    forceOverride: false
  } as ColorsPluginOptions,

  beforeLayout(chart: Chart, _args, options: ColorsPluginOptions) {
    if (!options.enabled) {
      return;
    }

    const {
      data: { datasets },
      options: chartOptions
    } = chart.config;
    const { elements } = chartOptions as any;

    if (
      !options.forceOverride &&
      (containsColorsDefinitions(datasets) ||
        containsColorsDefinition(chartOptions as ColorsDescriptor) ||
        (elements && containsColorsDefinitions(elements)))
    ) {
      return;
    }

    const colorizer = getColorizer(chart);

    datasets.forEach(colorizer);
  }
} satisfies ChartComponentLike;
