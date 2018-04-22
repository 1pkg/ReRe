precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

vec4 inverse(vec4 color) {
    vec4 inverted;
    inverted.r = abs(1.0 - color.r);
    inverted.g = abs(1.0 - color.g);
    inverted.b = abs(1.0 - color.b);
    inverted.a = color.a;
    return inverted;
}

void main () {
    vec4 color = texture2D(texture, gl_FragCoord.xy / size);
    gl_FragColor = inverse(color);
}
