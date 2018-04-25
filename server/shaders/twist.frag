precision mediump float;

uniform sampler2D texture;
uniform vec2 size;

uniform float rotation;

vec4 twist(vec2 coords) {
    vec2 center = size / 2.0;
    float radius = size.x + size.y / 32.0;
    coords = coords * size;
    coords -= center;
    float dist = length(coords);
    if (dist < radius) {
        float percent = (radius - dist) / radius;
        float theta = percent * percent * rotation;
        float sinv = sin(theta);
        float cosv = cos(theta);
        coords = vec2(
            dot(coords, vec2(cosv, -sinv)),
            dot(coords, vec2(sinv, cosv))
        );
    }
    coords += center;
    return texture2D(texture, coords / size);
}

void main (void) {
    gl_FragColor = twist(gl_FragCoord.xy / size);
}
