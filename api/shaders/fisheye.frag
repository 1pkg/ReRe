precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform float scale;

vec4 fisheye(vec2 coords) {
    vec2 ncoords = (coords - 0.5) * 2.0;
    ncoords.x = (1.0 - ncoords.y * ncoords.y) * scale * ncoords.x;
    ncoords.y = (1.0 - ncoords.x * ncoords.x) * scale * ncoords.y;
    return texture2D(texture, coords - ncoords);
}

void main() {
    gl_FragColor = fishEye(gl_FragCoord.xy / size);
}
