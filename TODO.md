# TODO

- Update readme

## Backend interface

- Render 'caracteristiques_dispositif' and 'types_dispositif' as tree in directus once feature is available (currently in discussion: [https://github.com/directus/directus/discussions/3054])

- Improve notification recipients selection methods (right now every user with app access gets notifications from the frontend)

## Backend code

- Right now email templates are hardcoded to be translated in french (in /extensions/templates). Directus might implement email translation in the future (see [https://github.com/directus/directus/discussions/8239])

- Replace custome extension "autocomplete-alt-main" with native directus feature if available (see [https://github.com/directus/directus/discussions/10128#discussioncomment-4649071] and [https://github.com/rickysullivan/autocomplete-alt])

- Directus bug : Can't set default value for multiline fields. Right now we save such default values in mock data instead, we should use default values in schema instead when this is fixed.
