precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

vec4 sepia(vec4 color) {
    return vec4(
        clamp(color.r * 0.393 + color.g * 0.769 + color.b * 0.189, 0.0, 1.0),
        clamp(color.r * 0.349 + color.g * 0.686 + color.b * 0.168, 0.0, 1.0),
        clamp(color.r * 0.272 + color.g * 0.534 + color.b * 0.131, 0.0, 1.0),
        color.a
    );
}

void main () {
    vec4 color = texture2D(texture, gl_FragCoord.xy / size);
    gl_FragColor = mix(color, sepia(color), 1.0);
}
