// @flow

import * as GlReact from 'gl-react';

export default GlReact.Shaders.create({
  saturation: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D texture;
      uniform float factor;

      void main () {
        vec4 color = texture2D(texture, uv);
        const vec3 hue = vec3(0.2125, 0.7154, 0.0721);
        gl_FragColor = vec4(mix(vec3(dot(color.rgb, hue)), color.rgb, factor), color.a);
      }
    `
  },
  sepia: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D texture;

      vec4 sepia(in vec4 color) {
        return vec4(
              clamp(color.r * 0.393 + color.g * 0.769 + color.b * 0.189, 0.0, 1.0)
            , clamp(color.r * 0.349 + color.g * 0.686 + color.b * 0.168, 0.0, 1.0)
            , clamp(color.r * 0.272 + color.g * 0.534 + color.b * 0.131, 0.0, 1.0)
            , color.a
        );
      }

      void main () {
        vec4 color = texture2D(texture, uv);
        gl_FragColor = mix(color, sepia(color), 1.0);
      }
    `
  },
  pixelation: {
    frag: `
      precision highp float;
      varying vec2 uv;
      uniform sampler2D texture;
      uniform vec2 size;
      uniform float factor;

      void main() {
        vec2 size = vec2(float(size.x) / factor, float(size.y) / factor);
        vec4 color = texture2D(texture, uv);
        float dx = (1.0 / size.x);
        float dy = (1.0 / size.y);
        vec2 coord = vec2(dx * floor(uv.x / dx), dy * floor(uv.y / dy));
        gl_FragColor = texture2D(texture, coord);
      }
    `
  },
  blur: {
    frag: `
      precision highp float;
      const float pi = 3.14159265;
      varying vec2 uv;
      uniform sampler2D texture;
      // The sigma value for the gaussian function: higher value means more blur
      // A good value for 9x9 is around 3 to 5
      // A good value for 7x7 is around 2.5 to 4
      // A good value for 5x5 is around 2 to 3.5
      uniform vec2 size;
      uniform int factor;
      uniform float sigma;
      uniform int orientation;

      void main() {
        vec2 isize = vec2(1.0 / size.x, 1.0 / size.y);
        float numBlurPixelsPerSide = float(factor / 2);
        vec2 blurMultiplyVec = orientation == 1 ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

        vec3 incrementalGaussian;
        incrementalGaussian.x = 1.0 / (sqrt(2.0 * pi) * sigma);
        incrementalGaussian.y = exp(-0.5 / (sigma * sigma));
        incrementalGaussian.z = incrementalGaussian.y * incrementalGaussian.y;

        vec4 avgValue = vec4(0.0, 0.0, 0.0, 0.0);
        float coefficientSum = 0.0;

        avgValue += texture2D(texture, uv) * incrementalGaussian.x;
        coefficientSum += incrementalGaussian.x;
        incrementalGaussian.xy *= incrementalGaussian.yz;

        for (float i = 1.0; i <= 256.0; i++) {
          if (i >= numBlurPixelsPerSide) break;
          avgValue += texture2D(texture, uv - i * isize * blurMultiplyVec) * incrementalGaussian.x;
          avgValue += texture2D(texture, uv + i * isize * blurMultiplyVec) * incrementalGaussian.x;
          coefficientSum += 2.0 * incrementalGaussian.x;
          incrementalGaussian.xy *= incrementalGaussian.yz;
        }
        gl_FragColor = avgValue / coefficientSum;
      }
    `
  },
  bloom: {
    frag: `
      precision highp float;
      uniform sampler2D texture;
      uniform vec2 size;
      uniform float factor;

      vec4 bloomEffect(vec2 coords) {
        vec4 bloom = vec4(0.0);
        for(int i = -4 ; i < 4; i++) {
          for (int j = -3; j < 3; j++) {
            bloom += texture2D(texture, coords + vec2((float(j) / size.x), (float(i) / size.y))) * (factor * 0.01);
          }
        }

        if (texture2D(texture, coords).r < 0.3) {
          bloom = bloom * bloom * 0.012;
        } else if (texture2D(texture, coords).r < 0.5) {
          bloom = bloom * bloom * 0.009;
        } else {
          bloom = bloom * bloom *0.0075;
        }

        return bloom + texture2D(texture, coords);
      }

      void main () {
        vec2 coords = vec2(gl_FragCoord.xy / size);
        gl_FragColor = bloomEffect(coords);
      }
    `
  }
});
