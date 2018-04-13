precision highp float;
uniform sampler2D texture;
uniform vec2 size;

void main() {
    vec2 position = -1.0 + 2.0 * gl_FragCoord.xy / size.xy;
    float koef = cos(length(position) * 30.0) * 0.03;
    vec2 coord = gl_FragCoord.xy / size.xy + (position / length(position)) * koef;
    gl_FragColor = vec4(texture2D(texture, coord).xyz, 1.0);
}
