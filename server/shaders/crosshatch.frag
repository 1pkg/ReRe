precision highp float;
varying vec2 uv;
uniform sampler2D texture;
uniform vec2 size;

float luma(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

vec3 crosshatch(vec3 tColor, float t1, float t2, float t3, float t4) {
    float lum = luma(tColor);
    vec3 color = vec3(1.0);
    if (lum < t1) {
        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {
            color = vec3(0.0);
        }
    }
    if (lum < t2) {
        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {
            color = vec3(0.0);
        }
    }
    if (lum < t3) {
        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {
            color = vec3(0.0);
        }
    }
    if (lum < t4) {
        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {
            color = vec3(0.0);
        }
    }
    return color;
}

void main() {
    vec4 color = texture2D(texture, uv);
    gl_FragColor.rgb = crosshatch(color.rgb, 1.0, 0.75, 0.5, 0.3);
    gl_FragColor.a = color.a;
}
