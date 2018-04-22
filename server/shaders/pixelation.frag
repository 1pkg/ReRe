precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform float scale;

vec2 pixelation(vec2 coords) {
    vec2 scalevec = 1.0 / vec2(
        float(size.x) / scale,
        float(size.y) / scale
    );
    return vec2(
        scalevec.x * floor(coords.x / scalevec.x),
        scalevec.y * floor(coords.y / scalevec.y)
    );
}

void main() {
    gl_FragColor = texture2D(texture, pixelation(gl_FragCoord.xy / size));
}
