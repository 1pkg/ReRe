precision highp float;
varying vec2 uv;
uniform sampler2D texture;
uniform vec2 size;
uniform int orientation;

vec2 waveHorizontal(vec2 coord) {
    float pi = 3.14159;
    float w = size.x / 200.0 * pi;
    float y = sin(w * coord.x) * 0.33;
    return vec2(coord.x, coord.y + y);
}

vec2 waveVertical(vec2 coord) {
    float pi = 3.14159;
    float w = size.y / 200.0 * pi;
    float x = cos(w * coord.y) * 0.33;
    return vec2(coord.x + x, coord.y);
}

void main() {
    vec2 coord = orientation == 1 ? waveHorizontal(uv) : waveVertical(uv);
    vec4 color = texture2D(texture, coord);
    gl_FragColor = color;
}
