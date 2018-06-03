precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

vec4 posterize(vec4 color) {
    float luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
    if (luminance < 0.5) {
        return vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        return vec4(1.0, 1.0, 1.0, 1.0);
    }
}

void main() {
    gl_FragColor = posterize(texture2D(texture, gl_FragCoord.xy / size));
}
