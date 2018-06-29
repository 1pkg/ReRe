precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform float scale;

vec4 accent(vec2 coords) {
    vec2 position = -1.0 + 2.0 * coords;
    float rad = dot(position, position) * scale;
    vec4 color = texture2D(texture, coords);
    vec3 componenta = color.rgb * (1.0 - sqrt(rad));
    return vec4(componenta.r, componenta.g, componenta.b, color.a);
}

void main() {
    gl_FragColor = accent(gl_FragCoord.xy / size);
}
