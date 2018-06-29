precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform float scale;

vec4 fog(vec2 coords) {
    vec2 position = -1.0 + 2.0 * coords;
    float rad = dot(position, position) * scale;
    vec4 color = texture2D(texture, coords);
    return vec4(color.r, color.g, color.b, 1.0 / sqrt(rad));
}

void main() {
    gl_FragColor = fog(gl_FragCoord.xy / size);
}
