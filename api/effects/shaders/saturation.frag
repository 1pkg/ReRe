precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform float saturation;

vec4 saturate(vec4 color) {
    vec3 hue = vec3(0.2125, 0.7154, 0.0721);
    return vec4(
        mix(
            vec3(dot(color.rgb, hue)),
            color.rgb,
            saturation
        ),
        color.a
    );
}

void main () {
    gl_FragColor = saturate(texture2D(texture, gl_FragCoord.xy / size));
}
