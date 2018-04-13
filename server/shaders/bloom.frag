precision highp float;
uniform sampler2D texture;
uniform vec2 size;
uniform float factor;

vec4 bloomEffect(vec2 coords) {
    vec4 bloom = vec4(0.0);
    for(int i = -4 ; i < 4; i++) {
        for (int j = -3; j < 3; j++) {
            bloom += texture2D(texture, coords + vec2((float(j) / size.x), (float(i) / size.y))) * (factor * 0.01);
        }
    }

    if (texture2D(texture, coords).r < 0.3) {
        bloom = bloom * bloom * 0.012;
    } else if (texture2D(texture, coords).r < 0.5) {
        bloom = bloom * bloom * 0.009;
    } else {
        bloom = bloom * bloom *0.0075;
    }

    return bloom + texture2D(texture, coords);
}

void main () {
    vec2 coords = vec2(gl_FragCoord.xy / size);
    gl_FragColor = bloomEffect(coords);
}
