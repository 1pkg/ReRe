precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

vec2 funnel(vec2 coords) {
    vec2 position = -1.0 + 2.0 * coords;
    float rad = dot(position, position);
    float coef = 0.1 - rad / 5.0;
    return coords + (position / length(position)) * coef;
}

void main() {
    gl_FragColor = texture2D(texture, funnel(gl_FragCoord.xy / size.xy));
}
