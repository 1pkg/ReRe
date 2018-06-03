precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform float scale;

vec4 brightness(vec4 color) {
    return vec4(
        min(color.r + (color.r * scale), 1.0),
        min(color.g + (color.g * scale), 1.0),
        min(color.b + (color.b * scale), 1.0),
        color.a
    );
}

void main () {
    gl_FragColor = brightness(texture2D(texture, gl_FragCoord.xy / size));
}
