precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform float frequency;
uniform float amplitude;

vec2 ripple(vec2 coords) {
    vec2 position = -1.0 + 2.0 * coords;
    float coef = cos(frequency * length(position)) * amplitude;
    return coords + (position / length(position)) * coef;
}

void main() {
    gl_FragColor = texture2D(texture, ripple(gl_FragCoord.xy / size));
}
