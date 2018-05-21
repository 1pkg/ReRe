precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

vec4 emboss(vec2 coords) {
    float offset = 1.0 / ((size.x + size.y) / 2.0);
    vec4 color = texture2D(texture, coords);
    vec4 colorl = texture2D(texture, coords + vec2(-offset, offset));
    vec4 colorr = texture2D(texture, coords + vec2(offset, offset));
    vec4 diff = (2.0 * colorl - color - colorr);
    float coef = 0.299 * diff.r + 0.587 * diff.g + 0.114 * diff.b;
    float luminance = clamp(coef, 0.0, 1.0);
    diff = vec4(0.5, 0.5, 0.5, 1.0) + 
        vec4(luminance, luminance, luminance, 1.0);
    return 0.1 * color + 0.9 * diff;
}

void main() {
    gl_FragColor = emboss(gl_FragCoord.xy / size);
}
