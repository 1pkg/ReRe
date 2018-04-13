precision highp float;
varying vec2 uv;
uniform sampler2D texture;
uniform vec2 size;

void main() {
    vec2 position = -1.0 + 2.0 * gl_FragCoord.xy / size.xy;
    float r = dot(position, position);
    if (r < 0.5) {
        float koef = 0.1 - r / 5.0;
        vec2 coord = gl_FragCoord.xy / size.xy + (position / length(position)) * koef;
        gl_FragColor = vec4(texture2D(texture, coord).xyz, 1.0);
    } else {
        gl_FragColor = texture2D(texture, uv);
    }
}
