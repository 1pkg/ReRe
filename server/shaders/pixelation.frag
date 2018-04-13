precision highp float;
varying vec2 uv;
uniform sampler2D texture;
uniform vec2 size;
uniform float factor;

void main() {
    vec2 size = vec2(float(size.x) / factor, float(size.y) / factor);
    vec4 color = texture2D(texture, uv);
    float dx = (1.0 / size.x);
    float dy = (1.0 / size.y);
    vec2 coord = vec2(dx * floor(uv.x / dx), dy * floor(uv.y / dy));
    gl_FragColor = texture2D(texture, coord);
}
