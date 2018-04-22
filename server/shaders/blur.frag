precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform bool orientation;
uniform float iterations;
uniform float sigma;

vec3 gausian() {
    vec3 gausian;
    gausian.x = 1.0 / (2.5 * sigma);
    gausian.y = exp(-0.5 / (sigma * sigma));
    gausian.z = gausian.y * gausian.y;
    return gausian;
}

vec4 blur(vec2 vorientation, vec2 coords, vec2 invsize) {
    vec3 gausian = gausian();
    float sum = gausian.x;
    vec4 avg = texture2D(texture, coords) * gausian.x;
    gausian.xy *= gausian.yz;
    for (float index = 1.0; index <= 2048.0; index++) {
        if (index >= iterations) break;
        vec2 tsize = index * invsize * vorientation;
        avg += texture2D(texture, coords - tsize) * gausian.x;
        avg += texture2D(texture, coords + tsize) * gausian.x;
        sum += 2.0 * gausian.x;
        gausian.xy *= gausian.yz;
    }
    return avg / sum;
}

void main() {
    vec2 vorientation;
    if (orientation) {
        vorientation.x = 1.0;
    } else {
        vorientation.y = 1.0;
    }
    vec2 coords = gl_FragCoord.xy / size;
    vec2 invsize = 1.0 / size;
    gl_FragColor = blur(vorientation, coords, invsize);
}
