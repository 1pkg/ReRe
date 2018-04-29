from yoyo import step

__depends__ = {}

steps = [
    step(
        '''
          INSERT INTO setting (name, value) VALUES
          ('option-count', '3'),
          ('effect-count', '2'),
          ('choose-period', '30'),
          ('disclaimer-message', '
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id nulla leo. Sed et viverra erat. Cras feugiat enim a sem mollis dignissim. Proin ac congue mi, placerat convallis metus. Morbi euismod ac ipsum id sodales. Vestibulum quis orci cursus lacus faucibus cursus vitae eget nunc. Sed ac cursus nisl. Suspendisse potenti. Aenean et justo dolor. Duis magna orci, rutrum sit amet nisl sit amet, viverra volutpat est. In ornare est et dapibus tincidunt. Donec dictum urna at dictum placerat.
Sed iaculis consequat turpis, non tristique lorem convallis nec. Etiam vehicula id elit vitae pellentesque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi laoreet ex a sem pharetra, in blandit lacus rhoncus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur malesuada, urna eu tempus tempus, ligula tortor pharetra diam, ac tincidunt lacus purus id arcu. Sed eros justo, tincidunt nec dictum sit amet, mattis ac ligula. Fusce in faucibus odio, id facilisis mauris. Nulla lectus orci, pharetra non tristique et, ornare a sem. Proin faucibus porttitor mi, sodales malesuada leo bibendum quis. Aliquam malesuada purus a pharetra placerat. Praesent condimentum ut ligula non fringilla. Quisque urna velit, dictum in risus non, vehicula pharetra velit. Duis et ultricies tortor, vel ullamcorper augue.
Etiam non lectus nec dui bibendum placerat vel eget ligula. Donec eu eleifend nisi, at hendrerit lectus. Donec vel massa semper, porttitor quam id, gravida arcu. Phasellus facilisis viverra tortor, nec luctus magna tincidunt eu. Maecenas sit amet nisl id quam lacinia congue. Morbi fermentum viverra orci, a imperdiet est faucibus ac. Proin auctor, dolor quis interdum eleifend, nulla mi ultricies ipsum, ac dignissim urna velit at diam.
Mauris non dui pellentesque ante fringilla gravida. In facilisis pulvinar blandit. Quisque maximus imperdiet felis, condimentum fermentum lacus tempor nec. Donec volutpat erat hendrerit turpis vestibulum rhoncus. Pellentesque non felis sit amet ex molestie hendrerit commodo sed lacus. Etiam non placerat diam. Ut vulputate facilisis mi sed volutpat. Maecenas ac quam ac sapien vehicula pretium. Curabitur tincidunt sed leo sit amet fermentum.
Maecenas pharetra, sem sagittis rhoncus iaculis, justo nibh finibus tellus, vel gravida purus ex ut odio. Donec a fermentum urna. Nullam rhoncus cursus felis tincidunt aliquet. Vivamus efficitur euismod lectus pulvinar blandit. Aenean pulvinar scelerisque feugiat. Suspendisse quis dignissim ligula. Etiam vulputate sagittis augue et varius. Aenean id diam lectus. Sed varius placerat sapien, sed ornare metus laoreet vitae. Sed vitae faucibus nunc. Fusce pretium nisl ex. Donec malesuada, metus tincidunt sollicitudin interdum, leo justo aliquet nulla, at efficitur nisl lectus eu ligula. Nulla mollis ultricies faucibus. Etiam vitae mattis nisl. Vestibulum in metus augue.
          ')
        '''
    )
]
