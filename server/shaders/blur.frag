precision highp float;
varying vec2 uv;
uniform sampler2D texture;
uniform vec2 size;
uniform int factor;
uniform float sigma;
uniform int orientation;

void main() {
    vec2 isize = vec2(1.0 / size.x, 1.0 / size.y);
    float numBlurPixelsPerSide = float(factor / 2);
    vec2 blurMultiplyVec = orientation == 1 ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

    vec3 incrementalGaussian;
    incrementalGaussian.x = 1.0 / (sqrt(2.0 * 3.14159265) * sigma);
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
