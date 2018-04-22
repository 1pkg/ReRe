precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform bool orientation;
uniform float frequency;
uniform float amplitude;

vec4 waveHorizontal(vec2 coords) {
    float y = sin(size.x / frequency * coords.x) * amplitude;
    return texture2D(texture, vec2(coords.x, coords.y + y));
}

vec4 waveVertical(vec2 coords) {
    float x = cos(size.y / frequency * coords.y) * amplitude;
    return texture2D(texture, vec2(coords.x + x, coords.y));
}

void main() {
    if (orientation) {
        gl_FragColor = waveHorizontal(gl_FragCoord.xy / size);
    } else {
        gl_FragColor = waveVertical(gl_FragCoord.xy / size);
    }
}
