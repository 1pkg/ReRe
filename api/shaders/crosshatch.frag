precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

float luma(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

vec3 crosshatch(
    vec3 color,
    vec2 coords,
    float t1,
    float t2,
    float t3,
    float t4
) {
    float lum = luma(color);
    float add = coords.x + coords.y;
    float sub = coords.x - coords.y;
    if ((lum < t1) && (mod(add, 10.0) == 0.0)) {
        return vec3(0.0);
    } else if ((lum < t2) && (mod(sub, 10.0) == 0.0)) {
        return vec3(0.0);
    } else if ((lum < t3) && (mod(add - 5.0, 10.0) == 0.0)) {
        return vec3(0.0);
    } else if ((lum < t4) && (mod(sub - 5.0, 10.0) == 0.0)) {
        return vec3(0.0);
    } else {
        return vec3(1.0);
    }
}

void main() {
    vec4 color = texture2D(texture, gl_FragCoord.xy / size);
    gl_FragColor = vec4(
        crosshatch(
            color.rgb,
            gl_FragCoord.xy,
            1.0,
            0.75,
            0.5,
            0.3
        ),
        color.a
    );
}
