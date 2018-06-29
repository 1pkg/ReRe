precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform bool orientation;

vec4 mirror(vec2 coords) {
    if (orientation) {
        if (coords.x > 0.5) {
            coords.x = 1.0 - coords.x;
        }
    } else {
        if (coords.y > 0.5) {
            coords.y = 1.0 - coords.y;
        }
    }
    return texture2D(texture, coords);
}

void main() {
    gl_FragColor = mirror(gl_FragCoord.xy / size);
}
